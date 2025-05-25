import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { X } from "lucide-react";
import { FullscreenPopover } from "./Popover";

type KPIProps = {
  label: string;
  value: number;
  unit?: string;
  cta_url?: string;
  cta_text?: string;
  description: string;
};

export default function KPIItem({
  label,
  value,
  cta_url,
  cta_text,
  unit = "",
  description,
}: KPIProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [showPopover, setShowPopover] = useState(false);

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
    <>
      <div
        ref={ref}
        className="relative z-10 p-6 sm:p-8 rounded-xl border border-white/10 
          bg-white/5 text-white backdrop-blur-md shadow-md hover:shadow-xl 
          transition-all transform hover:-translate-y-1 cursor-pointer"
        onClick={() => setShowPopover(true)}
      >
        {/* Info Icon */}
        <div
          className="absolute top-2 right-2 text-white/60 hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation(); // verhindert, dass Card-Click ausgelöst wird
            setShowPopover(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>

        <div className="text-4xl sm:text-5xl font-bold text-primary drop-shadow-sm mb-2">
          {count}
          {unit}
        </div>
        <p className="text-zinc-300 text-base sm:text-lg">{label}</p>
      </div>

      {/* Fullscreen Popover */}
      {showPopover && (
        <FullscreenPopover
          title={count + unit + " " + label}
          description={description}
          cta_text={cta_text}
          cta_url={cta_url}
          onClose={() => setShowPopover(false)}
        />
      )}
    </>
  );
}
