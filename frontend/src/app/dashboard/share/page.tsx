"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ShareRegistry from "@/components/dashboard/ShareRegistry";

export default function SharePage() {
    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="section-label">Spread the Word</div>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">SHARE REGISTRY</h1>
                    </div>
                    <button className="bg-primary text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 shadow-lg">
                        INVITE GUESTS DIRECTLY →
                    </button>
                </div>

                <ShareRegistry />
            </div>
        </DashboardLayout>
    );
}
