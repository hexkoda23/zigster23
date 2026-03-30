"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PurchaseTracker from "@/components/dashboard/PurchaseTracker";
import React, { useEffect, useState } from "react";

export default function PurchasesPage() {
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const registryRaw = localStorage.getItem("zigster_registry");
        if (registryRaw) {
            const registry = JSON.parse(registryRaw);
            const gifts = registry.gifts || [];
            const total = gifts.reduce((acc: number, gift: any) => {
                const price = typeof gift.price === 'string'
                    ? parseFloat(gift.price.replace(/[^\d.]/g, ''))
                    : gift.price || 0;
                return acc + price;
            }, 0);
            setTotalValue(total);
        }
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="section-label">Purchase History</div>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">PURCHASES</h1>
                    </div>
                    <div className="bg-secondary/50 border border-primary/10 px-6 py-4 rounded-sm">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Registry Value</p>
                        <p className="text-2xl font-serif font-bold text-primary">₦{totalValue.toLocaleString()}</p>
                    </div>
                </div>

                <PurchaseTracker />
            </div>
        </DashboardLayout>
    );
}
