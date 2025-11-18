import HeaderBanner from "./HeaderBanner";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="section-shell flex flex-col gap-4 py-4">
        <HeaderBanner />
        <Navbar />
      </div>
    </header>
  );
};
export default Header;
