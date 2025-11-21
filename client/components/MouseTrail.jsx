"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MAX_TRAIL_POINTS = 18;

export default function MouseTrail() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX, clientY } = e;

      setPoints((prev) => {
        const next = [...prev, { x: clientX, y: clientY, id: Date.now() + Math.random() }];
        if (next.length > MAX_TRAIL_POINTS) next.shift();
        return next;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {points.map((point) => (
        <motion.span
          key={point.id}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0.9, 0.3, 0], scale: [1.0, 0.9, 1.2] }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: point.x,
            top: point.y,
            translateX: "-50%",
            translateY: "-50%"
          }}
          className="block h-4 w-4 rounded-full bg-emerald-400/70 md:blur-xl"
        />
      ))}
    </div>
  );
}
