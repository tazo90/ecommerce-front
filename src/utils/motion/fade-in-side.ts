export function fadeInSide(duration: number = 0.5) {
  const transition = {
    type: "tween",
    duration,
  };

  return {
    left: { x: "-100%", transition },
    right: { x: "100%", transition },
    animate: {
      x: 0,
      transition,
    },
  };
}
