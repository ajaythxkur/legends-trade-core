import type { Context } from "hono";
import prisma from "../lib/prisma.js";

const serialize = (data: any) =>
  JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

//=====================================================================
//=====================================================================
// user data on dashboard cards
export const getUserData = async (c: Context) => {
  try {
    const { userAddr } = c.req.param()
    // const offers = await prisma.premarketOffer.findMany({
    //   where: {
    //     created_by: userAddr
    //   }
    // })
    // const orders = await prisma.premarketOrder.findMany({
    //   where: {
    //     created_by: userAddr
    //   }
    // })

    const [offers, orders] = await Promise.all([
      prisma.premarketOffer.findMany({ where: { created_by: userAddr } }),
      prisma.premarketOrder.findMany({ where: { created_by: userAddr } }),
    ])
    const totalOffers = offers.length;
    const totalOrders = orders.length;
    const settledOrders = orders.filter((o) => o.is_settled).length;
    const unsettled_orders = orders.filter((o) => !o.is_settled).length;

    const response = {
      total_offers: totalOffers,
      total_orders: totalOrders,
      settled_orders: settledOrders,
      unsettled_orders: unsettled_orders
    }
    return c.json(serialize(response), 200)
  } catch (error) {
    console.log(error)
    return c.json(`$error`, 500)
  }
}

//=====================================================================
//=====================================================================
// Premarket tokens dashboard
export const getUserPremarketTokens = async (c: Context) => {
  try {
    const { userAddr } = c.req.param()
    const offset = Number(c.req.query('offset') ?? 0)
    const limit = Number(c.req.query('limit') ?? 10)
    const status = c.req.query('status') // "ongoing" | "not-started" | "ended" | "all"

    const now = Math.floor(Date.now() / 1000)

    // Collect all relevant token addresses
    const tokensWithOfferCounts = await prisma.premarketOffer.groupBy({
      by: ["token_addr"],
      where: { created_by: userAddr },
      _count: { _all: true },
    })

    const userOffers = await prisma.premarketOffer.findMany({
      where: { created_by: userAddr },
      select: { offer_addr: true, token_addr: true },
    })
    const userOfferAddrs = userOffers.map(o => o.offer_addr)

    const ordersOnUserOffers = await prisma.premarketOrder.groupBy({
      by: ["token_addr"],
      where: { offer_addr: { in: userOfferAddrs } },
      _count: { _all: true },
    })

    const userOrders = await prisma.premarketOrder.groupBy({
      by: ["token_addr"],
      where: { created_by: userAddr },
      _count: { _all: true },
    })

    const tokenAddrs = [
      ...new Set([
        ...tokensWithOfferCounts.map(t => t.token_addr),
        ...ordersOnUserOffers.map(o => o.token_addr),
        ...userOrders.map(u => u.token_addr),
      ]),
    ]

    // Fetch tokens
    const allTokens = await prisma.premarketToken.findMany({
      where: {
        token_addr: { in: tokenAddrs },
      },
    })

    // Apply status filter
    const filteredTokens = allTokens.filter(token => {
      const start = token.settle_started_at
      const duration = token.settle_duration
      const end = start && duration ? start + duration : null

      switch (status) {
        case "not-started":
          // return start !== null || start > now
          return start === null || start > now
        case "ongoing":
          return start !== null && duration !== null && start <= now && end! > now
        case "ended":
          return start !== null && duration !== null && end! <= now
        case "all":
        default:
          return true
      }
    })

    // Pagination
    const pagedTokens = filteredTokens.slice(offset, offset + limit)
    const pages = Math.ceil(filteredTokens.length / limit)

    // Merge extra info
    const result = pagedTokens.map(token => {
      const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
      const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)
      const userOrderData = userOrders.find(o => o.token_addr === token.token_addr)

      return {
        ...token,
        totalOffers: offerData?._count._all ?? 0,
        totalOrders: (ordersOnUserData?._count._all ?? 0) + (userOrderData?._count._all ?? 0),
      }
    })

    return c.json(serialize({ tokens: result, total: pages }), 200)
  } catch (err) {
    console.error(err)
    return c.json({ error: `failed to get user tokens: ${err}` }, 500)
  }
}





//=====================================================================
//=====================================================================
//dashboard premarket single token offsers and orders
export const getUserOffers = async (c: Context) => {
  try {
    // const { userAddr, tokenAddr } = c.req.param();
    const { tokenAddr } = c.req.param();

    const userAddr = c.req.query('account_addr')
    const offer_status = c.req.query('offer_status');
    const offer_type = c.req.query('offer_type')
    const offeset = Number(c.req.query('offset')) ?? 0
    const limit = Number(c.req.query('limit')) ?? 10
    console.log(userAddr)

    // 1. Get token details (with offers, so we can calculate metrics)
    const token = await prisma.premarketToken.findUnique({
      where: { token_addr: tokenAddr },
      include: {
        offers: {
          orderBy: { ts: "desc" }, // so first is latest
        },
      },
    });

    if (!token) {
      return c.json({ error: "Token not found" }, 404);
    }

    // --- Metrics (like getUserOfferTokens) ---
    // const twentyFourHoursAgo = BigInt(Date.now() - 24 * 60 * 60 * 1000);
    const twentyFourHoursAgo = BigInt(Math.floor(Date.now() / 1000) - 24 * 60 * 60);

    const offers = token.offers ?? [];
    const lastPrice = offers.length > 0 ? offers[0].price : BigInt(0);

    const prevPrice = offers.length > 1 ? offers[1].price : BigInt(0);
    let priceChange = 0;
    if (prevPrice > 0n) {
      const diff = Number(lastPrice - prevPrice);
      priceChange = (diff / Number(prevPrice)) * 100;
    }

    const volAll = offers.reduce(
      (sum, offer) => sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price)),
      0n
    );

    const vol24h = offers
      .filter((offer) => offer.ts >= twentyFourHoursAgo)
      .reduce((sum, offer) => sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price)), 0n);

    const { offers: _discarded, ...tokenData } = token;
    const tokenWithMetrics = {
      ...tokenData,
      lastPrice,
      volAll,
      vol24h,
      priceChange,
    };

    // 2. Offers created by this user
    const userCreatedOffers = await prisma.premarketOffer.findMany({
      where: {
        token_addr: tokenAddr,
        created_by: userAddr,
        AND: [
          offer_type && offer_type != 'all'
            ? { is_buy: offer_type === 'buy' }
            : {},

          offer_status && offer_status != 'all'
            ? { is_active: offer_status === 'active' }
            : {}
        ]
      },
      include: {
        orders: true,
      },
      take: limit,
      skip: offeset,
    });

    const userCreatedOffersWithFlag = userCreatedOffers.map((offer) => ({
      ...offer,
      is_creator: true,
    }));

    // 3. Offers not created by user but where he placed an order
    const userOrdersOnOtherOffers = await prisma.premarketOffer.findMany({
      where: {
        token_addr: tokenAddr,
        created_by: { not: userAddr },
        orders: {
          some: { created_by: userAddr },
        },
      },
      include: {
        orders: {
          where: { created_by: userAddr }, // only his orders
        },
      },
    });

    const userOrdersOnOtherOffersWithFlag = userOrdersOnOtherOffers.map(
      (offer) => ({
        ...offer,
        is_creator: false,
      })
    );

    // 4. Merge both lists
    const allUserOffers = [
      ...userCreatedOffersWithFlag,
      ...userOrdersOnOtherOffersWithFlag,
    ];

    // 5. Return with metrics-enhanced token
    return c.json(
      serialize({
        token: tokenWithMetrics,
        offers: allUserOffers,
      }),
      200
    );
  } catch (err) {
    console.error(err);
    return c.json({ error: `failed to get token offers: ${err}` }, 500);
  }
};





//=====================================================================
//=====================================================================
// get user orders on token.
export const getOrders = async (c: Context) => {
  try {
    const { userAddr } = c.req.param()
    const orders = await prisma.premarketOrder.findMany({
      where: {
        created_by: userAddr
      }
    });
    return c.json(serialize(orders), 200)
  }
  catch (error) {
    return c.json(`Failed to get orders: ${error}`)
  }
}


//=====================================================================
//=====================================================================
export const getOffers = async (c: Context) => {
  try {
    const { token_addr } = c.req.param();
    const userAddr = c.req.query('account_addr')

    const offer_status = c.req.query('offer_status');
    const offer_type = c.req.query('offer_type')
    const offset = Number(c.req.query('offset')) ?? 0
    const limit = Number(c.req.query('limit')) ?? 10
    console.log(offer_status)

    const offers = await prisma.premarketOffer.findMany({
      where: {
        token_addr: token_addr,
        OR: [
          { created_by: userAddr }, // offers created by user
          { orders: { some: { created_by: userAddr } } } // offers where user placed an order
        ],
        AND: [
          offer_type && offer_type != 'all'
            ? { is_buy: offer_type === 'buy' }
            : {},

          offer_status && offer_status != 'all'
            ? { is_active: offer_status === 'active' }
            : {},
        ]
      },
      include: {
        orders: true
      },
      skip: offset * limit,
      take: limit   // for pagination
    })
    const totaloffers = await prisma.premarketOffer.count({
      where: {
        token_addr: token_addr,
        OR: [
          { created_by: userAddr },
          { orders: { some: { created_by: userAddr } } }
        ]
      }
    })

    const pages = Math.ceil(totaloffers / limit)


    return c.json(serialize({ offers: offers, total: pages }), 200)
  } catch (err) {
    console.log(err)
  }
}