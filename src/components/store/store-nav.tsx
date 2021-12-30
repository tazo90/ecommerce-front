import { ROUTES } from "@utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { IoIosHand, IoIosCar } from "react-icons/io";

const storeMenu = [
  {
    slug: ROUTES.STORE_LOCATOR,
    name: "Pick Up",
    className: "rounded-l-lg",
    icon: <IoIosHand className="w-5 h-5" />,
  },
  {
    slug: ROUTES.DELIVERY,
    name: "Delivery",
    className: "rounded-r-lg",
    icon: <IoIosCar className="w-5 h-5" />,
  },
];

export default function StoreNav() {
  const { pathname } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const mainPath = `/${newPathname[0]}`;

  return (
    <nav className="flex justify-center md:w-2/6 2xl:w-4/12 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-2 md:pb-0">
      {storeMenu.map((item) => {
        const menuPathname = item.slug.split("/").slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;
        const isActive = mainPath === menuPath;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={cn(
                item.className,
                "flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 mb-2",
                {
                  "font-semibold bg-green": isActive,
                  "font-normal border-2 border-slate-200": !isActive,
                }
              )}
            >
              {item.icon}
              <span className="pl-2">{item.name}</span>
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
