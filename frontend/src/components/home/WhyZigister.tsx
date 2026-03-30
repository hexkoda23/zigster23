"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Globe,
    CreditCard,
    Link as LinkIcon,
    Bell,
    DollarSign,
    MousePointer,
    Lock,
    MessageSquare,
    Smartphone,
    Repeat,
    Truck,
    Presentation
} from "lucide-react";

const Feature = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="p-8 border border-border hover:border-primary/30 transition-all duration-500 group"
        >
            <div className="w-10 h-10 mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed transition-colors group-hover:text-foreground/80">
                {description}
            </p>
        </motion.div>
    );
};

const WhyZigister = () => {
    const features = [
        {
            icon: Globe,
            title: "UNIVERSAL",
            description: "Add gifts from any website in the world, from local markets to international malls."
        },
        {
            icon: CreditCard,
            title: "NIGERIA-FIRST",
            description: "All prices are displayed in Naira (₦) with native payment gateway support."
        },
        {
            icon: LinkIcon,
            title: "ONE LINK",
            description: "Share one simple URL with all your guests, no matter where you've added items from."
        },
        {
            icon: Bell,
            title: "REAL-TIME TRACKING",
            description: "Know exactly when a gift has been purchased with instant notifications."
        },
        {
            icon: DollarSign,
            title: "CASH GIFT FUNDS",
            description: "Let guests contribute money toward larger items like honeymoons or home deposits."
        },
        {
            icon: MousePointer,
            title: "BROWSER EXTENSION",
            description: "Add items with a single click while browsing your favorite Nigerian or global stores."
        },
        {
            icon: Lock,
            title: "PRIVACY CONTROLS",
            description: "Choose who can see your registry. Protect your gifting experience with ease."
        },
        {
            icon: MessageSquare,
            title: "WHATSAPP SHARING",
            description: "Native WhatsApp sharing built-in with beautiful custom message templates."
        },
        {
            icon: Repeat,
            title: "JIJI & TEMU SYNC",
            description: "Direct product synchronization with Nigeria's most popular shopping platforms."
        },
        {
            icon: Truck,
            title: "ORDER TRACKING",
            description: "Track Jumia, Jiji, and Temu orders linked directly to your registry dashboard."
        },
        {
            icon: Presentation,
            title: "INSPIRATION BOARDS",
            description: "Curated gift ideas by category and occasion to jumpstart your registry."
        },
        {
            icon: Smartphone,
            title: "THANK-YOU MANAGER",
            description: "Keep track of who gifted what and send digital thank-you notes instantly."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
                    <div className="space-y-6">
                        <div className="section-label">Why Z23</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                            THE REGISTRY <span className="text-primary">UPGRADE.</span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-muted-foreground font-sans text-sm leading-relaxed uppercase tracking-wider max-w-md">
                            A comprehensive set of features tailored specifically for the Nigerian gifting culture.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
                    {features.map((feature, index) => (
                        <Feature key={feature.title} {...feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyZigister;
