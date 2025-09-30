
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import { Metadata } from "next";
import Section from "@/components/section";
import { H4, PLarge, PSmall } from "@/components/typography";
import { MailAddress } from "@/lib/constants";

export const metadata: Metadata = {
    title: 'Legends Trade | Terms of Service',
    description: 'Terms of service'
}

export default function Terms() {
    return (
        <Section className="text-left">
            <div className="max-w-7xl m-auto pb-0 pt-20 md:pt-40 md:pb-20 px-4 xl:px-0 text-neutral-darker">
                <div className="flex items-center flex-wrap md:flex-nowrap justify-between">
                    <H4>Term of Service</H4>
                    <div className="space-y-2">
                        <PSmall>Last Updated: June 26, 2025</PSmall>
                        <PSmall>Effective Date: June 26, 2025</PSmall>
                    </div>
                </div>
                <div className="p-0 lg:p-2.5 mt-5">
                    <PSmall>The information provided by <span className="font-black">Legends Trade (“we,” “our,” or “us”)</span> is for general informational and educational purposes only. All content, features, and tools provided on the Legends Trade platform, including but not limited to staking, liquidity provisioning, rewards programs, and analytics, are intended to support users in understanding DeFi mechanics and participating at their own discretion.
                    </PSmall>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">No Financial or Investment Advice</PLarge>
                        <PSmall className="font-medium">Legends Trade does not provide financial, investment, legal, or tax advice. None of the information on our platform should be interpreted as a recommendation to buy, sell, or hold any cryptocurrency, token, or financial product.
                        </PSmall>
                        <PSmall>You should always conduct your own research and consult with a licensed financial advisor before making any financial decisions.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">User Responsibility</PLarge>

                        <div className="space-y-1">
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />By using Legends Trade, you acknowledge and agree that:</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />Participation in any DeFi-related activity involves risk, including the potential loss of capital.</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />You are solely responsible for your actions and decisions while using the platform.</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />Legends Trade does not guarantee any returns, rewards, or performance outcomes.</PSmall>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">Blockchain Risk Acknowledgment</PLarge>
                        <PSmall>Legends Trade interacts with decentralized blockchain networks (such as Aptos). You understand that:</PSmall>

                        <div className="space-y-1">
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />Blockchain transactions are irreversible and non-custodial.</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />There may be network congestion, bugs, or smart contract vulnerabilities.</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />Legends Trade is not liable for losses or issues arising from third-party protocols, wallet providers, or blockchain networks.</PSmall>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">No Warranties</PLarge>
                        <PSmall className="font-medium">All services and information provided by Legends Trade are offered on an “as is” and “as available” basis, without warranties of any kind—express or implied.
                        </PSmall>
                        <PSmall className="font-medium">We do not guarantee uptime, continuous access, or error-free functionality. We reserve the right to modify, update, or suspend features at any time without prior notice.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">Your Rights</PLarge>
                        <PSmall className="font-medium">Legends Trade is a global platform. However, it is your responsibility to ensure that your use of the platform complies with all local laws and regulations in your jurisdiction.</PSmall>
                        <PSmall className="font-medium">We do not permit the use of our platform where such usage is prohibited by law.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge className="font-semibold">Contact Us</PLarge>
                        <PSmall>For any questions regarding this disclaimer, reach out to:</PSmall>
                        <Link href={`mailto:${MailAddress}`}><PSmall className="font-medium">📧 {MailAddress}</PSmall></Link>
                    </div>
                </div>
            </div>
        </Section>
    )
}