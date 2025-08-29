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
export const getUserOfferTokens = async (c: Context) => {
  try {
    const { userAddr } = c.req.param()

    // 1. Group offers by token_addr with counts
    const tokensWithOfferCounts = await prisma.premarketOffer.groupBy({
      by: ["token_addr"],
      where: { created_by: userAddr },
      _count: { _all: true },
    })

    // 2. Get all token addresses where user has offers
    const tokenAddrs = tokensWithOfferCounts.map(t => t.token_addr)

    // 3. Get token details (without offers array)
    const tokens = await prisma.premarketToken.findMany({
      where: { token_addr: { in: tokenAddrs } },
    })

    // 4b. Orders placed *on user’s offers*
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

    // 5. Merge results with metrics
    const result = tokens.map(token => {
      const offerData = tokensWithOfferCounts.find(o => o.token_addr === token.token_addr)
      const ordersOnUserData = ordersOnUserOffers.find(o => o.token_addr === token.token_addr)

      return {
        ...token,
        totalOffers: offerData?._count._all ?? 0,
        totalOrders: ordersOnUserData?._count._all ?? 0,
      }
    })

    return c.json(serialize(result), 200)
  } catch (err) {
    console.error(err)
    return c.json({ error: `failed to get user tokens: ${err}` }, 500)
  }
}

//=====================================================================
//=====================================================================
//dashboard premarket single token
export const getUserOffers = async (c: Context) => {
  try {
    const { userAddr, tokenAddr } = c.req.param();

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
    const twentyFourHoursAgo = BigInt(Date.now() - 24 * 60 * 60 * 1000);

    const offers = token.offers ?? [];
    const lastPrice = offers.length > 0 ? offers[0].price : BigInt(0);

    const prevPrice = offers.length > 1 ? offers[1].price : BigInt(0);
    let priceChange = 0;
    if (prevPrice > 0n) {
      const diff = Number(lastPrice - prevPrice);
      priceChange = (diff / Number(prevPrice)) * 100;
    }

    const volAll = offers.reduce(
      // (sum, offer) => sum + offer.amount * offer.price,
      (sum, offer) => sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price)),
      0n
    );

    const vol24h = offers
      .filter((offer) => offer.ts >= twentyFourHoursAgo)
      // .reduce((sum, offer) => sum + offer.amount * offer.price, 0n);
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
      },
      include: {
        orders: true,
      },
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