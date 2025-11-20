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
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./Theme-toogle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MAIN_TOPICS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleSearchBlur = () => {
    if (!query) {
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="flex min-w-full flex-wrap items-center gap-6 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card dark:shadow-[0_25px_65px_rgba(0,0,0,0.6)]">
      <div className="flex flex-1 items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/50">
            {activeTopic ?? "Temas"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[220px]">
            {MAIN_TOPICS.map((topic) => (
              <DropdownMenuItem
                key={topic}
                onSelect={() => {
                  setActiveTopic(topic);
                  router.push(`/tema/${encodeURIComponent(topic)}`);
                }}
                className="flex items-center justify-between gap-2"
              >
                {topic}
                {activeTopic === topic && (
                  <span className="text-xs font-semibold text-primary">•</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative flex-1">
          <label htmlFor="global-search" className="sr-only">
            Buscar noticias
          </label>
          <button
            type="button"
            aria-label="Abrir búsqueda"
            aria-expanded={isSearchOpen}
            onClick={toggleSearch}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-200 hover:border-primary/50",
              isSearchOpen && "opacity-0 pointer-events-none"
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
              ref={searchInputRef}
              id="global-search"
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
        <div className="flex items-center justify-center">
          <Link href={"/"}>
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
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2">
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="btn-primary">Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <ThemeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
