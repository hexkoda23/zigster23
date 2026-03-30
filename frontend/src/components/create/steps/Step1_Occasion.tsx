"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Baby, Gift, GraduationCap, Home, Users, Sparkles } from "lucide-react";

const occasions = [
    { id: "wedding", title: "Wedding Registry", icon: Heart, desc: "Combine all your stores into one link." },
    { id: "baby", title: "Baby Registry", icon: Baby, desc: "Everything for your new bundle of joy." },
    { id: "birthday", title: "Birthday Gift List", icon: Gift, desc: "For your special day, any store." },
    { id: "graduation", title: "Graduation List", icon: GraduationCap, desc: "Celebrate your big achievement." },
    { id: "housewarming", title: "Housewarming", icon: Home, desc: "Style your new space your way." },
    { id: "nonprofit", title: "Nonprofit / Org", icon: Users, desc: "Collect needed items for your cause." },
    { id: "custom", title: "Custom List", icon: Sparkles, desc: "For any other special celebration." }
];

export default function Step1_Occasion({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) {
    return (
        <div className="space-y-10">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight">CHOOSE YOUR OCCASION</h2>
                <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em]">SELECT THE TYPE OF REGISTRY YOU WANT TO CREATE.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {occasions.map((occ) => (
                    <button
                        key={occ.id}
                        onClick={() => onSelect(occ.id)}
                        className={`p-8 text-left transition-all duration-500 border group ${selected === occ.id
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white border-border text-foreground hover:border-primary/50"
                            }`}
                    >
                        <div className={`mb-6 transition-colors duration-500 ${selected === occ.id ? "text-white" : "text-primary group-hover:text-primary/70"}`}>
                            <occ.icon size={28} />
                        </div>
                        <h3 className="font-serif font-bold text-xl mb-2 uppercase tracking-tight">{occ.title}</h3>
                        <p className={`text-xs font-sans transition-colors duration-500 ${selected === occ.id ? "text-white/70" : "text-muted-foreground"}`}>
                            {occ.desc}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}
