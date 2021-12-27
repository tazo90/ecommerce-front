import Search from "@components/common/search";
import Header from "@components/layout/header/header";
// import Footer from '@components//layout/footer/footer';
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import StartOrderButton from "@components/order/start-order-button";

interface LayoutProps {
  children?: any;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MobileNavigation top />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
        <StartOrderButton />
      </main>
      <Search />
    </div>
  );
}

export default Layout;
