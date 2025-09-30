import { z } from "zod"

const TokenMintSchema = z.object({
    name: z.string().min(1, "Token name is required").max(15, "Max 15 characters allowed"),
    symbol: z.string().min(1, "Symbol is required").max(10, "Max 10 characters allowed").refine((str) => str === str.toUpperCase(), {
        message: "Symbol must be uppercase",
    }),
    decimals: z.string().min(1, "token Decimal is required"),
    amount: z.string().min(1, "token amount is required"),
    address: z.string(),

    // website: z.string().url().optional().nullable(),
})

export {
    TokenMintSchema
}