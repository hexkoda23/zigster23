"use client";

import React, { useEffect, useState } from "react";
import { Search, Download, MessageCircle, CheckCircle2, Clock, Package, ShoppingCart, Eye, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function ReceiptModal({ purchase, onClose, onConfirm }: { purchase: any; onClose: () => void; onConfirm: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border w-full max-w-lg p-8 space-y-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Payment Receipt</p>
                        <h3 className="text-xl font-serif font-bold text-foreground uppercase mt-1">{purchase.giftName}</h3>
                    </div>
                    <button onClick={onClose}><X size={20} className="text-muted-foreground hover:text-foreground" /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">Guest</p>
                        <p className="font-bold text-foreground uppercase">{purchase.guestName || "Anonymous"}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">WhatsApp</p>
                        <p className="font-bold text-foreground">{purchase.guestWhatsapp || "—"}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">Amount</p>
                        <p className="font-bold text-primary text-lg font-serif">{purchase.amount}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">Reference</p>
                        <p className="font-bold text-foreground">{purchase.paymentRef}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">Address</p>
                        <p className="font-bold text-foreground">{purchase.deliveryAddress || "—"}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground uppercase tracking-widest mb-1">Date</p>
                        <p className="font-bold text-foreground">{purchase.date}</p>
                    </div>
                </div>
                {purchase.receiptName && (
                    <div className="bg-secondary/30 border border-border p-4 flex items-center gap-3">
                        <Package size={20} className="text-primary" />
                        <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Receipt File</p>
                            <p className="text-xs font-bold text-foreground">{purchase.receiptName}</p>
                        </div>
                    </div>
                )}
                <div className="flex gap-4 pt-2">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-emerald-500 text-white py-4 font-sans font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all"
                    >
                        ✓ CONFIRM PAYMENT RECEIVED
                    </button>
                    <button onClick={onClose} className="flex-1 border border-border py-4 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-secondary/50 transition-all">
                        CLOSE
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function PurchaseTracker() {
    const [purchases, setPurchases] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [viewPurchase, setViewPurchase] = useState<any | null>(null);

    const load = () => {
        const raw = localStorage.getItem("zigster_purchases");
        if (raw) setPurchases(JSON.parse(raw));
    };

    useEffect(() => {
        load();
        window.addEventListener("storage", load);
        window.addEventListener("registryUpdate", load);
        return () => {
            window.removeEventListener("storage", load);
            window.removeEventListener("registryUpdate", load);
        };
    }, []);

    const confirmPurchase = (id: string) => {
        const updated = purchases.map(p => p.id === id ? { ...p, status: "Confirmed" } : p);
        setPurchases(updated);
        localStorage.setItem("zigster_purchases", JSON.stringify(updated));
        setViewPurchase(null);
    };

    const sendWhatsApp = (p: any) => {
        const num = (p.guestWhatsapp || "").replace(/\D/g, "");
        if (!num) { alert("No WhatsApp number recorded for this guest."); return; }
        const msg = encodeURIComponent(`Hi ${p.guestName || "there"}! 🎉 Thank you so much for your gift${p.giftName ? ` of "${p.giftName}"` : ""}! Your kindness means the world to me. 🙏❤️\n\nRef: ${p.paymentRef}`);
        window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    };

    const downloadCSV = () => {
        const header = "Guest,WhatsApp,Gift,Amount,Reference,Type,Date,Status\n";
        const rows = purchases.map(p =>
            `"${p.guestName}","${p.guestWhatsapp}","${p.giftName}","${p.amount}","${p.paymentRef}","${p.type}","${p.date}","${p.status}"`
        ).join("\n");
        const blob = new Blob([header + rows], { type: "text/csv" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "purchases.csv"; a.click();
    };

    const filtered = purchases.filter(p =>
        !search || p.guestName?.toLowerCase().includes(search.toLowerCase()) || p.giftName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 w-full max-w-md bg-white border border-border flex items-center px-6 py-3 rounded-sm group hover:border-primary/30 transition-all">
                    <Search size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <input type="text" placeholder="SEARCH GUESTS OR ITEMS..." value={search} onChange={e => setSearch(e.target.value)}
                        className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-widest text-foreground ml-4 w-full" />
                </div>
                <button onClick={downloadCSV} className="flex items-center gap-3 bg-secondary/50 border border-border px-6 py-3 text-[10px] font-bold text-foreground uppercase tracking-widest hover:bg-white transition-all rounded-sm">
                    <Download size={16} /> DOWNLOAD CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Purchases", value: purchases.length, color: "text-foreground" },
                    { label: "Confirmed", value: purchases.filter(p => p.status === "Confirmed").length, color: "text-emerald-500" },
                    { label: "Pending Review", value: purchases.filter(p => p.status !== "Confirmed").length, color: "text-amber-500" },
                ].map(s => (
                    <div key={s.label} className="glass p-6 border-border text-center">
                        <p className={`text-3xl font-serif font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="glass overflow-hidden border-border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border bg-secondary/20">
                                {["GUEST", "GIFT / ITEM", "AMOUNT", "TYPE", "DATE", "STATUS", "ACTIONS"].map(h => (
                                    <th key={h} className="px-6 py-5 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.length > 0 ? filtered.map((p, i) => (
                                <tr key={p.id || i} className="group hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-bold text-foreground uppercase tracking-tight">{p.guestName || "Anonymous"}</p>
                                        <p className="text-[9px] text-muted-foreground mt-0.5">{p.guestWhatsapp || "No WhatsApp"}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-bold text-foreground uppercase tracking-tight max-w-[160px] truncate">{p.giftName}</p>
                                        <p className="text-[9px] text-muted-foreground mt-0.5">{p.paymentRef}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-serif font-bold text-primary">{p.amount}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[9px] font-bold text-foreground/60 uppercase tracking-widest border border-border px-2 py-1">{p.type || "Gift"}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{p.date}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        {p.status === "Confirmed" ? (
                                            <span className="text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-1"><CheckCircle2 size={10} /> Confirmed</span>
                                        ) : (
                                            <span className="text-[9px] font-bold text-amber-500 uppercase flex items-center gap-1"><Clock size={10} /> Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setViewPurchase(p)} className="text-muted-foreground hover:text-primary transition-colors" title="View receipt">
                                                <Eye size={15} />
                                            </button>
                                            <button onClick={() => sendWhatsApp(p)} className="text-muted-foreground hover:text-[#25D366] transition-colors" title="Send WhatsApp thanks">
                                                <MessageCircle size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-8 py-24 text-center">
                                        <div className="space-y-3 max-w-xs mx-auto">
                                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-primary/20 mx-auto">
                                                <ShoppingCart size={32} />
                                            </div>
                                            <p className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">No purchases yet</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">When guests buy gifts or contribute via your registry link, they appear here.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {viewPurchase && (
                    <ReceiptModal purchase={viewPurchase} onClose={() => setViewPurchase(null)} onConfirm={() => confirmPurchase(viewPurchase.id)} />
                )}
            </AnimatePresence>
        </section>
    );
}
