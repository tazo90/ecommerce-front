import SearchBox from "@components/common/search-box";
import { IoListOutline } from "react-icons/io5";

export function StoreSearch({ withList }) {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex mt-2 lg:mt-4 w-full">
        <div className="flex justify-between mx-2 mb-1.5 w-full">
          <SearchBox
            onSubmit={() => {}}
            onChange={() => {}}
            height="8"
            className="border border-gray-300"
            name="search"
            value={""}
            onClear={() => {}}
            ref={(input) => input?.focus()}
          />
          {withList && (
            <button className="flex items-center justify-center ml-4 p-2 bg-green text-white rounded-lg w-1/4">
              <IoListOutline />
              <span className="relative left-1 bottom-[1px]">List</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
