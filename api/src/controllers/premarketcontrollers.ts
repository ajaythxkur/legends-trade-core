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

        // const tokens = await prisma.premarketToken.findMany({
        //     include: {
        //         offers: {
        //             orderBy: {
        //                 ts: 'desc'
        //             }
        //         }
        //     }
        // });
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
            skip: offset,
            take: limit,
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

        return c.json(serialize(tokensWithMetrics), 200);
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return c.json({ error: "Failed to fetch tokens" }, 500);
    }
};

// export const getTokenInfo = async (c: Context) => {
//     try {
//         const { addr } = c.req.param();
//         const token = await prisma.premarketToken.findUnique({
//             where: {
//                 token_addr: addr
//             }
//         });
//         return c.json(serialize(token), 200);
//     } catch (error) {
//         console.error("Error fetching token:", error);
//         return c.json({ error: "Failed to fetch token INFO" }, 500);
//     }
// };

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

export const getOffers = async (c: Context) => {
    try {
        const { addr } = c.req.param()
        const offers = await prisma.premarketOffer.findMany({
            where: {
                token_addr: addr
            }
        });
        // return c.json(offers);
        return c.json(serialize(offers), 200);
    }
    catch (error) {
        console.log(error)
        return c.json(`${error}`)
    }
}