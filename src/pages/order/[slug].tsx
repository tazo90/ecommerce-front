import Container from "@components/ui/container";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function ProductPage() {
  const { currentProduct } = useSelector((state) => state.product);

  console.log("CURRENT PROD", currentProduct);
  return (
    <>
      <Container>
        <div className="flex flex-col relative p-6">
          {/* <Image
            src={currentProduct.img}
            width={100}
            height={100}
            className="object-cover"
          /> */}
          {/* <div>{currentProduct.description}</div>
          <div>{currentProduct.price}</div> */}

          <div className="fixed bottom-0 left-0 w-full h-16 bg-red-600">
            <div className="flex items-center justify-between px-4 h-full">
              <div className="flex text-[30px] text-white">
                <button>
                  <IoRemoveCircleOutline />
                </button>
                <div className="px-2 text-[18px]">2</div>
                <button className="text-[30px]">
                  <IoAddCircleOutline />
                </button>
              </div>
              <button className="px-6 py-3 font-bold text-sm bg-white text-black rounded-full shadow-sm p-4">
                Dodaj - 5,32
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
