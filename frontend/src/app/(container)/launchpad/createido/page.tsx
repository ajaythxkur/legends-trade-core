'use client';
import { Button } from "@/components/ui/button";
import { H4, H6, PExtraSmall, PSmall } from "@/components/ui/typography";
import { Info } from "lucide-react";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

export default function CreateIdo() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        token_address: "",
        token_pair: "",
        soft_cap: "",
        hard_cap: "",
        min_token_per_val: "",
        max_token_per_val: "",
        token_amount: "",

        // Step 2
        locking_percentage: "",
        unlock_time: "",
        tokens_per_apt: "",
        camp_begin_date: "",
        camp_begin_time: "",
        camp_end_date: "",
        camp_end_time: "",
        vesting: "",
        vesting_duration: "",
        vesting_percentage: "",

        // Step 3
        project_name: "",
        project_token_name: "",
        project_desc: "",
        token_icon: "",
        token_cover: "",
        email: "",
        website_url: "",
        document_url: "",
        telegram_url: "",
        twitter_url: "",
        discord_url: "",

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        // You can now POST this to your backend
    };
    return (

        <section className="w-full xl:w-2/3 2xl:w-1/2 m-auto flex justify-center lg:gap-10 2xl:gap-20 p-0 lg:p-4">
            <div className="hidden lg:block steps mt-10">
                <Button variant="tag" size="xs">Step {step}/3</Button>
                <div className="flex flex-col items-center mt-6">
                    <div className="text-logo-symbol bg-logo-surface text-center rounded-full w-8 h-8 flex items-center justify-center">
                        {step === 1
                            ? <LuLoader className="text-lg" />
                            : <span className="text-sm font-medium">1</span>
                        }
                    </div>
                    <div className={`border-l-2 h-50 ${step > 1 ? 'border-solid' : 'border-dashed'}`}></div>
                    <div className="text-logo-symbol bg-logo-surface text-center rounded-full w-8 h-8 flex items-center justify-center">
                        {step === 2
                            ? <LuLoader className="text-lg" />
                            : <span className="text-sm font-medium">2</span>
                        }
                    </div>
                    <div className={`border-l-2 h-50 ${step > 2 ? 'border-solid' : 'border-dashed'}`}></div>
                    <div className="text-logo-symbol bg-logo-surface text-center rounded-full w-8 h-8 flex items-center justify-center">
                        {step === 3
                            ? <LuLoader className="text-lg" />
                            : <span className="text-sm font-medium">3</span>
                        }
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div>
                    <H4 className="text-primary-text-color">Create new IDO</H4>
                    <PSmall className="text-tertiary-text-color pt-1">Complete the form in 3 simple steps and launch your own IDO</PSmall>
                </div>
                <Button variant="tag" size="xs" className="lg:hidden mt-4">Step {step}/3</Button>
                {/* <div className="p-6 mt-8 rounded-lg shadow-[0_0_16px] shadow-card-shadow bg-xl-card-bg"> */}
                <div className="lg:p-6 mt-8 rounded-lg lg:shadow-[0_0_16px] lg:shadow-card-shadow lg:bg-xl-card-bg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                <H6 className="text-primary-text-color">Token Details</H6>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Enter Token address <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="token_address" placeholder="Enter Token address" value={formData.token_address} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="token_pair" placeholder="Token Pair" value={formData.token_pair} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="flex justify-between gap-5">
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="text" name="soft_cap" placeholder="00.00" value={formData.soft_cap} onChange={handleChange} className="ido-input" />
                                    </div>
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="text" name="hard_cap" placeholder="00.00" value={formData.hard_cap} onChange={handleChange} className="ido-input" />
                                    </div>
                                </div>

                                <div className="flex justify-between gap-5">
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="text" name="min_token_per_val" placeholder="00.00" value={formData.min_token_per_val} onChange={handleChange} className="ido-input" />
                                    </div>
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="text" name="max_token_per_val" placeholder="00.00" value={formData.max_token_per_val} onChange={handleChange} className="ido-input" />
                                    </div>
                                </div>
                                <div className="field flex-1">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Select token pair <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="token_amount" placeholder="00.00" value={formData.token_amount} onChange={handleChange} className="ido-input" />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <H6 className="text-primary-text-color">IDO Setting</H6>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Percentage for locking liquidity to legend trade (%) <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="locking_percentage" placeholder="Enter no. in percentage" value={formData.locking_percentage} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Liquidity unlock time (in sec.) <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="unlock_time" placeholder="Enter amount" value={formData.unlock_time} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Tokens per  APT <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="tokens_per_apt" placeholder="Tokens per APT" value={formData.tokens_per_apt} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="flex justify-between gap-5">
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Campaign begin date <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="date" name="camp_begin_date" value={formData.camp_begin_date} onChange={handleChange} className="ido-input" />
                                    </div>
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Campaign begin time <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="time" name="camp_begin_time" value={formData.camp_begin_time} onChange={handleChange} className="ido-input" />
                                    </div>
                                </div>

                                <div className="flex justify-between gap-5">
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Campaign end date <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="date" name="camp_end_date" value={formData.camp_end_date} onChange={handleChange} className="ido-input" />
                                    </div>
                                    <div className="field flex-1">
                                        <div className="flex justify-between items-center">
                                            <PExtraSmall className="text-input-field-text-color flex gap-2">Campaign end time <FaStarOfLife className="ido-required" /></PExtraSmall>
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </div>
                                        <input type="time" name="camp_end_time" value={formData.camp_end_time} onChange={handleChange} className="ido-input" />
                                    </div>
                                </div>
                                <div className="field ido-input">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2 items-center">
                                            Vesting
                                            <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                        </PExtraSmall>
                                        <input type="checkbox" name="vesting" placeholder="Vesting" value={formData.vesting} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Duration (in Months) <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="vesting_duration" placeholder="Enter Duration" value={formData.vesting_duration} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Unlock Token (in %) <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="vesting_percentage" placeholder="Enter Percentage" value={formData.vesting_percentage} onChange={handleChange} className="ido-input" />
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <H6 className="text-primary-text-color">Project Details</H6>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Project name <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="project_name" placeholder="Project Name" value={formData.project_name} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Project token name <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="project_token_name" placeholder="Enter token name: ASIT" value={formData.project_token_name} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Project description <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="project_token_name" placeholder="Type your message in here" value={formData.project_token_name} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Project description <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="project_desc" placeholder="Project Description" value={formData.project_desc} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Token logo/icon <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="file" name="token_icon" value={formData.token_icon} onChange={handleChange} className="ido-input" />
                                </div>

                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Upload cover image <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="file" name="token_cover" value={formData.token_cover} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Email <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="email" placeholder="Project Description" value={formData.email} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Email <FaStarOfLife className="ido-required" /></PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="email" placeholder="Project Description" value={formData.email} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Website (optional) </PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="website_url" placeholder="Project Description" value={formData.website_url} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Document URL (optional) </PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="document_url" placeholder="Project Description" value={formData.document_url} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Telegram URL (optional) </PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="telegram_url" placeholder="Project Description" value={formData.telegram_url} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Twitter URL (optional) </PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="twitter_url" placeholder="Project Description" value={formData.twitter_url} onChange={handleChange} className="ido-input" />
                                </div>
                                <div className="field">
                                    <div className="flex justify-between items-center">
                                        <PExtraSmall className="text-input-field-text-color flex gap-2">Discord URL (optional) </PExtraSmall>
                                        <Info className="w-4 h-4 text-tertiary-action-text-color" />
                                    </div>
                                    <input type="text" name="discord_url" placeholder="Project Description" value={formData.discord_url} onChange={handleChange} className="ido-input" />
                                </div>
                            </>
                        )}

                        <div className="flex justify-between gap-5">
                            {step > 1 && <Button variant="ghost" type="button" onClick={prevStep} className="flex-1">Back</Button>}
                            {step < 3 && <Button type="button" onClick={nextStep} className="flex-1">Next</Button>}
                            {step === 3 && <Button type="submit" className="flex-1">Submit</Button>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}