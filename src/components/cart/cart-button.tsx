import { IoCartOutline } from "react-icons/io5";

function CartButton() {
  return (
    <button
      className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
      // onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <IoCartOutline className="text-3xl" />
      <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-1 xl:-top-3 -end-2.5 xl:-end-3 rounded-full font-bold">
        10
      </span>
    </button>
  );
}

export default CartButton;
