"use client";

import { use } from "react";
import RegistryPublicView from "@/components/registry/RegistryPublicView";

export default function RegistryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <main className="min-h-screen bg-background">
            <RegistryPublicView id={id} />
        </main>
    );
}
