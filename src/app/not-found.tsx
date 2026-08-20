import type { Metadata } from "next";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export const metadata: Metadata = {
  title: "Page introuvable — Blyss",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div
      className="proto-flowty relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={
        {
          background: "var(--blyss-dusk-gradient)",
          "--text": "var(--bg)",
          "--text-muted": "rgba(251,245,239,0.68)",
        } as React.CSSProperties
      }
    >
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyTitle className="text-card-silver-matte mask-b-from-20% mask-b-to-80% text-9xl font-extrabold">404</EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap">
            La page que tu cherches a peut-être été déplacée <br />
            ou n&apos;existe plus.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)] hover:opacity-90">
            <Link href="/">
              <HomeIcon className="mr-2 size-4" data-icon="inline-start" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
