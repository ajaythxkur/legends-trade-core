import type { Context } from "hono";
export const getTokenPrice = async (c: Context) => {
    try {
        // TODO: fetch prices in cache
       const symbol = c.req.param("symbol");
       if(symbol === "APT") {
        return c.json({ data: 4.3 })
       };
       if(symbol === "USDC") {
        return c.json({ data: 1 })
       }
    } catch (error: any) {
        return c.json({ error: error.message }, 500);
    }
};
