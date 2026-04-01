"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Gift,
    PlusCircle,
    ShoppingCart,
    Wallet,
    Heart,
    Share2,
    Settings,
    LogOut,
    ChevronRight,
    X
} from "lucide-react";

const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { id: "gifts", label: "Gift List", icon: Gift, href: "/dashboard/gifts" },
    { id: "purchases", label: "Purchases", icon: ShoppingCart, href: "/dashboard/purchases" },
    { id: "cash-funds", label: "Cash Funds", icon: Wallet, href: "/dashboard/cash-funds" },
    { id: "thank-you", label: "Thank You Notes", icon: Heart, href: "/dashboard/thank-you" },
    { id: "share", label: "Share Registry", icon: Share2, href: "/dashboard/share" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const [registryInfo, setRegistryInfo] = useState({ title: "YOUR REGISTRY", occasion: "Your Event • Date TBA" });

    useEffect(() => {
        const registry = localStorage.getItem("zigster_registry");
        if (registry) {
            const data = JSON.parse(registry);
            setRegistryInfo({
                title: data.title || "YOUR REGISTRY",
                occasion: `${data.occasion || "EVENT"} • ${data.date || "DATE TBA"}`
            });
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("zigster_session");
        localStorage.removeItem("zigster_user");
        router.push("/login");
    };


    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-border flex flex-col pt-12 pb-8 overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
            ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:flex"}
        `}>
            {/* Mobile Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors lg:hidden"
            >
                <X size={24} />
            </button>

            {/* Registry Selector / Info */}
            <div className="px-8 mb-12">
                <div className="section-label mb-4">Registry</div>
                <div className="flex items-center justify-between group cursor-pointer p-4 bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-500 rounded-sm">
                    <div className="space-y-1">
                        <h3 className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">{registryInfo.title}</h3>
                        <p className="text-[10px] font-sans font-bold text-primary uppercase tracking-widest">{registryInfo.occasion}</p>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-500 group ${isActive
                                ? "bg-secondary text-primary font-bold shadow-lg shadow-primary/5"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                        >
                            <item.icon size={18} className={isActive ? "text-primary" : "text-primary group-hover:text-primary/70 transition-colors"} />
                            <span className="text-xs font-sans uppercase tracking-[0.2em] font-bold">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Nav */}
            <div className="px-4 mt-8 pt-8 border-t border-border space-y-2">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-4 w-full px-6 py-4 rounded-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all duration-500 font-sans font-bold text-xs uppercase tracking-[0.2em]"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
