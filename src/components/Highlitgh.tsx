"use client";
import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const dotPattern = (color: string) => ({
  backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
  backgroundSize: "16px 16px",
});

const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.3 }}
      viewport={{ once: true, amount: 0.6 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={[
        "relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.span>
  );
};

export const HeroHighlightText = ({
  textBefore,
  highlight,
  textAfter,
}: {
  textBefore: string;
  highlight: string;
  textAfter: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="relative flex items-center bg-white dark:bg-black justify-center w-full group"
      style={{ minHeight: "100vh" }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={dotPattern("rgb(212 212 212)")}
      />
      <div
        className="absolute inset-0 dark:opacity-70 opacity-0 pointer-events-none"
        style={dotPattern("rgb(38 38 38)")}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern("rgb(99 102 241)"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 0.5 }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative z-20 text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        {textBefore} <Highlight className="text-inherit">{highlight}</Highlight>{" "}
        {textAfter}
      </motion.h1>
    </div>
  );
};
