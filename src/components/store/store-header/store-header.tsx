import { useRouter } from "next/router";
import StoreNav from "./store-nav";
import { StoreSearch } from "./store-search";

export function StoreHeader() {
  const router = useRouter();

  const isDeliverySelected = router.route.endsWith("delivery");

  return (
    <div className="w-full relative z-0 body-font mt-12 bg-white">
      <StoreNav />
      <StoreSearch withList={!isDeliverySelected} />
    </div>
  );
}
