import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from '@components/ui/link';

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}

type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[]
}

function MegaMenu({ columns }: MegaMenuProps) {
  return (
    <div className="megaMenu shadow-header bg-gray-200 absolute -start-20 xl:start-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
      <div className="grid grid-cols-5">
        {columns?.map((column) => (
          <ul
            className="even:bg-gray-150 pb-7 2xl:pb-8 pt-6 2xl:pt-7"
            key={column.id}
          >
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="mb-1.5">
                  <Link
                    href={columnItem.path}
                    className="block text-sm py-1.5 text-heading font-semibold px-5 xl:px-8 2xl:px-10 hover:text-heading hover:bg-gray-300"
                  >
                    {columnItem.label}
                  </Link>
                </li>
                {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={
                      cn({
                        'border-b border-gray-300 pb-3.5 mb-3': columnItem?.columnItemItems?.length === item.id
                      })
                    }	
                  >
                    <div className="flex flex-row items-center">
                      {item.image &&
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          quality={100}
                          className={`object-cover`}
                        />
                      }
                      <Link
                        href={item.path}
                        className="text-body text-sm block py-1.5 px-5 hover:text-heading hover:bg-gray-300"
                      >
                        {item.label}
                      </Link>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default MegaMenu;
