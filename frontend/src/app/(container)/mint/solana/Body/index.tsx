'use client'

import { Button } from "@/components/ui/button"
import { H3, PSmall } from "@/components/ui/typography"
import { TokenMintSchema } from "@/utils/validate"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useFormik } from 'formik'
import { useState } from "react"
interface BodyProps {
    network: string;
}

export default function Body({ network }: BodyProps) {
    const { connected } = useWallet()
    const [loading, setLoading] = useState(false)
    // const [tokendata, setTokenData] = useState({ name: "", symbol: "", decimals: "", amount: "", address: "", })
    const { values, errors, touched, handleChange, handleSubmit, resetForm, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            symbol: "",
            decimals: "",
            amount: "",
            address: "",
        },
        validate: (values) => {
            const result = TokenMintSchema.safeParse(values);
            if (!result.success) {
                return result.error.flatten().fieldErrors;
            }
            return {};
        },
        onSubmit: async (formdata) => {
            try {
                setLoading(true)
                if (!connected) {
                    throw new Error("Wallet is not connected")
                }
                console.log(formdata)
                // setTokenData(formdata)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    });
    return (
        <div className="py-4">
            <div className="shadow p-6 w-full max-w-2xl mx-auto rounded-2xl">
                <H3>Mint Tokens {network}</H3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6" autoComplete="off">
                    <div className="space-y-5 ">
                        <div className="space-y-2">
                            <PSmall>Token Name</PSmall>
                            <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Enter token name" className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none" />
                            {errors.name && touched.name && <PSmall className="text-negative-text flex items-center gap-1 -mt-1">{errors.name}</PSmall>}
                        </div>
                        <div className="space-y-2">
                            <PSmall>Token Symbol</PSmall>
                            <input type="text" name="symbol" value={values.symbol} onChange={handleChange} placeholder="Enter token symbol" className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none" />
                            {errors.symbol && touched.symbol && <PSmall className="text-negative-text flex items-center gap-1 -mt-1">{errors.symbol}</PSmall>}
                        </div>
                        <div className="space-y-2">
                            <PSmall>Token Decimals</PSmall>
                            <input type="text" name="decimals" value={values.decimals} onChange={handleChange} placeholder="Enter token decimals" className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none" />
                            {errors.decimals && touched.decimals && <PSmall className="text-negative-text flex items-center gap-1 -mt-1">{errors.decimals}</PSmall>}
                        </div>
                        <div className="space-y-2">
                            <PSmall>Token Amount</PSmall>
                            <input type="text" name="amount" value={values.amount} onChange={handleChange} placeholder="Enter token amount" className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none" />
                            {errors.amount && touched.amount && <PSmall className="text-negative-text flex items-center gap-1 -mt-1">{errors.amount}</PSmall>}
                        </div>
                        <div className="space-y-2">
                            <PSmall>Token Address (add ',' for multiple addresses)</PSmall>
                            <textarea name="address" value={values.address} onChange={handleChange} placeholder="Enter token address" rows={5} className="py-3 px-4 rounded-md bg-bottom-layer-1 text-input-field-text-color w-full focus:outline-none" />
                            {errors.address && touched.address && <PSmall className="text-negative-text flex items-center gap-1 -mt-1">{errors.address}</PSmall>}
                        </div>
                        <div className="text-center grid grid-cols-2 gap-4">
                            <Button variant="ghost" type="button" className="w-full" onClick={() => resetForm()}>Reset</Button>
                            <Button type="submit" className="ms-auto w-full" disabled={loading}>Mint Now</Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* <div className="max-w-2xl w-full mx-auto space-y-2 mt-4">
                {Object.entries(tokendata).map(([key, value], i) => {
                    return (
                        <div key={i} className="grid grid-cols-2 items-center justify-between gap-4">
                            <PSmall className="capitalize">{key}:</PSmall>
                            <PSmall className="text-end break-words">{value}</PSmall>
                        </div>
                    )
                })}
            </div> */}

        </div>
    )
}