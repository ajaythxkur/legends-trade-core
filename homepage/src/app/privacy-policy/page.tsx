import Section from "@/components/section";
import { H4, H6, PLarge, PSmall } from "@/components/typography";
import { MailAddress } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

export const metadata: Metadata = {
    title: 'Legends Trade | Privacy Policy',
    description: 'Privary policy'
}



export default function PrivacyPolicy() {
    return (
        <Section className="text-left">
            <div className="max-w-7xl m-auto pb-0 pt-20 md:pt-40 md:pb-20 px-4 xl:px-0 text-neutral-darker">
                <div className="flex items-center flex-wrap md:flex-nowrap justify-between ">
                    <H4>Privacy Policy</H4>
                    <div className="space-y-2 mt-4 md:mt-0">
                        <PSmall>Last Updated: June 26, 2025</PSmall>
                        <PSmall>Effective Date: June 26, 2025</PSmall>
                    </div>
                </div>

                <div className="p-0 lg:p-2.5 mt-5">
                    <PSmall>At Legends Trade, we value your privacy and are committed to handling your personal information responsibly and transparently. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect it.</PSmall>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge>Information We Collect</PLarge>
                        <div className="space-y-4">
                            <PSmall className="font-medium">We may collect limited personal identifiers that you voluntarily provide in order to participate in certain features of our platform, such as our Rewards Program. This may include:</PSmall>
                            <div className="space-y-1">
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Discord ID</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Telegram ID</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />X (Twitter) ID</PSmall>
                            </div>
                        </div>
                        <PSmall>In addition, we may collect non-personal data through third-party analytics tools (such as Google Analytics) that help us understand usage patterns and improve our platform. This may include:</PSmall>

                        <div className="spece-y-2">
                            <PSmall className="font-medium">These identifiers are collected only with your consent and are used strictly for verifying your participation, distributing rewards, and preventing fraud.</PSmall>
                            <div className="space-y-1">
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />General geographic location (based on IP)</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Device and browser type</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Referrer and session duration</PSmall>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <PSmall className="font-medium">We do not collect your name, email address, or other personally identifying information unless explicitly provided.</PSmall>
                            <PSmall className="font-medium">🔗 For more details on how Google Analytics works, visit:</PSmall>
                            <Link href="https://marketingplatform.google.com/about/analytics/" target="_blank" className="break-words hover:underline"><PSmall className="font-bold">https://marketingplatform.google.com/about/analytics/</PSmall></Link>
                            <PSmall className="font-medium">We also analyze public blockchain data, including wallet addresses and transaction history, to offer tailored services and improve platform performance.</PSmall>
                        </div>
                    </div>
                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge weight="medium" className="font-semibold">How We Use Your Information</PLarge>
                        <div className="space-y-1">
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />To administer and validate participation in our rewards programs</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />To improve our user interface and service delivery</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />To prevent abuse, fraud, or manipulation of our platform</PSmall>
                            <PSmall className="font-medium flex items-center gap-1"><BsDot />To comply with applicable laws and regulations</PSmall>
                        </div>
                        <PSmall>We will never sell or share your personal identifiers with third parties for marketing purposes.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge weight="medium" className="font-semibold">Data Security</PLarge>
                        <PSmall className="font-medium">We implement industry-standard security measures to protect the information we collect. However, no online system is completely secure. We encourage users to maintain strong passwords and exercise caution when sharing information.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge weight="medium" className="font-semibold">International Use</PLarge>
                        <PSmall className="font-medium">Legends Trade is accessible globally. By using our services, you agree that your information may be stored and processed in countries outside your own jurisdiction. We comply with relevant international data protection laws, including the GDPR (for users in the EU) and similar frameworks where applicable.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge weight="medium" className="font-semibold">Your Rights</PLarge>
                        <div className="space-y-2">
                            <PSmall className="font-medium">Depending on your country of residence, you may have rights to:</PSmall>
                            <div className="space-y-1">
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Access the data we have about you</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Request corrections or deletions</PSmall>
                                <PSmall className="font-medium flex items-center gap-1"><BsDot />Withdraw consent for data collection</PSmall>
                            </div>
                        </div>
                        <PSmall>To exercise any of these rights, please contact us directly.</PSmall>
                    </div>

                    <div className="space-y-6 md:space-y-8 mt-6">
                        <PLarge weight="medium" className="font-semibold">Contact Us</PLarge>
                        <PSmall>If you have questions or concerns about this Privacy Policy or how your data is handled, feel free to reach out:</PSmall>
                        <Link href={`mailto:${MailAddress}`}><PSmall className="font-medium">📧 {MailAddress}</PSmall></Link>
                        <PSmall>Our support team is here to assist you.</PSmall>
                    </div>
                </div>
            </div >
        </Section>
    )
}