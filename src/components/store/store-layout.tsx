import Container from "@components/ui/container";
import { StoreHeader } from "./store-header/store-header";

function StoreLayout({ children }) {
  return (
    <>
      <Container className="flex flex-col min-h-screen px-0 bg-zinc-100">
        <StoreHeader />
        <div className="py-2 xl:max-w-screen-xl mx-auto flex md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full relative">
            <div className="md:w-4/6 2xl:w-8/12 md:mt-0">{children}</div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default StoreLayout;
