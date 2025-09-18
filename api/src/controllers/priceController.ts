import type { Context } from "hono";
import axios from "axios";

export const getTokenPrice = async (c: Context) => {
    try {
        const symbol = c.req.param("symbol")?.toUpperCase();

        // map your token symbols to CoinGecko ids
        const cgMap: Record<string, string> = {
            APT: "aptos",
            USDC: "usd-coin",
        };

        if (!symbol || !cgMap[symbol]) {
            return c.json({ error: "Unsupported token symbol" }, 400);
        }

        // fetch from CoinGecko
        const { data } = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
                params: {
                    ids: cgMap[symbol],
                    vs_currencies: "usd",
                },
            }
        );


        const price = data[cgMap[symbol]]?.usd;
        console.log(price)
        if (!price) {
            return c.json({ error: "Price not available" }, 500);
        }

        return c.json({ data: price });
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
};



// import type { Context } from "hono";
// export const getTokenPrice = async (c: Context) => {
//     try {
//         // TODO: fetch prices in cache
//         const symbol = c.req.param("symbol");
//         if (symbol === "APT") {
//             return c.json({ data: 4.3 })
//         };
//         if (symbol === "USDC") {
//             return c.json({ data: 1 })
//         }
//     } catch (error: any) {
//         return c.json({ error: error.message }, 500);
//     }
// };