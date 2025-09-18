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
                    network && network !== '4'
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
        const twentyFourHoursAgo = BigInt(Math.floor(Date.now() / 1000) - 24 * 60 * 60);
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

        // const totaltokens = await prisma.premarketToken.findMany()
        // const totalpages = Math.ceil(totaltokens.length / limit);
        const totaltokens = await prisma.premarketToken.count()
        const totalpages = Math.ceil(totaltokens / limit);
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

// // get token information
// export const getTokenInfo = async (c: Context) => {
//     try {
//         const { addr } = c.req.param();
//         const tokens = await prisma.premarketToken.findMany({
//             where: {
//                 token_addr: addr
//             },
//             include: {
//                 offers: {
//                     orderBy: {
//                         ts: 'desc'
//                     }
//                 }
//             }
//         });

//         // Calculate 24 hours ago timestamp
//         // const twentyFourHoursAgo = BigInt(Date.now() - 24 * 60 * 60 * 1000);
//         const twentyFourHoursAgo = BigInt(Math.floor(Date.now() / 1000) - 24 * 60 * 60);

//         const tokensWithMetrics = tokens.map(token => {
//             const { offers, ...tokenData } = token;

//             // Last price (latest offer)
//             const lastPrice = offers.length > 0 ? offers[0].price : BigInt(0);

//             // Previous price (second latest offer, if exists)
//             const prevPrice = offers.length > 1 ? offers[1].price : BigInt(0);

//             // Price change %
//             let priceChange = 0;
//             if (prevPrice > 0n) {
//                 const diff = Number(lastPrice - prevPrice);
//                 priceChange = (diff / Number(prevPrice)) * 100;
//             }

//             // Total volume (all time)
//             const totalVolume = offers.reduce((sum, offer) => {
//                 return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
//             }, BigInt(0));

//             // 24h volume
//             const twentyFourHourVolume = offers
//                 .filter(offer => offer.ts >= twentyFourHoursAgo)
//                 .reduce((sum, offer) => {
//                     return sum + BigInt(Number(offer.amount) / 10000 * Number(offer.price));
//                 }, BigInt(0));

//             return {
//                 ...tokenData,
//                 lastPrice,
//                 volAll: totalVolume,
//                 vol24h: twentyFourHourVolume,
//                 priceChange,
//             };
//         });

//         return c.json(serialize(tokensWithMetrics), 200);
//     } catch (error) {
//         console.error("Error fetching tokens:", error);
//         return c.json({ error: "Failed to fetch tokens" }, 500);
//     }
// };

// get token information
export const getTokenInfo = async (c: Context) => {
    try {
        const { addr } = c.req.param();

        // Get current prices (you might want to fetch these from an oracle or API)
        const aptPrice = 4.3; // USD
        const usdcPrice = 1.0; // USD (assuming USDC is pegged to $1)

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

        const twentyFourHoursAgo = BigInt(Math.floor(Date.now() / 1000) - 24 * 60 * 60);

        const tokensWithMetrics = tokens.map(token => {
            const { offers, ...tokenData } = token;

            // Helper function to convert price to USD based on collateral type
            const convertToUSD = (price: bigint, collateralType: string): number => {
                const priceInCollateral = Number(price) / Math.pow(10, 8);

                switch (collateralType?.toLowerCase()) {
                    case '0x000000000000000000000000000000000000000000000000000000000000000a':
                        return priceInCollateral * aptPrice;
                    case '0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832':
                        return priceInCollateral * usdcPrice;
                    default:
                        // Default to APT if collateral type is not specified
                        return priceInCollateral * aptPrice;
                }
            };

            // Get last offer with collateral info
            const lastOffer = offers.length > 0 ? offers[0] : null;
            const lastPrice = lastOffer ? lastOffer.price : BigInt(0);
            const lastPriceUSD = lastOffer ? convertToUSD(lastPrice, lastOffer.collateral_asset) : 0;

            // Get previous offer for price change calculation
            const prevOffer = offers.length > 1 ? offers[1] : null;
            const prevPrice = prevOffer ? prevOffer.price : BigInt(0);
            const prevPriceUSD = prevOffer ? convertToUSD(prevPrice, prevOffer.collateral_asset) : 0;

            // Price change % (in USD terms for consistency)
            let priceChange = 0;
            if (prevPriceUSD > 0) {
                priceChange = ((lastPriceUSD - prevPriceUSD) / prevPriceUSD) * 100;
            }

            // Total volume (all time) in USD
            const totalVolume = offers.reduce((sum, offer) => {
                const offerValue = (Number(offer.amount) / 10000) * convertToUSD(offer.price, offer.collateral_asset);
                return sum + offerValue;
            }, 0);

            // 24h volume in USD
            const twentyFourHourVolume = offers
                .filter(offer => offer.ts >= twentyFourHoursAgo)
                .reduce((sum, offer) => {
                    const offerValue = (Number(offer.amount) / 10000) * convertToUSD(offer.price, offer.collateral_asset);
                    return sum + offerValue;
                }, 0);

            return {
                ...tokenData,
                lastPrice: lastPrice, // Raw price in original collateral
                lastPriceUSD: Math.round(lastPriceUSD * 100) / 100, // Price in USD
                lastPriceCollateral: lastOffer?.collateral_asset || 'apt', // Which collateral was used
                volAll: Math.round(totalVolume * 100) / 100, // Volume in USD
                vol24h: Math.round(twentyFourHourVolume * 100) / 100, // 24h volume in USD
                priceChange: Math.round(priceChange * 100) / 100, // Price change %
                // Additional pricing info
                currentPrices: {
                    apt: aptPrice,
                    usdc: usdcPrice
                }
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
        const { userAddr, filltype, collateral, is_buy, limit, offset } = c.req.query();
        // const currenttoken = await prisma.premarketToken.findUnique({
        //     where: {
        //         token_addr: addr,
        //         status: { in: [1, 3] }
        //     }
        // })
        // if (currenttoken) {
        //     userAddr = 'all'
        // }

        const offers = await prisma.premarketOffer.findMany({
            where: {
                token_addr: addr,
                is_active: true,
                NOT: {
                    filled_amount: { equals: prisma.premarketOffer.fields.amount }
                },

                ...(is_buy !== undefined ? { is_buy: is_buy === "false" } : {}),
                AND: [
                    filltype && filltype !== "all"
                        ? { is_full_match: filltype === "full" }
                        : {},

                    collateral && collateral != 'all' ?
                        { collateral_asset: collateral }
                        :
                        {},
                    // userAddr && userAddr !== ''
                    //     ? { created_by: { not: userAddr } }
                    //     : {}
                ],
            },
            take: Number(limit),
            skip: Number(offset) * Number(limit),
            orderBy: {
                ts: "desc",
            },
        });

        const totalOffers = await prisma.premarketOffer.count({
            where: { token_addr: addr }
        });

        const myOffers = userAddr
            ? await prisma.premarketOffer.count({
                where: {
                    token_addr: addr,
                    created_by: userAddr,
                },
            })
            : 0;

        const totalOrders = await prisma.premarketOrder.count({
            where: { token_addr: addr }
        });

        return c.json(serialize({
            offers: offers,
            totalOffers: totalOffers,
            myOffers: myOffers,
            totalOrders: totalOrders
        }), 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to fetch offers" }, 500);
    }
};

// ===========================================================================
// ===========================================================================

export const updateTokenData = async (c: Context) => {
    try {
        const addr = c.req.query('addr');
        if (!addr) {
            return c.json({ error: "token address missing" }, 400);
        }

        const name = c.req.query('name') ?? undefined;
        const symbol = c.req.query('symbol') ?? undefined;
        const temp_starts_at = c.req.query('temp_starts_at') ?? undefined;
        const temp_ends_at = c.req.query('temp_ends_at') ?? undefined;
        const image = c.req.query('image') ?? undefined;

        const updated = await prisma.premarketToken.update({
            where: { token_addr: addr },
            data: {
                ...(name && { name }),
                ...(symbol && { symbol }),
                ...(temp_starts_at && { temp_starts_at: BigInt(temp_starts_at) }),
                ...(temp_ends_at && { temp_ends_at: BigInt(temp_ends_at) }),
                ...(image && { image: image }),
            },
        });

        return c.json(serialize(updated), 200);
    } catch (err) {
        console.error("updateTokenData error", err);
        return c.json({ error: "failed to update token" }, 500);
    }
};


// Update Token CrossChain Address
export const updateCrossChainAddress = async (c: Context) => {
    try {
        const { token_addr, chain_type, cc_address } = c.req.query()
        const token = await prisma.premarketToken.update({
            where: {
                token_addr: token_addr,
                chain_type: Number(chain_type),
            },
            data: {
                chain_type: Number(chain_type),
                cross_chain_address: cc_address
            }
        });
        if (token) {
            return c.json({ message: "Token data updated", updatedtoken: serialize(token) });
        }
        return c.json({ message: "Token not found" });
    } catch (error) {
        return c.json(`Failed to update: ${error}`)
    }
}

//get tokens having cross chain address.
export const getCrossChainTokens = async (c: Context) => {
    try {
        const { chain } = c.req.query()
        const tokens = await prisma.premarketToken.findMany({
            where: {
                cross_chain_address: { not: null },
                chain_type: Number(chain)
            }
        })
        return c.json(serialize(tokens));
    } catch (err) {
        return c.json(`Failed to get tokens: ${err}`)
    }
}
