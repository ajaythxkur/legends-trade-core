import { Skeleton } from "../ui/skeleton";

export default function PremarketSkeletons() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mt-6">
            {
                Array.from({ length: 12 }).map((_, i) => {
                    return (
                        <div key={i} className="bg-card-bg p-4 rounded-xl md:rounded-2xl space-y-3 md:space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Skeleton className="h-10.5 w-10.5 rounded-full" />
                                        <Skeleton className="h-4 w-4 rounded-full absolute right-0 bottom-0" />
                                    </div>

                                    <div className="space-y-1">
                                        <Skeleton className="h-5 w-30 " />
                                        <Skeleton className="h-3 w-15 " />
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>

                            {/* Static Sections */}
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-20" />
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-8" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-20" />
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-0">
                                <Skeleton className="h-4 w-20" />
                                <div className="flex gap-2 items-center flex-wrap justify-end">
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export const OffersSkeleton = () => {
    return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
            {
                Array.from(({ length: 20 })).map((_, i) => {
                    return (
                        <div key={i} className={`bg-card-bg rounded-lg px-4 py-5 flex flex-col`}>
                            <div className="flex justify-between items-start mb-4 text-secondary-text-color">
                                <div className="text-start">
                                    <Skeleton className="h-5 w-15" />
                                    <div className="flex gap-1 items-center mt-2">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-15" />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Skeleton className="h-4 w-15" />
                                    <Skeleton className="h-4 w-10 mt-2 mx-auto" />
                                    <div className="mt-4 flex justify-center">
                                        <Skeleton className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="text-end">
                                    <Skeleton className="h-5 w-15 ms-auto" />
                                    <div className="flex gap-2 items-center mt-2">
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                        <Skeleton className="h-4 w-15" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-15" />
                                <Skeleton className="h-6 w-15" />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}