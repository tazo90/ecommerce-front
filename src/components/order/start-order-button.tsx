import { useRouter } from "next/router";
import Button from "@components/ui/button";
import { ROUTES } from "@utils/routes";

export default function StartOrderButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.STORE_SELECTION);
  };

  if (router.route === ROUTES.STORE_SELECTION) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 flex items-center border-t border-gray-300 py-8 px-4">
      <Button
        onClick={handleClick}
        variant="slim"
        className="w-full md:w-6/12 xl:w-full bg-red-600 hover:bg-gray-400"
        disabled={false}
        loading={false}
      >
        <span className="uppercase py-2 3xl:px-8 text-base font-bold">
          Rozpocznij zamówienie
        </span>
      </Button>
    </div>
  );
}
