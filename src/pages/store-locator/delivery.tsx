import Layout from "@components/layout/layout";
import StoreDelivery from "@components/store/store-delivery";
import StoreLayout from "@components/store/store-layout";

export default function DeliveryPage() {
  return (
    <StoreLayout>
      <StoreDelivery />
    </StoreLayout>
  );
}

DeliveryPage.Layout = Layout;
