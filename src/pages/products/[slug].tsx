import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import ProductSingleDetails from "@components/product/product-single-details";

export default function ProductPage() {
  return (
    <Container>
      <ProductSingleDetails />
    </Container>
  );
}

ProductPage.Layout = Layout;
