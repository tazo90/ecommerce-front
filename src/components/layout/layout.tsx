import Header from '@components/layout/header/header';
// import Footer from '@components//layout/footer/footer';
// import MobileNavigation from '@components/layout/mobile-navigation';

interface LayoutProps {
  children?: any;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout;