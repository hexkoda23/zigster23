"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ThankYouNotes from "@/components/dashboard/ThankYouNotes";
import { Heart } from "lucide-react";

export default function ThankYouPage() {
    return (
        <DashboardLayout>
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <div className="section-label">Guest Gratitude</div>
                        <h1 className="text-4xl font-serif font-bold text-foreground tracking-tight uppercase">THANK YOU NOTES</h1>
                    </div>
                    <button className="bg-primary text-white px-8 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-foreground transition-all duration-500 shadow-lg flex items-center gap-3">
                        <Heart size={18} /> SEND BULK GRATITUDE
                    </button>
                </div>

                <ThankYouNotes />
            </div>
        </DashboardLayout>
    );
}
