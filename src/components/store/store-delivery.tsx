import { MenuIntro } from "@components/layout/header/mobile-menu-modern/menu-intro";
import { fadeInLeft } from "@utils/motion/fade-in-left";
import { fadeInRight } from "@utils/motion/fade-in-right";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { motion } from "framer-motion";

function StoreDelivery() {
  return (
    <motion.div
      layout
      // initial="from"
      // animate="to"
      // exit="from"
      style={{
        x: "-100%",
      }}
      animate={{
        x: "0",
      }}
      exit={{
        x: "-100%",
      }}
      //@ts-ignore
      // variants={fadeInRight(0.35)}
      className="w-full flex flex-col"
    >
      Delivery
      <MenuIntro />
    </motion.div>
  );
}

export default StoreDelivery;
