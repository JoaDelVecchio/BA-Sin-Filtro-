import Image from "next/image";
import Link from "next/link";

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

export default Logo;
