"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/Theme-toogle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { MainTopic } from "@/lib/constants";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  topics: MainTopic[];
  activeTopic: string | null;
  onTopicSelect: (topic: MainTopic) => void;
};

const MobileMenu = ({
  open,
  onClose,
  topics,
  activeTopic,
  onTopicSelect,
}: MobileMenuProps) => {
  const portalTarget =
    typeof window !== "undefined" ? document.body : null;

  useEffect(() => {
    if (!portalTarget || !open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, portalTarget]);

  if (!portalTarget || !open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative h-full w-[85%] max-w-sm border-r border-border/70 bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Menú
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-full border border-border p-2 transition hover:border-primary/50"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>
        </div>
        <div className="flex h-[calc(100%-56px)] flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            <SignedIn>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Cuenta
                </span>
                <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Iniciar sesión
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full btn-primary">Registrarse</Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <div className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3">
              <span className="text-sm font-medium text-muted-foreground">
                Tema
              </span>
              <ThemeToggle />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Temas
            </p>
            <ul className="flex flex-col gap-2">
              {topics.map((topic) => (
                <li key={topic.code}>
                  <button
                    type="button"
                    onClick={() => onTopicSelect(topic)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left text-sm font-medium transition",
                      activeTopic === topic.label
                        ? "border-primary/40 bg-primary/5 text-primary"
                        : "border-border/60 text-foreground hover:border-primary/50"
                    )}
                  >
                    {topic.label}
                    {activeTopic === topic.label && (
                      <span className="text-base text-primary">•</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
};

export default MobileMenu;
