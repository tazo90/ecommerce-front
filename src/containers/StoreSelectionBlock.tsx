import Image from "next/image";

function StoreSelectionBlock() {
  return (
    <div className="flex flex-col items-center pt-16">
      <img src="https://static.kfc.es/images/store-images/lg/store-search-image.jpg" />

      <span className="text-lg font-semibold my-8">
        Jak chcesz otrzymać zamówienie?
      </span>

      <div className="flex items-center justify-between w-full h-48 px-4">
        <div className="flex items-center justify-center relative w-1/2 h-full bg-gray-300 rounded-lg mr-12">
          <Image
            src="https://kfc.pl/assets/img/menu/motor.png"
            width={60}
            height={60}
            quality={100}
            className="object-cover"
          />
          <span className="pl-4 text-2xl font-semibold">Dostawa</span>
          <div className="absolute bottom-0 right-1">
            <Image
              src="https://kfc.pl/assets/img/menu/clock30.svg"
              width={46}
              height={46}
              quality={100}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex items-center justify-center relative w-1/2 h-full bg-gray-300 rounded-lg">
          <Image
            src="https://kfc.pl/assets/img/menu/hand.png"
            width={60}
            height={60}
            quality={100}
            className="object-cover"
          />
          <span className="pl-4 text-2xl font-semibold">Restauracja</span>
          <div className="absolute bottom-0 right-1">
            <Image
              src="https://kfc.pl/assets/img/menu/clock5.svg"
              width={46}
              height={46}
              quality={100}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-between px-2 py-2 border-gray-300 border-b-2">
        <div className="flex border-gray-300 border-r-2 pr-2">
          <Image
            src="https://kfc.pl/assets/img/menu/motor.png"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
          <span>Dostawa</span>
          <Image
            src="https://kfc.pl/assets/img/menu/clock30.svg"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="flex pl-2 pr-2">
          <Image
            src="https://kfc.pl/assets/img/menu/hand.png"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
          <span>Restauracja</span>
          <Image
            src="https://kfc.pl/assets/img/menu/clock5.svg"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
        </div>
      </div> */}
    </div>
  );
}

export default StoreSelectionBlock;
