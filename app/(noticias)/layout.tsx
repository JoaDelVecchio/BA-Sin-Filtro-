import Header from "@/components/Header";

const NoticiasLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default NoticiasLayout;
