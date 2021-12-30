import { useEffect } from "react";
import { MenuIntro } from "@components/layout/header/mobile-menu-modern/menu-intro";
import { fadeInLeft } from "@utils/motion/fade-in-left";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { motion } from "framer-motion";

const containerVariants = {
  from: {
    opacity: 0,
    x: "100%",
  },
  to: {
    opacity: 1,
    x: 0,
    transiton: {
      type: "sprint",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

function StorePickup() {
  return (
    <motion.div
      layout
      // initial="from"
      // animate="to"
      // exit="from"
      initial={{
        x: "100%",
      }}
      animate={{
        x: "0",
      }}
      exit={{
        x: "100%",
      }}
      //@ts-ignore
      // variants={fadeInLeft(0.35)}

      // initial="from"
      // animate="to"
      // variants={containerVariants}
      className="w-full flex flex-col"
    >
      Pickup
      <MenuIntro />
    </motion.div>
  );
}

export default StorePickup;
