"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsOverview from "@/components/dashboard/StatsOverview";
import AddItemModal from "@/components/dashboard/AddItemModal";
import GiftList from "@/components/dashboard/GiftList";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function DashboardPage() {
    const [userData, setUserData] = useState<any>(null);
    const [registryData, setRegistryData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const user = localStorage.getItem("zigster_user");
        const registry = localStorage.getItem("zigster_registry");
        if (user) setUserData(JSON.parse(user));
        if (registry) setRegistryData(JSON.parse(registry));
    }, [refreshKey]);

    const ownerName = registryData?.ownerName || userData?.name || "GUEST";
    const registryTitle = registryData?.title || "YOUR REGISTRY";

    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">{registryTitle}</h1>
                        <p className="text-muted-foreground font-sans text-xs uppercase tracking-[0.3em]">WELCOME BACK, {ownerName}. HERE'S YOUR REGISTRY SUMMARY.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={registryData?.username ? `/registry/${registryData.username}` : `/registry/${registryData?.title?.toLowerCase().replace(/\s+/g, '-') || 'demo'}`}
                            target="_blank"
                            className="border border-primary/20 px-6 py-4 font-sans font-bold text-[10px] uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all duration-500"
                        >
                            VIEW PUBLIC REGISTRY
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-white px-6 py-4 font-sans font-bold text-[10px] uppercase tracking-widest hover:bg-foreground transition-all duration-500 shadow-lg shadow-primary/10"
                        >
                            + ADD NEW GIFT
                        </button>
                    </div>
                </div>

                <StatsOverview key={refreshKey} />

                <div className="space-y-4">
                    <div className="section-label">Your Gifts</div>
                    <GiftList key={`list-${refreshKey}`} />
                </div>

                <AddItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={() => setRefreshKey(prev => prev + 1)}
                />
            </div>
        </DashboardLayout>
    );
}
