import SearchBox from "@components/common/search-box";

export function StoreSearch({ withList }) {
  return (
    <div className="flex flex-col w-full bg-zinc-100">
      <div className="flex mt-2 lg:mt-4 w-full">
        <div className="flex justify-between mx-2 mb-1.5 w-full">
          <SearchBox
            onSubmit={() => {}}
            onChange={() => {}}
            name="search"
            value={""}
            onClear={() => {}}
            ref={(input) => input?.focus()}
          />
          {withList && (
            <button className="ml-4 p-2 bg-green text-white rounded-lg w-1/4">
              List
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
