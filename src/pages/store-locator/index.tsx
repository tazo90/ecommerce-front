import Layout from "@components/layout/layout";
import StoreLayout from "@components/store/store-layout";
import StorePickup from "@components/store/store-pickup";

export default function StoreLocatorPage() {
  return (
    <StoreLayout>
      <StorePickup />
    </StoreLayout>
  );
}

StoreLocatorPage.Layout = Layout;
