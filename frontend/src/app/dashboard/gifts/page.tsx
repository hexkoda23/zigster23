"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GiftList from "@/components/dashboard/GiftList";
import AddItemModal from "@/components/dashboard/AddItemModal";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function GiftsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="section-label">Manage Items</div>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">GIFT LIST</h1>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 shadow-lg flex items-center gap-3"
                    >
                        <Plus size={18} /> ADD NEW GIFT
                    </button>
                </div>

                <GiftList key={refreshKey} />

                <AddItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={() => setRefreshKey(prev => prev + 1)}
                />
            </div>
        </DashboardLayout>
    );
}
