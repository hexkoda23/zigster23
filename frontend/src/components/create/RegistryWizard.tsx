"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Step1_Occasion from "./steps/Step1_Occasion";
import Step2_Details from "./steps/Step2_Details";
import Step3_Payment from "./steps/Step3_Payment";
import Step4_Personalize from "./steps/Step4_Personalize";
import Step5_AddGifts from "./steps/Step5_AddGifts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RegistryWizard = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const user = typeof window !== 'undefined' ? localStorage.getItem("zigster_user") : null;
        const userData = user ? JSON.parse(user) : {};
        return {
            occasion: "",
            title: "",
            date: "",
            location: "",
            ownerName: userData.name || "",
            email: userData.email || "",
            greeting: "",
            privacy: "link-only",
            bankDetails: {
                bankName: "",
                accountNumber: "",
                accountName: ""
            },
            address: "",
        };
    });

    const updateFormData = (fields: any) => {
        setFormData((prev) => ({ ...prev, ...fields }));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 5));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const isStepValid = () => {
        if (step === 1) return !!formData.occasion;
        if (step === 2) return !!formData.title && !!formData.date && !!formData.location && !!formData.ownerName;
        if (step === 3) return !!formData.bankDetails.bankName && !!formData.bankDetails.accountNumber && (formData.bankDetails.accountNumber.length >= 10);
        return true;
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1_Occasion selected={formData.occasion} onSelect={(id) => { updateFormData({ occasion: id }); nextStep(); }} />;
            case 2: return <Step2_Details data={formData} updateData={updateFormData} />;
            case 3: return <Step3_Payment data={formData} updateData={updateFormData} />;
            case 4: return <Step4_Personalize data={formData} updateData={updateFormData} />;
            case 5: return <Step5_AddGifts onComplete={() => {
                localStorage.setItem("zigster_registry", JSON.stringify(formData));
                router.push("/dashboard");
            }} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-background py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-20 space-y-4">
                    <div className="flex justify-between items-end mb-4">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">PROGRESS</span>
                            <div className="text-sm font-serif font-bold text-foreground uppercase tracking-widest">STEP {step} OF 5</div>
                        </div>
                        <button
                            onClick={() => router.push("/")}
                            className="text-[10px] font-bold font-sans text-muted-foreground hover:text-foreground uppercase tracking-[0.3em] transition-colors"
                        >
                            EXIT WIZARD
                        </button>
                    </div>
                    <div className="h-1 w-full bg-secondary relative overflow-hidden">
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Nav Buttons */}
                {step < 5 && (
                    <div className="mt-20 flex justify-between items-center border-t border-border pt-10">
                        <button
                            onClick={prevStep}
                            className={`flex items-center gap-3 font-sans font-bold text-xs uppercase tracking-[0.3em] transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <ChevronLeft size={16} /> BACK
                        </button>

                        {step > 1 && (
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className="bg-primary text-white px-12 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-primary/10"
                            >
                                CONTINUE <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistryWizard;
