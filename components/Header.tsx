"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HeaderBanner from "./HeaderBanner";
import { cn } from "@/lib/utils";

const Header = () => (
  <>
    <header className="border-b border-border/50 bg-background/95">
      <div className="section-shell flex flex-col gap-2 py-2">
        <div className="hidden md:block">
          <HeaderBanner />
        </div>
        <Navbar />
      </div>
    </header>
    <FloatingNavbar />
  </>
);

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight || 0;
        const threshold = viewportHeight * 0.7;
        setIsVisible(window.scrollY > threshold);
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-6 lg:px-8",
        !isVisible && "pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl transform transition-all duration-300 ease-out",
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        )}
      >
        <div className="rounded-2xl border border-border/70 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="px-4 py-2 sm:px-6">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
