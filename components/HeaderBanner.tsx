const HeaderBanner = () => (
  <section className="relative isolate w-full overflow-hidden border-y border-border/70 bg-[#74acdf] text-white shadow-[0_8px_26px_rgba(116,172,223,0.45)] dark:border-white/10 dark:bg-[#1c2d4f] dark:text-white dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
    <div className="relative z-10 px-4 py-1.5 md:px-6">
      <p
        className="text-center text-[0.75rem] font-semibold uppercase tracking-[0.45em] "
        role="status"
        aria-live="polite"
      >
        Noticias de Buenos Aires. Sin mentiras. Sin sesgos.
      </p>
    </div>
  </section>
);

export default HeaderBanner;
