"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Wallet, ShoppingCart, Eye, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const StatCard = ({ icon: Icon, label, value, trend, subtext, href }: { icon: any; label: string; value: string; trend?: string; subtext: string; href: string; }) => {
    return (
        <Link href={href} className="glass p-8 border-border group hover:border-primary/30 transition-all duration-500 block cursor-pointer">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-secondary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-sm shadow-inner">
                    <Icon size={20} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 uppercase tracking-widest">
                        <TrendingUp size={10} /> {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">{label}</p>
                <h3 className="text-3xl font-serif font-bold text-foreground tracking-tight">{value}</h3>
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">{subtext}</span>
                <span className="text-primary group-hover:text-foreground transition-colors">
                    <ArrowUpRight size={14} />
                </span>
            </div>
        </Link>
    );
};

export default function StatsOverview() {
    const [stats, setStats] = useState({
        totalGifts: 0,
        cashFunds: "0",
        purchased: 0,
        views: "0",
        recentActivity: [] as any[]
    });
    const [activeRange, setActiveRange] = useState("30 Days");

    useEffect(() => {
        const fetchStats = () => {
            const giftsRaw = localStorage.getItem("zigster_gifts");
            const activityRaw = localStorage.getItem("zigster_activity");
            const fundsRaw = localStorage.getItem("zigster_funds");

            const gifts = giftsRaw ? JSON.parse(giftsRaw) : [];
            const activity = activityRaw ? JSON.parse(activityRaw) : [];
            const funds = fundsRaw ? JSON.parse(fundsRaw) : [];

            // Calculate active cash funds sum instead of just "earned", as it's more representative of funds created right now
            const totalFunds = funds.reduce((acc: number, f: any) => {
                const targetAmount = parseFloat(f.target?.replace(/[^0-9.]/g, '')) || 0;
                return acc + targetAmount;
            }, 0);

            setStats({
                totalGifts: gifts.length,
                cashFunds: `₦${totalFunds.toLocaleString()}`,
                purchased: gifts.filter((g: any) => g.status?.toLowerCase() === "purchased").length,
                views: "0",
                recentActivity: activity.slice(0, 3)
            });
        };

        fetchStats();
        // Add listener for local storage changes
        window.addEventListener('storage', fetchStats);
        // Custom event for same-window updates
        window.addEventListener('registryUpdate', fetchStats);

        return () => {
            window.removeEventListener('storage', fetchStats);
            window.removeEventListener('registryUpdate', fetchStats);
        };
    }, []);

    return (
        <section className="space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2 md:space-y-4">
                    <div className="section-label">Registry Performance</div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight uppercase leading-tight">REGISTRY OVERVIEW</h2>
                </div>
                <div className="flex items-center gap-2 md:gap-4 bg-secondary/20 p-1 rounded-sm border border-border w-full md:w-auto">
                    {["7 Days", "30 Days", "ALL TIME"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveRange(t)}
                            className={`flex-1 md:flex-none px-3 md:px-4 py-2 text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-all ${activeRange === t ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    icon={Gift}
                    label="Total Gifts"
                    value={stats.totalGifts.toString()}
                    trend="+0%"
                    subtext={`ADDED FROM ${stats.totalGifts > 0 ? "YOUR LIST" : "NO STORES YET"}`}
                    href="/dashboard/gifts"
                />
                <StatCard
                    icon={Wallet}
                    label="Cash Funds"
                    value={stats.cashFunds}
                    trend="+0%"
                    subtext="START A FUND TO SEE CONTRIBUTORS"
                    href="/dashboard/cash-funds"
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Purchased"
                    value={stats.purchased.toString()}
                    trend="+0%"
                    subtext="TRACK GUEST PURCHASES HERE"
                    href="/dashboard/purchases"
                />
                <StatCard
                    icon={Eye}
                    label="Registry Views"
                    value={stats.views}
                    trend="+0%"
                    subtext="SHARE YOUR LINK TO GET VIEWS"
                    href="/dashboard/share"
                />
            </div>

            {/* Recent Activity Mini-List */}
            <div className="glass p-6 md:p-8 border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h3 className="text-xs font-bold font-sans text-primary uppercase tracking-[0.3em]">Recent Activity</h3>
                    <Link href="/dashboard/purchases" className="text-[9px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-left">View All Transaction History →</Link>
                </div>
                <div className="space-y-4">
                    {stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map((activity, i) => (
                            <div key={activity.id || i} className="flex items-center justify-between py-4 border-b border-border last:border-0 group hover:px-2 transition-all duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 bg-secondary/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all rounded-sm shrink-0">
                                        <Gift size={16} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-foreground uppercase tracking-tight">{activity.title}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest truncate max-w-[150px] md:max-w-none">{activity.description}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(activity.date).toLocaleDateString()}</p>
                                    <p className="text-[8px] text-primary font-bold uppercase tracking-widest mt-1">SUCCESS</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-primary/20 mx-auto">
                                <TrendingUp size={32} />
                            </div>
                            <div className="space-y-1 mb-4">
                                <p className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">No Activity Yet</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest max-w-xs mx-auto mb-2">Share your registry to start seeing guest interactions here.</p>
                            </div>
                            <Link href="/dashboard/share" className="inline-block border border-border px-6 py-2 text-[10px] font-bold text-foreground uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all">
                                SHARE REGISTRY
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
