"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/Theme-toogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAIN_TOPICS, type MainTopic } from "@/lib/constants";
import { getPopularTopicContent } from "@/lib/popular-topic-content";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/navbar/Logo";
import MobileMenu from "@/components/navbar/MobileMenu";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleSearchBlur = () => {
    if (!query) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);

    if (isDesktop) {
      desktopSearchInputRef.current?.blur();
    } else {
      mobileSearchInputRef.current?.blur();
    }
  };

  const handleTopicSelect = (topic: MainTopic) => {
    const slug = topic.slug ?? topic.label;
    router.push(`/tema/${encodeURIComponent(slug)}`);
    setIsMobileMenuOpen(false);
  };

  const activeTopic = (() => {
    if (!pathname || !pathname.startsWith("/tema/")) return null;
    const [, slug] = pathname.split("/tema/");
    if (!slug) return null;
    const decoded = decodeURIComponent(slug);
    const popular =
      getPopularTopicContent(decoded) ??
      getPopularTopicContent(decoded.toLowerCase());
    if (popular) {
      return popular.title;
    }
    const match = MAIN_TOPICS.find((topic) => {
      const lowered = decoded.toLowerCase();
      return (
        topic.code.toLowerCase() === lowered ||
        topic.label.toLowerCase() === lowered
      );
    });
    return match?.label ?? decoded.replaceAll("-", " ");
  })();

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
          <form className="relative" onSubmit={handleSearchSubmit}>
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
          </form>
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
                  onSelect={() => handleTopicSelect(topic)}
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
              <form
                className="w-full"
                onSubmit={handleSearchSubmit}
              >
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
              </form>
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

export default Navbar;
