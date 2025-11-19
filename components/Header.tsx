import HeaderBanner from "./HeaderBanner";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="z-50 border-b border-border/60 bg-background/90 backdrop-blur-md dark:border-white/5 dark:bg-background">
      <div className="section-shell flex flex-col gap-3 py-3">
        <HeaderBanner />
        <Navbar />
      </div>
    </header>
  );
};
export default Header;
