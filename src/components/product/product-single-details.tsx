import Counter from "@components/common/counter";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductSingleDetails() {
  const { currentProduct } = useSelector((state) => state.product);
  const {
    query: { slug },
  } = useRouter();

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-16 pb-10 lg:pb-14 2xl:pb-20 items-start">
      <div className="col-span-5 grid grid-cols-1">
        <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
          <img src={currentProduct?.img} className="object-cover w-full" />
        </div>
      </div>

      <div className="col-span-4 pt-4 lg:pt-0">
        <div className="pb-7 mb-7 border-b border-gray-300">
          <div className="flex justify-between">
            <h2 className="text-heading text-2xl md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
              {currentProduct.name}
            </h2>
            <h2 className="text-heading text-2xl md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
              {currentProduct.price}
            </h2>
          </div>
          <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
            {currentProduct.description}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-16 flex items-center border-t border-gray-300 py-8 px-4">
        <Counter
          quantity={quantity}
          onIncrement={() => setQuantity((prev) => prev + 1)}
          onDecrement={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
          disableDecrement={quantity === 1}
        />
        <Button
          onClick={() => {}}
          variant="slim"
          className={`ml-4 w-full md:w-6/12 xl:w-full bg-red-600 hover:bg-gray-400`}
          disabled={false}
          loading={false}
        >
          <span className="py-2 3xl:px-8">Dodaj - 4.50 zł</span>
        </Button>
      </div>
    </div>
  );
}
