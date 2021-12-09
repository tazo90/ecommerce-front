import dynamic from 'next/dynamic';
import { 
  SearchIcon,
  MenuIcon,
  HomeIcon
} from '@components/icons';
import Link from '@components/ui/link';

const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
})
// const MobileMenu = dynamic(() => import('@components/layout/header/header-menu'));

function BottomNavigation() {
  return (
    <>
      <div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-6">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          // onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          // onClick={openSearch}
          aria-label="search-button"
        >
          <SearchIcon />
        </button>
        <Link href="/" className="flex-shrink-0">
          <HomeIcon />
        </Link>
        <CartButton />
      </div>
    </>
  )
}

export default BottomNavigation;