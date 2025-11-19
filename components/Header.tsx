"use client";

import { useEffect, useState } from "react";
import HeaderBanner from "./HeaderBanner";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const trigger = window.innerHeight * 0.7;
      setIsPinned(window.scrollY > trigger);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="z-40 border-b border-border/60 bg-card shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:border-white/8 dark:bg-card dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
        <div className="section-shell flex flex-col gap-3 py-3">
          <HeaderBanner />
          <Navbar />
        </div>
      </header>
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-700 ease-out",
          isPinned ? "opacity-100 translate-y-0" : "-translate-y-8 opacity-0"
        )}
      >
        <div className="pointer-events-auto w-full max-w-6xl rounded-[26px] border border-border/70 bg-card shadow-[0_20px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-card dark:shadow-[0_28px_75px_rgba(0,0,0,0.65)]">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Header;
