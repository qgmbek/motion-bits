"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const AnimatedCounter = ({
  end,
  duration = 2,
}: {
  end: number;
  duration: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const newCount = Math.round(easeOut * end);
      setCount(newCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      {count.toLocaleString()}
    </div>
  );
};

export default function Counter({ value = 100 }: { value?: number }) {
  return <AnimatedCounter end={value} duration={50} />;
}
