import Container from "@components/ui/container";
import StoreNav from "@components/store/store-nav";

function StoreLayout({ children }) {
  return (
    <>
      <Container>
        <div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <StoreNav />
            <div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">{children}</div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default StoreLayout;