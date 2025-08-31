import type { Context } from "hono";
import prisma from "../lib/prisma.js";

const serialize = (data: any) =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );

export const getTokens = async (c: Context) => {
    try {
        const offset = Number(c.req.query('offset') ?? 0)
        const limit = Number(c.req.query('limit') ?? 10)
        const search = c.req.query('search') ?? ''
        const sortOrder = c.req.query("sort_order") === "desc" ? "desc" : "asc";
        const network = c.req.query("network");

        const tokens = await prisma.premarketToken.findMany({
            where: {
                AND: [
                    search
                        ? {
                            OR: [
                                { name: { contains: search, mode: "insensitive" } },
                                { symbol: { contains: search, mode: "insensitive" } },
                                { token_addr: { contains: search, mode: "insensitive" } },
                            ],
                        }
                        : {},
                    network && network !== "all"
                        ? { chain_type: Number(network) }
                        : {},
                ],
            },
            take: limit,
            skip: offset * limit,
            orderBy: {
                createdAt: sortOrder,
            },
            include: {
                offers: {
                    orderBy: {
                        ts: 'desc'
                    }
                }
            }
        });

        // Calculate 24 hours ago timestamp
        const twentyFourHoursAgo = BigInt(Date.now() - 24 * 60 * 60 * 1000);

        const tokensWithMetrics = tokens.map(token => {
            const { offers, ...tokenData } = token;

            // Last price (latest offer)
            const lastPrice = offers.length > 0 ? offers[0].price : BigInt(0);

            // Previous price (second latest offer, if exists)
            const prevPrice = offers.length > 1 ? offers[1].price : BigInt(0);

            // Price change %
            let priceChange = 0;
            if (prevPrice > 0n) {
                const diff = Number(lastPrice - prevPrice);
                priceChange = (diff / Number(prevPrice)) * 100;
            }

            // Total volume (all time)
            const totalVolume = offers.reduce((sum, offer) => {
                return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
            }, BigInt(0));

            // 24h volume
            const twentyFourHourVolume = offers
                .filter(offer => offer.ts >= twentyFourHoursAgo)
                .reduce((sum, offer) => {
                    return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
                }, BigInt(0));

            return {
                ...tokenData,
                lastPrice,
                volAll: totalVolume,
                vol24h: twentyFourHourVolume,
                priceChange,
            };
        });

        // return c.json(serialize(tokensWithMetrics), 200);
        const totaltokens = await prisma.premarketToken.findMany()
        const totalpages = Math.ceil(totaltokens.length / limit);
        console.log(`pages: ${totalpages}`)
        const result = {
            data: serialize(tokensWithMetrics),
            count: totalpages
        };

        return c.json(result, 200);
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return c.json({ error: "Failed to fetch tokens" }, 500);
    }
};



// get token information
export const getTokenInfo = async (c: Context) => {
    try {
        const { addr } = c.req.param();
        const tokens = await prisma.premarketToken.findMany({
            where: {
                token_addr: addr
            },
            include: {
                offers: {
                    orderBy: {
                        ts: 'desc'
                    }
                }
            }
        });

        // Calculate 24 hours ago timestamp
        const twentyFourHoursAgo = BigInt(Date.now() - 24 * 60 * 60 * 1000);

        const tokensWithMetrics = tokens.map(token => {
            const { offers, ...tokenData } = token;

            // Last price (latest offer)
            const lastPrice = offers.length > 0 ? offers[0].price : BigInt(0);

            // Previous price (second latest offer, if exists)
            const prevPrice = offers.length > 1 ? offers[1].price : BigInt(0);

            // Price change %
            let priceChange = 0;
            if (prevPrice > 0n) {
                const diff = Number(lastPrice - prevPrice);
                priceChange = (diff / Number(prevPrice)) * 100;
            }

            // Total volume (all time)
            const totalVolume = offers.reduce((sum, offer) => {
                return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
            }, BigInt(0));

            // 24h volume
            const twentyFourHourVolume = offers
                .filter(offer => offer.ts >= twentyFourHoursAgo)
                .reduce((sum, offer) => {
                    return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
                }, BigInt(0));

            return {
                ...tokenData,
                lastPrice,
                volAll: totalVolume,
                vol24h: twentyFourHourVolume,
                priceChange, // 👈 new field
            };
        });

        return c.json(serialize(tokensWithMetrics), 200);
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return c.json({ error: "Failed to fetch tokens" }, 500);
    }
};

// get Offers
export const getOffers = async (c: Context) => {
    try {
        const { addr } = c.req.param();
        let userAddr = c.req.query('userAddr') ?? ''
        const filltype = c.req.query("filltype");
        const collateral = c.req.query("collateral");
        const is_buy = c.req.query("is_buy"); // "true" or "false"
        const limit = Number(c.req.query("limit") ?? 10);
        const offset = Number(c.req.query('offset') ?? 0)
        const currenttoken = await prisma.premarketToken.findUnique({
            where: {
                token_addr: addr,
                status: { in: [1, 3] }
            }
        })
        if (currenttoken) {
            userAddr = 'all'
        }

        const offers = await prisma.premarketOffer.findMany({
            where: {
                token_addr: addr,
                is_active: true,
                ...(is_buy !== undefined ? { is_buy: is_buy === "false" } : {}),
                AND: [
                    filltype && filltype !== "all"
                        ? { is_full_match: filltype === "full" }
                        : {},

                    collateral && collateral != 'all' ?
                        { collateral_asset: collateral }
                        :
                        {},
                    userAddr && userAddr !== ''
                        ? { created_by: { not: userAddr } }
                        : {}
                ],
            },
            take: limit,
            skip: offset * limit,
        });
        return c.json(serialize(offers), 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to fetch offers" }, 500);
    }
};

// export const getOffers = async (c: Context) => {
//     try {
//         const { addr } = c.req.param();
//         const userAddr = c.req.query('userAddr');
//         const filltype = c.req.query("filltype");
//         const collateral = c.req.query("collateral");
//         const is_buy = c.req.query("is_buy");
//         const limit = Math.min(Number(c.req.query("limit")) || 10, 100); // Cap at 100
//         const offset = Number(c.req.query('offset')) || 0;

//         const currentToken = await prisma.premarketToken.findUnique({
//             where: {
//                 token_addr: addr,
//                 status: { in: [1, 3] }
//             }
//         });

//         if (!currentToken) {
//             return c.json({ error: "Token not found or inactive" }, 404);
//         }

//         const whereConditions: any = {
//             token_addr: addr,
//             is_active: true
//         };

//         // filters
//         if (is_buy === "true" || is_buy === "false") {
//             whereConditions.is_buy = is_buy === "false";
//         }

//         if (filltype && filltype !== "all") {
//             whereConditions.is_full_match = filltype === "full";
//         }

//         if (collateral && collateral !== "all") {
//             whereConditions.collateral_asset = collateral;
//         }

//         // Exclude user's own offers if userAddr is provided
//         if (userAddr && userAddr.trim() !== "") {
//             whereConditions.created_by = { not: userAddr };
//         }

//         const offers = await prisma.premarketOffer.findMany({
//             where: whereConditions,
//             take: limit,
//             skip: offset * limit,
//             orderBy: { ts: 'desc' } // Add consistent ordering
//         });

//         return c.json(serialize(offers), 200);
//     } catch (error) {
//         console.error('Error fetching offers:', error);
//         return c.json({ error: "Failed to fetch offers" }, 500);
//     }
// };