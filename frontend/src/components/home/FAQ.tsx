"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
    return (
        <div className="border-b border-border py-8">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left group"
            >
                <h3 className={`text-xl font-serif font-bold transition-colors duration-500 uppercase tracking-tight ${isOpen ? 'text-primary' : 'text-foreground/80 group-hover:text-foreground'}`}>
                    {question}
                </h3>
                <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-secondary text-primary'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pt-6 pb-2 text-muted-foreground font-sans leading-relaxed tracking-wide max-w-4xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is Zigister 23?",
            answer: "Zigister 23 is a universal gift registry built specifically for Nigeria. It allows you to add items from any Nigerian or international store—like Jumia, Jiji, Temu, and Konga—all into one beautiful, shareable link."
        },
        {
            question: "Is Zigister 23 free to use?",
            answer: "Yes, creating a registry and adding unlimited physical items is completely free. We charge a small, transparent transaction fee for Cash Gift Funds to cover payment processing through Paystack."
        },
        {
            question: "What stores can I add gifts from?",
            answer: "Any store in the world! We have deep integrations with Jumia, Jiji, and Temu for automatic price and image fetching, but you can paste a link from any website or add items manually."
        },
        {
            question: "How does the Jiji integration work?",
            answer: "Simply paste any Jiji listing URL into Zigister 23. Our system automatically pulls the product name, official Jiji seller price, and images. Your guests can then click 'Buy' to visit the original listing."
        },
        {
            question: "How do I share my registry on WhatsApp?",
            answer: "Your dashboard features a native WhatsApp button. When clicked, it generates a beautiful message template with your registry link and a personalized greeting,ready to be sent to your groups or contacts."
        },
        {
            question: "Can guests pay with Nigerian bank transfer?",
            answer: "Absolutely. For Cash Gift Funds, we support all Paystack payment methods including Nigerian bank transfers, USSD, and card payments. We also allow you to display your direct bank details for manual transfers."
        },
        {
            question: "Is my registry private?",
            answer: "You have full control. You can set your registry to 'Public' (findable by search), 'Semi-Private' (only accessible via link), or 'Private' (requires a password or invite)."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-end">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="section-label">Questions?</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                            WE HAVE <span className="text-primary">ANSWERS.</span>
                        </h2>
                    </div>
                    <div className="lg:col-span-4">
                        <p className="text-muted-foreground font-sans text-sm leading-relaxed uppercase tracking-wider">
                            Everything you need to know about creating and managing your Zigister 23 registry.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                <div className="mt-20 pt-20 border-t border-border flex flex-col items-center gap-10">
                    <div className="text-center space-y-4">
                        <h3 className="text-3xl font-serif font-bold text-foreground uppercase tracking-tight">STILL CURIOUS?</h3>
                        <p className="text-muted-foreground font-sans text-sm uppercase tracking-[0.2em]">Contact our Lagos-based support team anytime.</p>
                    </div>
                    <Link href="/contact" className="bg-primary text-white px-10 py-5 font-sans font-bold text-sm uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 shadow-md">
                        CONTACT SUPPORT →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
