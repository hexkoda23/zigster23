"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Wallet, ShoppingCart, Eye, TrendingUp, ArrowUpRight } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, trend, subtext }: { icon: any; label: string; value: string; trend?: string; subtext: string }) => {
    return (
        <div className="glass p-8 border-border group hover:border-primary/30 transition-all duration-500">
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
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{subtext}</span>
                <button className="text-primary hover:text-foreground transition-colors">
                    <ArrowUpRight size={14} />
                </button>
            </div>
        </div>
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
        <section className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-4">
                    <div className="section-label">Registry Performance</div>
                    <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">REGISTRY OVERVIEW</h2>
                </div>
                <div className="flex items-center gap-4 bg-secondary/20 p-1 rounded-sm border border-border">
                    {["7 Days", "30 Days", "ALL TIME"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveRange(t)}
                            className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${activeRange === t ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Gift}
                    label="Total Gifts"
                    value={stats.totalGifts.toString()}
                    trend="+0%"
                    subtext={`Added from ${stats.totalGifts > 0 ? "your list" : "no stores yet"}`}
                />
                <StatCard
                    icon={Wallet}
                    label="Cash Funds"
                    value={stats.cashFunds}
                    trend="+0%"
                    subtext="Start a fund to see contributors"
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Purchased"
                    value={stats.purchased.toString()}
                    trend="+0%"
                    subtext="Track guest purchases here"
                />
                <StatCard
                    icon={Eye}
                    label="Registry Views"
                    value={stats.views}
                    trend="+0%"
                    subtext="Share your link to get views"
                />
            </div>

            {/* Recent Activity Mini-List */}
            <div className="glass p-8 border-border">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xs font-bold font-sans text-primary uppercase tracking-[0.3em]">Recent Activity</h3>
                    <button className="text-[9px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">View All Transaction History →</button>
                </div>
                <div className="space-y-4">
                    {stats.recentActivity.length > 0 ? (
                        stats.recentActivity.map((activity, i) => (
                            <div key={activity.id || i} className="flex items-center justify-between py-4 border-b border-border last:border-0 group hover:px-2 transition-all duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-secondary/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
                                        <Gift size={16} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-foreground uppercase tracking-tight">{activity.title}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{activity.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
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
                            <div className="space-y-1">
                                <p className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">No Activity Yet</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest max-w-xs mx-auto">Share your registry to start seeing guest interactions here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
