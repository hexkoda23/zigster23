"use client";

import React, { useEffect, useState } from "react";
import {
    Plus,
    Wallet,
    ArrowUpRight,
    ShieldCheck,
    Info,
    Banknote,
    Palmtree,
    Home,
    GraduationCap
} from "lucide-react";

const IconMap: Record<string, any> = {
    Wallet,
    Palmtree,
    Home,
    GraduationCap,
    Banknote
};

const FundProgressCard = ({ icon: Icon, title, raised, target, contributors }: { icon: any; title: string, raised: string, target: string, contributors: number }) => {
    const percentage = 65; // Mock percentage

    return (
        <div className="glass p-8 border-border space-y-8 group hover:border-primary/30 transition-all duration-500">
            <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-secondary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-sm">
                    <Icon size={24} />
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowUpRight size={18} />
                </button>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-foreground uppercase tracking-tight">{title}</h3>
                <p className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-widest">{contributors} CONTRIBUTORS</p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">RAISED</p>
                        <p className="text-2xl font-serif font-bold text-foreground">{raised}</p>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">TARGET</p>
                        <p className="text-sm font-serif font-bold text-foreground/40">{target}</p>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-secondary relative overflow-hidden rounded-full">
                    <div className="absolute left-0 top-0 bottom-0 bg-primary" style={{ width: `${percentage}%` }} />
                </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-4">
                <button className="flex-1 bg-secondary/50 border border-border py-3 text-[9px] font-bold text-foreground uppercase tracking-widest hover:bg-white transition-all duration-500">
                    VIEW DETAILS
                </button>
                <button className="flex-1 bg-primary/10 border border-primary/20 py-3 text-[9px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500">
                    WITHDRAW
                </button>
            </div>
        </div>
    );
};

export default function CashFundTab() {
    const [funds, setFunds] = useState<any[]>([]);
    const [totalRaised, setTotalRaised] = useState(0);
    const [bankDetails, setBankDetails] = useState<any>(null);
    const [showNewFund, setShowNewFund] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTarget, setNewTarget] = useState("");
    const [newIcon, setNewIcon] = useState("Wallet");

    useEffect(() => {
        const fetchFunds = () => {
            const fundsRaw = localStorage.getItem("zigster_funds");
            const funds = fundsRaw ? JSON.parse(fundsRaw) : [];
            setFunds(funds);
            const total = funds.reduce((acc: number, f: any) => {
                const raisedAmount = parseFloat(String(f.raised).replace(/[^0-9.]/g, '')) || 0;
                return acc + raisedAmount;
            }, 0);
            setTotalRaised(total);
        };
        const fetchRegistry = () => {
            const regRaw = localStorage.getItem("zigster_registry");
            if (regRaw) {
                const reg = JSON.parse(regRaw);
                if (reg.bankDetails) setBankDetails(reg.bankDetails);
            }
        };
        fetchFunds();
        fetchRegistry();
        window.addEventListener('storage', fetchFunds);
        window.addEventListener('registryUpdate', fetchFunds);
        return () => {
            window.removeEventListener('storage', fetchFunds);
            window.removeEventListener('registryUpdate', fetchFunds);
        };
    }, []);

    const addFund = () => {
        if (!newTitle) return;
        const fund = { id: Date.now().toString(), title: newTitle, target: newTarget ? `₦${parseInt(newTarget).toLocaleString()}` : "", raised: "₦0", contributors: 0, icon: newIcon };
        const updated = [...funds, fund];
        setFunds(updated);
        localStorage.setItem("zigster_funds", JSON.stringify(updated));
        setShowNewFund(false); setNewTitle(""); setNewTarget(""); setNewIcon("Wallet");
        window.dispatchEvent(new Event("registryUpdate"));
    };

    return (
        <section className="space-y-12">
            {/* Summary + Bank Account Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass p-10 border-primary/10 bg-primary/[0.02] flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 border border-primary/20 shadow-sm">
                        <Wallet size={32} />
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-serif font-bold text-foreground uppercase tracking-tight">TOTAL CASH RAISED</h3>
                            <p className="text-4xl font-serif font-bold text-primary">₦{totalRaised.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5">
                                <ShieldCheck size={12} /> SECURED PAYMENTS
                            </div>
                        </div>
                    </div>
                    <button className="bg-primary text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-foreground transition-all duration-500 whitespace-nowrap shadow-md">
                        WITHDRAW ALL →
                    </button>
                </div>

                {/* Account Details Card */}
                <div className="glass p-8 border-border space-y-4">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-[0.4em]">Payment Account</p>
                    {bankDetails ? (
                        <div className="space-y-3">
                            <div>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Bank</p>
                                <p className="text-xs font-bold text-foreground">{bankDetails.bankName}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Account No.</p>
                                <p className="text-2xl font-serif font-bold text-primary">{bankDetails.accountNumber}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Account Name</p>
                                <p className="text-xs font-bold text-foreground">{bankDetails.accountName}</p>
                            </div>
                            <p className="text-[9px] text-muted-foreground leading-relaxed">Guests transfer to this account when contributing to your funds.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">No bank account set. Add your account details in Settings → Payment Settings.</p>
                            <a href="#" className="text-[9px] font-bold text-primary uppercase tracking-widest hover:underline">GO TO SETTINGS →</a>
                        </div>
                    )}
                </div>
            </div>

            {/* Create New Fund */}
            {showNewFund && (
                <div className="glass p-8 border-border space-y-6">
                    <h4 className="text-sm font-serif font-bold text-foreground uppercase">Create New Fund</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Fund Title *</label>
                            <input type="text" placeholder="E.G. HONEYMOON IN BALI" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-secondary/30 border border-border px-5 py-4 text-xs font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Target Amount (₦)</label>
                            <input type="number" placeholder="500000" value={newTarget} onChange={e => setNewTarget(e.target.value)} className="w-full bg-secondary/30 border border-border px-5 py-4 text-xs font-bold uppercase tracking-widest text-foreground outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-primary uppercase tracking-widest">Icon</label>
                            <select value={newIcon} onChange={e => setNewIcon(e.target.value)} className="w-full bg-secondary/30 border border-border px-5 py-4 text-xs font-bold uppercase tracking-widest text-foreground outline-none appearance-none">
                                {["Wallet", "Palmtree", "Home", "GraduationCap", "Banknote"].map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={addFund} className="bg-primary text-white px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-foreground transition-all">CREATE FUND</button>
                        <button onClick={() => setShowNewFund(false)} className="border border-border px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest text-foreground hover:bg-secondary/50 transition-all">CANCEL</button>
                    </div>
                </div>
            )}

            {/* active funds grid */}
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-[0.3em]">ACTIVE FUNDS</h3>
                    <div className="h-[1px] flex-1 bg-border mx-6" />
                    <button onClick={() => setShowNewFund(true)} className="text-[9px] font-bold text-primary uppercase tracking-widest hover:text-foreground transition-colors flex items-center gap-2">
                        <Plus size={14} /> ADD FUND
                    </button>
                </div>

                {funds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {funds.map((fund, i) => (
                            <FundProgressCard
                                key={i}
                                icon={typeof fund.icon === 'string' ? IconMap[fund.icon] || Wallet : fund.icon || Wallet}
                                title={fund.title}
                                raised={fund.raised}
                                target={fund.target}
                                contributors={fund.contributors}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 glass border-border text-center">
                        <div className="space-y-4 max-w-xs mx-auto">
                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-primary/20 mx-auto">
                                <Banknote size={32} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">No funds active</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                    Creating a cash fund allows guests to contribute money toward your larger goals.
                                </p>
                            </div>
                            <button onClick={() => setShowNewFund(true)} className="bg-primary text-white px-8 py-3 font-sans font-bold text-[10px] uppercase tracking-widest hover:bg-foreground transition-all shadow-lg shadow-primary/10">
                                START YOUR FIRST FUND
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
