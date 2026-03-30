"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsTab from "@/components/dashboard/SettingsTab";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="section-label">Account & Registry</div>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">SETTINGS</h1>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest max-w-xs text-right hidden lg:block">
                        MANAGE YOUR ACCOUNT PREFERENCES, PRIVACY, AND REGISTRY DETAILS IN ONE PLACE.
                    </p>
                </div>

                <SettingsTab />
            </div>
        </DashboardLayout>
    );
}
