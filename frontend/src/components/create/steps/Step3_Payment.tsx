"use client";

import React from "react";
import { CreditCard, MapPin, Landmark, ShieldCheck } from "lucide-react";

export default function Step3_Payment({
    data,
    updateData
}: {
    data: any,
    updateData: (fields: any) => void
}) {
    // Ensure bankDetails object exists
    const bankDetails = data.bankDetails || { bankName: "", accountNumber: "", accountName: "" };

    const handleBankUpdate = (fields: any) => {
        updateData({ bankDetails: { ...bankDetails, ...fields } });
    };

    const nigerianBanks = [
        "Access Bank", "Zenith Bank", "First Bank", "GTBank", "UBA",
        "Kuda Bank", "OPay", "Palmpay", "Moniepoint", "Stanbic IBTC",
        "Fidelity Bank", "Wema Bank", "Sterling Bank", "Other"
    ];

    return (
        <div className="space-y-12 max-w-2xl mx-auto">
            <div className="space-y-4 text-center">
                <h2 className="text-4xl font-serif font-bold text-foreground tracking-tight">PAYMENT & DELIVERY</h2>
                <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em]">SECURE YOUR CONTRIBUTIONS AND GIFT DELIVERIES.</p>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Bank Details Card */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                        <Landmark size={20} className="text-primary" />
                        <h3 className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">ACCOUNT DETAILS</h3>
                    </div>
                    <div className="space-y-6 bg-secondary/30 p-8 border border-border">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Select Bank</label>
                            <select
                                value={bankDetails.bankName}
                                onChange={(e) => handleBankUpdate({ bankName: e.target.value })}
                                className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase appearance-none"
                            >
                                <option value="">CHOOSE YOUR BANK</option>
                                {nigerianBanks.map(bank => <option key={bank} value={bank}>{bank.toUpperCase()}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Account Number</label>
                                <input
                                    type="text"
                                    value={bankDetails.accountNumber}
                                    onChange={(e) => handleBankUpdate({ accountNumber: e.target.value })}
                                    placeholder="0123456789"
                                    maxLength={10}
                                    className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Account Name</label>
                                <input
                                    type="text"
                                    value={bankDetails.accountName}
                                    onChange={(e) => handleBankUpdate({ accountName: e.target.value })}
                                    placeholder="E.G. ADELEKE KEHINDE"
                                    className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase"
                                />
                            </div>
                        </div>
                        <div className="bg-primary/5 p-4 flex items-start gap-3">
                            <ShieldCheck size={16} className="text-primary mt-1" />
                            <p className="text-[9px] text-primary leading-relaxed uppercase font-bold tracking-widest">Guests will use these details to send cash contributions or pay for gifts.</p>
                        </div>
                    </div>
                </div>

                {/* Delivery Address Card */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                        <MapPin size={20} className="text-primary" />
                        <h3 className="text-sm font-serif font-bold text-foreground uppercase tracking-tight">DELIVERY ADDRESS</h3>
                    </div>
                    <div className="space-y-4 bg-secondary/30 p-8 border border-border">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold font-sans text-primary uppercase tracking-[0.3em]">Shipping Destination</label>
                            <textarea
                                rows={4}
                                value={data.address}
                                onChange={(e) => updateData({ address: e.target.value })}
                                placeholder="ENTER YOUR FULL ADDRESS (I.E. 123 LEKKI PHASE 1, LAGOS)"
                                className="w-full bg-white border border-border px-6 py-4 font-sans text-xs tracking-widest focus:ring-1 focus:ring-primary outline-none text-foreground uppercase resize-none"
                            />
                        </div>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                            This address will be shown to guests so they can ship physical gifts directly to you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
