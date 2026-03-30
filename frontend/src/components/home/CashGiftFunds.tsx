"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palmtree, Home, GraduationCap, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const FundCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
    return (
        <div className="glass p-8 flex flex-col gap-6 group hover:border-gold/30 transition-all duration-500">
            <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 rounded-sm">
                <Icon size={24} />
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-serif font-bold text-foreground tracking-tight uppercase">{title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const CashGiftFunds = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden text-foreground">
            {/* Decorative Gold Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="section-label">Cash Gift Funds</div>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
                                BECAUSE SOME DREAMS <br />
                                <span className="text-primary text-5xl md:text-7xl">DON'T FIT IN A BOX.</span>
                            </h2>
                        </div>

                        <p className="text-lg text-muted-foreground font-sans leading-relaxed tracking-wide max-w-lg">
                            Can't find the perfect physical gift? Let your guests contribute money toward your larger goals.
                            Secure, transparent, and built for Nigeria.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 text-foreground/80 font-sans text-sm font-bold uppercase tracking-widest">
                                <span className="text-primary">✓</span> SECURE PAYSTACK & FLUTTERWAVE INTEGRATION
                            </div>
                            <div className="flex items-center gap-4 text-foreground/80 font-sans text-sm font-bold uppercase tracking-widest">
                                <span className="text-primary">✓</span> WITHDRAW DIRECTLY TO ANY NIGERIAN BANK
                            </div>
                            <div className="flex items-center gap-4 text-foreground/80 font-sans text-sm font-bold uppercase tracking-widest">
                                <span className="text-primary">✓</span> ZERO HIDDEN FEES FOR REGISTRY OWNERS
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary text-white px-10 py-5 font-sans font-bold text-sm uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 shadow-lg"
                        >
                            LEARN ABOUT FUNDS →
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <FundCard
                                icon={Palmtree}
                                title="Honeymoon Fund"
                                description="Fuel your first adventure as a couple. Cover flights, resorts, and experiences."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="md:mt-12"
                        >
                            <FundCard
                                icon={Home}
                                title="Home Deposit"
                                description="Get a head start on your first home in Lagos or Abuja with guest contributions."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <FundCard
                                icon={Heart}
                                title="Charity Donation"
                                description="Give back. Invite guests to support a cause close to your heart in Nigeria."
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:mt-12"
                        >
                            <FundCard
                                icon={GraduationCap}
                                title="Education Fund"
                                description="Invest in the future. Fund school fees or professional certifications."
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CashGiftFunds;
