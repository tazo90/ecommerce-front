import cn from 'classnames';
import { FaChevronDown } from 'react-icons/fa';

import Link from '@components/ui/link';
import ListMenu from '@components/ui/list-menu';

interface MenuProps {
  data: any;
  className?: string;
}

function HeaderMenu({ data, className }: MenuProps) {
  return (
    <nav className={cn('headerMenu flex w-full relative', className)}>
      {data?.map((item: any) => (
        <div
          className={cn('menuItem group cursor-pointer py-7', {
            'relative': item.subMenu
          })}
          key={item.id}
        >
          <Link
            href={item.path}
            className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-black"
          >
            {item.label}
            {(item?.columns || item.subMenu) && (
              <span className="opacity-30 text-xs mt-1 xl:mt-0.5 w-4 flex justify-end">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span> 
            )}
          </Link>

          {item?.subMenu && Array.isArray(item.subMenu) && (
            <div className="subMenu shadow-header bg-gray-200 absolute start-0 opacity-0 group-hover:opacity-100">
              <ul className="text-body text-sm py-5">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;

                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  )
                })}
              </ul>
            </div> 
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
