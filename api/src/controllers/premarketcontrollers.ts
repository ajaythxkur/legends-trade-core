import type { Context } from "hono";
import prisma from "../lib/prisma.js";
import { randomUUID } from "crypto";

const serialize = (data: any) =>
    JSON.parse(
        JSON.stringify(data, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
export const getTokens = async (c: Context) => {
    try {
        const tokens = await prisma.premarketToken.findMany()
        return c.json(serialize(tokens), 200);
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return c.json({ error: "Failed to fetch tokens" }, 500);
    }
};

export const getTokenInfo = async (c: Context) => {
    try {
        const { addr } = c.req.param();
        const token = await prisma.premarketToken.findUnique({
            where: {
                token_addr: addr
            }
        });
        return c.json(serialize(token), 200);
    } catch (error) {
        console.error("Error fetching token:", error);
        return c.json({ error: "Failed to fetch token INFO" }, 500);
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


// export const createOffers = async (c: any) => {
//     try {
//         const body = c.req.json()
//         const offer = await prisma.premarketOffer.create({
//             data: {
//                 offer_addr: randomUUID(),          // generate unique ID
//                 token_addr: body.token_addr,       // must exist in PremarketToken
//                 price: BigInt(body.price),         // convert to BigInt
//                 amount: BigInt(body.amount),
//                 is_buy: body.is_buy,
//                 is_full_match: body.is_full_match,
//                 created_by: body.created_by,
//                 ts: BigInt(Date.now()),            // or body.ts if provided
//                 filled_amount: BigInt(0),          // start at 0
//                 is_active: body.is_active ?? true, // optional
//             },
//         })
//         return c.json(offer, 201)
//     } catch (error) {
//         console.error("Error creating offer:", error);
//         return c.json({ error: "Failed to create offer" }, 500);
//     }
// }