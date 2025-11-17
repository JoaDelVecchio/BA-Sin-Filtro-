import { ThemeToggle } from "@/components/Theme-toogle";

export default async function Home() {
  return (
    <div className="min-h-screen min-w-screen ">
      Hello World <ThemeToggle />
    </div>
  );
}
