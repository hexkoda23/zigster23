"use client";

import React from "react";
import { motion } from "framer-motion";

const StepCard = ({
    number,
    title,
    features,
    time
}: {
    number: string;
    title: string;
    features: string[];
    time: string
}) => {
    return (
        <div className="relative glass p-10 flex flex-col gap-8 group hover:border-primary/50 transition-colors duration-500 rounded-sm">
            <div className="text-6xl font-serif font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500 absolute top-8 right-10">
                {number}
            </div>

            <div className="space-y-4 relative z-10">
                <div className="w-8 h-[2px] bg-primary"></div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight leading-tight">
                    {title}
                </h3>
            </div>

            <ul className="space-y-4 relative z-10">
                {features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground font-sans">
                        <span className="text-primary mt-1">✦</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-8 border-t border-border flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold font-sans uppercase tracking-[0.3em] text-muted-foreground">ESTIMATED TIME</span>
                <span className="text-xs font-bold font-sans uppercase tracking-[0.3em] text-primary">{time}</span>
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "CREATE YOUR REGISTRY",
            features: [
                "Sign up with email or Google",
                "Choose your occasion type",
                "Personalize with photos and a message",
                "Set your privacy preferences"
            ],
            time: "2 MINUTES"
        },
        {
            number: "02",
            title: "ADD GIFTS FROM ANY STORE",
            features: [
                "Paste links from Jumia, Jiji, Temu, Konga",
                "Use our Chrome extension for 1-click adds",
                "Add cash gift funds for larger items",
                "Organize by priority and category"
            ],
            time: "ANYTIME"
        },
        {
            number: "03",
            title: "SHARE WITH FAMILY & FRIENDS",
            features: [
                "Get a personalized Zigister link",
                "Share directly to WhatsApp groups",
                "Send beautiful digital eCards",
                "Download QR codes for physical invites"
            ],
            time: "INSTANT"
        },
        {
            number: "04",
            title: "TRACK PURCHASES & THANK YOU NOTES",
            features: [
                "Get real-time purchase notifications",
                "Track Jumia and Temu order status",
                "Manage your thank-you guest list",
                "Withdraw cash funds to your bank account"
            ],
            time: "ONGOING"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-secondary/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-end">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="section-label">A Simple Process</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
                            HOW ZIGISTER <span className="text-primary italic">WORKS.</span>
                        </h2>
                    </div>
                    <div className="lg:col-span-4">
                        <p className="text-muted-foreground font-sans text-sm leading-relaxed uppercase tracking-wider">
                            We've simplified the gifting experience for Nigerians. Add from anywhere, share everywhere, track everything.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <StepCard {...step} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
