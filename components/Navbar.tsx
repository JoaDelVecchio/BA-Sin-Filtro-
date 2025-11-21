"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./Theme-toogle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MAIN_TOPICS, type MainTopic } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const desktopSearchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(event.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      const targetRef = isDesktop
        ? desktopSearchInputRef.current
        : mobileSearchInputRef.current;
      targetRef?.focus();
    }
  }, [isSearchOpen, isDesktop]);

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/tema/")) {
      const [, slug] = pathname.split("/tema/");
      const decodedTopic = slug ? decodeURIComponent(slug) : null;
      setActiveTopic(decodedTopic);
    } else {
      setActiveTopic(null);
    }
  }, [pathname]);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleSearchBlur = () => {
    if (!query) {
      setIsSearchOpen(false);
    }
  };

  const handleTopicSelect = (topic: string) => {
    setActiveTopic(topic);
    router.push(`/tema/${encodeURIComponent(topic)}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative w-full py-2">
      <div className="flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Abrir menú"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition hover:border-primary/50"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
        <Logo />
        <button
          type="button"
          aria-label="Abrir búsqueda"
          aria-expanded={isSearchOpen}
          onClick={toggleSearch}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition hover:border-primary/50"
        >
          <Search className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {isSearchOpen && (
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={mobileSearchInputRef}
              type="search"
              placeholder="Buscar noticias, tópicos o autores"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={handleSearchBlur}
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>
      )}

      <div className="hidden w-full flex-wrap items-center gap-4 md:flex">
        <div className="flex flex-1 items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/50">
              {activeTopic ?? "Temas"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[220px]">
              {MAIN_TOPICS.map((topic) => (
                <DropdownMenuItem
                  key={topic.code}
                  onSelect={() => handleTopicSelect(topic.label)}
                  className="flex items-center justify-between gap-2"
                >
                  {topic.label}
                  {activeTopic === topic.label && (
                    <span className="text-xs font-semibold text-primary">•</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative flex-1">
            <label htmlFor="desktop-global-search" className="sr-only">
              Buscar noticias
            </label>
            <button
              type="button"
              aria-label="Abrir búsqueda"
              aria-expanded={isSearchOpen}
              onClick={toggleSearch}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-200 hover:border-primary/50",
                isSearchOpen && "pointer-events-none opacity-0"
              )}
            >
              <Search className="h-4 w-4 text-foreground" />
            </button>
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 flex items-center transition-all duration-300 ease-out",
                isSearchOpen
                  ? "pointer-events-auto w-full translate-x-0 opacity-100"
                  : "w-0 -translate-x-6 opacity-0"
              )}
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={desktopSearchInputRef}
                id="desktop-global-search"
                type="search"
                placeholder="Buscar noticias, tópicos o autores"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={handleSearchBlur}
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton>
                <Button variant="ghost">Iniciar sesión</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="btn-primary">Registrarse</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <ThemeToggle />
        </div>
      </div>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        topics={MAIN_TOPICS}
        activeTopic={activeTopic}
        onTopicSelect={handleTopicSelect}
      />
    </nav>
  );
};

const Logo = () => (
  <Link href="/" className="flex items-center justify-center">
    <Image
      src="/BALogo.png"
      alt="BA Sin Filtro"
      width={80}
      height={80}
      className="dark:hidden"
      priority
    />
    <Image
      src="/BALogo-White.png"
      alt="BA Sin Filtro"
      width={80}
      height={80}
      className="hidden dark:block"
      priority
    />
  </Link>
);

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  topics: MainTopic[];
  activeTopic: string | null;
  onTopicSelect: (topic: string) => void;
};

const MobileMenu = ({
  open,
  onClose,
  topics,
  activeTopic,
  onTopicSelect,
}: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || !open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open, mounted]);

  if (!mounted || !open) {
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
                    onClick={() => onTopicSelect(topic.label)}
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
    document.body
  );
};

export default Navbar;
