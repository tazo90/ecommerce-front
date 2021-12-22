import Container from "@components/ui/container";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Layout from "@components/layout/layout";
import ProductSingleDetails from "@components/product/product-single-details";

export default function ProductPage() {
  return (
    <>
      <Container>
        {/* <div className="flex flex-col relative p-6"> */}
        {/* <Image
            src={currentProduct.img}
            width={100}
            height={100}
            className="object-cover"
          /> */}
        {/* <div>{currentProduct.description}</div>
          <div>{currentProduct.price}</div> */}

        {/* <div className="fixed bottom-0 left-0 w-full h-16 border-t-2 border-gray-100">
            <div className="flex items-center justify-between px-6 h-full">
              <div className="flex text-[30px] text-red-600">
                <button>
                  <IoRemoveCircleOutline />
                </button>
                <div className="px-2 text-[18px] text-black">2</div>
                <button className="text-[30px]">
                  <IoAddCircleOutline />
                </button>
              </div>
              <button className="w-52 bg-red-600 px-6 py-2 font-bold text-md bg-white text-white border-2 border-white rounded-lg">
                Dodaj - 5.32 zł
              </button>
            </div>
          </div>
        </div> */}
        <ProductSingleDetails />
      </Container>
    </>
  );
}

ProductPage.Layout = Layout;
