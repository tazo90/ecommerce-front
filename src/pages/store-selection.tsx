import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import StoreSelectionBlock from "@containers/StoreSelectionBlock";

export default function StoreSelection() {
  return (
    <Container>
      <StoreSelectionBlock />
    </Container>
  );
}

StoreSelection.Layout = Layout;
