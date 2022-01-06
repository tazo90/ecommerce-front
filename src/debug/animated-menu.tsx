import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const trees = [
  {
    color: "blue",
    name: "view 1",
  },
  {
    color: "green",
    name: "view 2",
  },
  {
    color: "red",
    name: "view 3",
  },
];

const transition = {
  type: "tween",
  duration: 0.4,
};

const variants = {
  fastInit: { x: "-100%", transition: { type: "tween", duration: 0.1 } },
  left: { x: "-100%", transition },
  right: { x: "100%", transition },
  animate: {
    x: 0,
    transition,
  },
};

const AnimatedMenu = ({ sidebarOpen }) => {
  const [activeTree, setActiveTree] = useState(0);
  const [origin, setOrigin] = useState(0);

  const handleClick = (direction) => {
    setActiveTree((prevState) => {
      if (activeTree === 0 && direction < 0) {
        return activeTree;
      } else if (activeTree === trees.length - 1 && direction > 0) {
        return activeTree;
      }
      return prevState + direction;
    });

    setOrigin(direction);
  };

  return (
    <div className="relative">
      <button onClick={() => handleClick(-1)} disabled={activeTree === 0}>
        Prev
      </button>
      <button onClick={() => handleClick(1)} disabled={activeTree == 2}>
        Next
      </button>
      <br />
      <br />
      <br />
      <AnimatePresence exitBeforeEnter={false}>
        {trees.map(({ color, name }, i) => (
          <motion.div
            key={name}
            variants={variants}
            initial={activeTree === i ? "left" : "right"}
            animate={
              activeTree === i ? "animate" : i > activeTree ? "right" : "left"
            }
            style={{
              overflow: "hidden",
              width: "100%",
              position: "absolute",
              height: "100%",
              background: `${color}`,
              fontSize: "36px",
              marginBottom: "30px",
            }}
          >
            {name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedMenu;
