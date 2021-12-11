import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { 
  SearchIcon,
  MenuIcon,
  HomeIcon
} from '@components/icons';
import Link from '@components/ui/link';
import { Drawer } from '@components/common/drawer/drawer';
import { openSearch, setDrawerView } from '@slices/ui.slice';

const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
})
const MobileMenu = dynamic(() => import('@components/layout/header/mobile-menu'));

function BottomNavigation() {
  const dispatch = useDispatch();
  const { drawerView } = useSelector((state) => state.ui);

  function handleMobileMenu() {
    dispatch(setDrawerView('MOBILE_MENU'));
  }

  return (
    <>
      <div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-6">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={() => dispatch(openSearch())}
          aria-label="search-button"
        >
          <SearchIcon />
        </button>
        <Link href="/" className="flex-shrink-0">
          <HomeIcon />
        </Link>
        <CartButton />
      </div>
      <Drawer
        placement={"left"}
        open={drawerView === 'MOBILE_MENU'}
        onClose={() => dispatch(setDrawerView(null))}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={{ left: 0 }}
      >
        <MobileMenu />
      </Drawer>
    </>
  )
}

export default BottomNavigation;
