import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type SkillBarProps = {
  name: string;
  value: number;
};

export default function SkillBar({ name, value }: SkillBarProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // nur einmal triggern

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1000;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.round(progress * end));
      if (progress < 1) requestAnimationFrame((ts) => step(ts, startTime));
    };
    requestAnimationFrame((ts) => step(ts, ts));
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1 text-sm font-medium text-zinc-300">
        <span>{name}</span>
        <span>{count} / 10</span>
      </div>
      <div className="w-full h-3 bg-zinc-800 rounded">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(value / 10) * 100}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-3 bg-gradient-to-r from-primary-gradientStart to-primary rounded"
        />
      </div>
    </div>
  );
}
