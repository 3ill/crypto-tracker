import Nav from "@/shared/components/nav";
import Footer from "@/shared/layout/footer";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="w-full">
      <Nav />
      {children}
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
