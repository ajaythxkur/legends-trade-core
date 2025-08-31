"use client"

import type { Dispatch, SetStateAction } from "react"
import { RiArrowRightDoubleFill } from "react-icons/ri"
import { RiArrowLeftDoubleLine } from "react-icons/ri"

interface PaginationProps {
    total: number
    offset: number
    setOffset: Dispatch<SetStateAction<number>>
    loading: boolean
}

export default function PaginationNew({ total, offset, setOffset, loading }: PaginationProps) {
    if (total <= 1) return null

    return (
        <div className="flex items-center justify-center mt-4">
            <nav className="flex items-center gap-1" aria-label="Pagination">
                <button
                    onClick={() => {
                        if (loading || offset === 0) return
                        setOffset(offset - 1)
                    }}
                    disabled={loading || offset === 0}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg font-medium transition-all duration-200 cursor-pointer
                        ${offset === 0 || loading
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-neutral-90"
                        }
                    `}
                    aria-label="Previous page"
                >
                    <RiArrowLeftDoubleLine />
                </button>

                <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: total }).map((_, index) => {
                        const shouldShow =
                            index === 0 || offset - 1 === index || offset === index || offset + 1 === index || index === total - 1

                        const shouldShowEllipsis = (index === 1 && offset > 3) || (index === total - 2 && offset < total - 4)

                        if (!shouldShow && !shouldShowEllipsis) {
                            return null
                        }

                        if (shouldShowEllipsis) {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex items-center justify-center w-8 h-8 text-gray-400 font-medium border"
                                >
                                    ....
                                </span>
                            )
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (loading) return
                                    setOffset(index)
                                }}
                                disabled={loading}
                                className={`
                                    flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all duration-200 cursor-pointer
                                    ${offset === index
                                        ? "bg-primary-80 shadow-md"
                                        : loading
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "hover:bg-primary-80 hover:shadow-md"
                                    }
                                `}
                                aria-label={`Go to page ${index + 1}`}
                                aria-current={offset === index ? "page" : undefined}
                            >
                                {index + 1}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={() => {
                        if (loading || offset + 1 >= total) return
                        setOffset(offset + 1)
                    }}
                    disabled={loading || offset + 1 >= total}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg font-medium transition-all duration-200 cursor-pointer
                        ${offset + 1 >= total || loading
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-neutral-90"
                        }
                    `}
                    aria-label="Next page"
                >
                    <RiArrowRightDoubleFill />
                </button>
            </nav>
        </div>
    )
}
