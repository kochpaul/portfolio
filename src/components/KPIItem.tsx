import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type KPIProps = {
  label: string;
  value: number;
  unit?: string;
};

export default function KPIItem({ label, value, unit = "" }: KPIProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame((ts) => step(ts, startTime));
    };
    requestAnimationFrame((ts) => step(ts, ts));
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="relative z-10 p-6 sm:p-8 rounded-xl border border-white/10 
        bg-white/5 text-white backdrop-blur-md shadow-md hover:shadow-xl 
        transition-all transform hover:-translate-y-1"
    >
      <div className="text-4xl sm:text-5xl font-bold text-primary drop-shadow-sm mb-2">
        {count}
        {unit}
      </div>
      <p className="text-zinc-300 text-base sm:text-lg">{label}</p>
    </div>
  );
}
