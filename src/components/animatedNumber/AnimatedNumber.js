import React from "react";
import { useSpring, animated } from "@react-spring/web";
function AnimatedNumber({ prefix, n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 30, friction: 10 },
  });

  return (
    <span>
      {prefix}
      <animated.span>{number.to((n) => n.toFixed(2))}</animated.span>
    </span>
  );
}

export default AnimatedNumber;
