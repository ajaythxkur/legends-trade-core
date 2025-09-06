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
    const offers = await prisma.premarketOffer.findMany({
      where: {
        created_by: userAddr
      }
    })
    const orders = await prisma.premarketOrder.findMany({
      where: {
        created_by: userAddr
      }
    })
    const totalOffers = offers.length;
    const totalOrders = orders.length;
    const settledOrders = orders.filter((o) => o.is_settled).length;
    const unsettled_orders = orders.filter((o) => o.is_settled).length;

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
//dashboard tabs premarket token
// export const getUserPremarketTokens = async (c: Context) => {
//   try {
//     const { userAddr } = c.req.param()
//     const offset = Number(c.req.query('offset')) ?? 0;
//     const limit = Number(c.req.query('limit')) ?? 10;

//     // 1. Group offers by token_addr with counts
//     const tokensWithOfferCounts = await prisma.premarketOffer.groupBy({
//       by: ["token_addr"],
//       where: { created_by: userAddr },
//       _count: { _all: true },
//     })

//     // 2. Get all token addresses where user has offers
//     const tokenAddrs = tokensWithOfferCounts.map(t => t.token_addr)


//     // 3. Get token details (without offers array)
//     const tokens = await prisma.premarketToken.findMany({
//       where: {
//         token_addr: { in: tokenAddrs }
//       },
//       take: limit,
//       skip: offset,
//     })

//     // 4b. Orders placed *on user’s offers*
//     const userOffers = await prisma.premarketOffer.findMany({
//       where: { created_by: userAddr },
//       select: { offer_addr: true, token_addr: true },
//     })
//     const userOfferAddrs = userOffers.map(o => o.offer_addr)

//     const ordersOnUserOffers = await prisma.premarketOrder.groupBy({
//       by: ["token_addr"],
//       where: { offer_addr: { in: userOfferAddrs } },
//       _count: { _all: true },
//     })

//     // 5. Merge results with metrics
//     const result = tokens.map(token => {
//       const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
//       const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)

//       return {
//         ...token,
//         totalOffers: offerData?._count._all ?? 0,
//         totalOrders: ordersOnUserData?._count._all ?? 0,
//       }
//     })

//     return c.json(serialize(result), 200)
//   } catch (err) {
//     console.error(err)
//     return c.json({ error: `failed to get user tokens: ${err}` }, 500)
//   }
// }

// export const getUserPremarketTokens = async (c: Context) => {
//   try {
//     const { userAddr } = c.req.param()
//     const offset = Number(c.req.query('offset')) ?? 0;
//     const limit = Number(c.req.query('limit')) ?? 10;

//     // 1. Group offers by token_addr with counts
//     const tokensWithOfferCounts = await prisma.premarketOffer.groupBy({
//       by: ["token_addr"],
//       where: { created_by: userAddr },
//       _count: { _all: true },
//     })

//     // 2. Group orders by token_addr with counts (user placed orders)
//     const tokensWithOrderCounts = await prisma.premarketOrder.groupBy({
//       by: ["token_addr"],
//       where: { created_by: userAddr },
//       _count: { _all: true },
//     })

//     // 3. Collect unique token addresses from both offers & orders
//     const tokenAddrs = [
//       ...new Set([
//         ...tokensWithOfferCounts.map(t => t.token_addr),
//         ...tokensWithOrderCounts.map(t => t.token_addr),
//       ])
//     ]

//     // 4. Get token details
//     const tokens = await prisma.premarketToken.findMany({
//       where: { token_addr: { in: tokenAddrs } },
//       take: limit,
//       skip: offset,
//     })

//     // 5. Orders placed *on user’s offers*
//     const userOffers = await prisma.premarketOffer.findMany({
//       where: { created_by: userAddr },
//       select: { offer_addr: true, token_addr: true },
//     })
//     const userOfferAddrs = userOffers.map(o => o.offer_addr)

//     const ordersOnUserOffers = await prisma.premarketOrder.groupBy({
//       by: ["token_addr"],
//       where: { offer_addr: { in: userOfferAddrs } },
//       _count: { _all: true },
//     })

//     // 6. Merge results with metrics
//     const result = tokens.map(token => {
//       const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
//       const orderData = tokensWithOrderCounts.find(o => o.token_addr === token.token_addr)
//       const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)

//       return {
//         ...token,
//         totalOffers: offerData?._count._all ?? 0,   // user’s own offers
//         totalOrders: orderData?._count._all ?? 0,   // user’s own orders
//         ordersOnUserOffers: ordersOnUserData?._count._all ?? 0, // orders placed on user’s offers
//       }
//     })

//     return c.json(serialize(result), 200)
//   } catch (err) {
//     console.error(err)
//     return c.json({ error: `failed to get user tokens: ${err}` }, 500)
//   }
// }


// export const getUserPremarketTokens = async (c: Context) => {
//   try {
//     const { userAddr } = c.req.param()
//     const offset = Number(c.req.query('offset') ?? 0)
//     const limit = Number(c.req.query('limit') ?? 10)

//     // 1. User's offers grouped by token
//     const tokensWithOfferCounts = await prisma.premarketOffer.groupBy({
//       by: ["token_addr"],
//       where: { created_by: userAddr },
//       _count: { _all: true },
//     })
//     const offerTokenAddrs = tokensWithOfferCounts.map(t => t.token_addr)

//     // 2. Get user's orders (on other people's offers)
//     const userOrdersGrouped = await prisma.premarketOrder.groupBy({
//       by: ["token_addr"],
//       where: { created_by: userAddr },
//       _count: { _all: true },
//     })
//     const orderTokenAddrs = userOrdersGrouped.map(o => o.token_addr)

//     // 3. Union of all token addresses
//     const allTokenAddrs = [...new Set([...offerTokenAddrs, ...orderTokenAddrs])]

//     // 4. Fetch token details
//     const tokens = await prisma.premarketToken.findMany({
//       where: { token_addr: { in: allTokenAddrs } },
//       take: limit,
//       skip: offset,
//     })

//     // 5. Orders placed *on user’s offers*
//     const userOffers = await prisma.premarketOffer.findMany({
//       where: { created_by: userAddr },
//       select: { offer_addr: true, token_addr: true },
//     })
//     const userOfferAddrs = userOffers.map(o => o.offer_addr)

//     const ordersOnUserOffers = await prisma.premarketOrder.groupBy({
//       by: ["token_addr"],
//       where: { offer_addr: { in: userOfferAddrs } },
//       _count: { _all: true },
//     })

//     // 6. Merge all results
//     const result = tokens.map(token => {
//       const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
//       const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)
//       const userOrderData = userOrdersGrouped.find(o => o.token_addr === token.token_addr)

//       return {
//         ...token,
//         totalOffers: offerData?._count._all ?? 0,       // offers created by user
//         totalOrders: ordersOnUserData?._count._all ?? 0, // orders on user’s offers
//         userOrders: userOrderData?._count._all ?? 0,     // orders placed by user
//       }
//     })

//     return c.json(serialize(result), 200)
//   } catch (err) {
//     console.error(err)
//     return c.json({ error: `failed to get user tokens: ${err}` }, 500)
//   }
// }

export const getUserPremarketTokens = async (c: Context) => {
  try {
    const { userAddr } = c.req.param()
    const offset = Number(c.req.query('offset')) ?? 0;
    const limit = Number(c.req.query('limit')) ?? 10;

    // 1. Offers created by user
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

    // 2. Orders ON user’s offers (from others)
    const ordersOnUserOffers = await prisma.premarketOrder.groupBy({
      by: ["token_addr"],
      where: { offer_addr: { in: userOfferAddrs } },
      _count: { _all: true },
    })

    // 3. Orders BY user (on others’ offers)
    const userOrders = await prisma.premarketOrder.groupBy({
      by: ["token_addr"],
      where: { created_by: userAddr },
      _count: { _all: true },
    })

    // 4. Collect all relevant tokens
    const tokenAddrs = [
      ...new Set([
        ...tokensWithOfferCounts.map(t => t.token_addr),
        ...ordersOnUserOffers.map(o => o.token_addr),
        ...userOrders.map(u => u.token_addr),
      ]),
    ]

    const tokens = await prisma.premarketToken.findMany({
      where: { token_addr: { in: tokenAddrs } },
      take: limit,
      skip: offset,
    })

    const total = await prisma.premarketToken.findMany({
      where: { token_addr: { in: tokenAddrs } }
    })
    const pages = Math.ceil(total.length / limit)

    // 5. Merge results
    const result = tokens.map(token => {
      const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
      const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)
      const userOrderData = userOrders.find(o => o.token_addr === token.token_addr)

      return {
        ...token,
        totalOffers: offerData?._count._all ?? 0,
        totalOrders: (ordersOnUserData?._count._all ?? 0) + (userOrderData?._count._all ?? 0),
      }
    })

    // return c.json(serialize(result), 200)
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
      skip: offset, // for pagination
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