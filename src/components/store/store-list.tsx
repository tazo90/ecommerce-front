const stores = Array.from({ length: 50 }).map((_, idx) => ({
  name: "KFC Magnolia",
  closed: idx % 2 ? true : false,
}));

export function StoreList() {
  return (
    <div className="flex flex-col w-full overflow-auto h-screen relative mx-auto px-2">
      {stores.map((store, i) => (
        <div className="flex items-center justify-between p-4 h-16 my-0.5 rounded-lg shadow-lg bg-white">
          <div className="flex gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
            />
            <div className="flex flex-col">
              <strong className="text-gray-900 text-sm font-mediu">
                {store.name}
              </strong>
              <div className="flex">
                <div className="flex text-gray-900 text-xs font-medium">
                  Warszawa, ul. Grochowska 10
                </div>
                <div className="w-4 h-4 rounded-full bg-red"></div>
              </div>
              <span className="text-gray-900 text-xs font-medium">
                8:00 - 20:00
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center pl-5 pb-4">
              <div
                className={`w-2 h-2 rounded-full bg-${
                  store.closed ? "red-600" : "green"
                }`}
              ></div>
              <span className="pl-1 text-xs">
                {store.closed ? "Closed" : "Open"}
              </span>
            </div>
            <div className="text-gray-900 text-xs font-medium">Review: 3.5</div>
          </div>
        </div>
      ))}
    </div>
  );
}
