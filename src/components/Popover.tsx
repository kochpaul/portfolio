import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type FullscreenPopoverProps = {
  title: string;
  description: string;
  cta_text?: string;
  cta_url?: string;
  onClose: () => void;
};

export function FullscreenPopover({
  title,
  description,
  cta_text,
  cta_url,
  onClose,
}: FullscreenPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hintergrund-Scroll deaktivieren
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Klick außerhalb schließen
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <div
        ref={popoverRef}
        className="relative w-full max-w-2xl bg-neutral-900 text-white rounded-2xl shadow-xl p-8 sm:p-10 border border-zinc-800"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition"
          aria-label="Schließen"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
          {title}
        </h3>
        <p className="text-zinc-400 text-base sm:text-lg whitespace-pre-line leading-relaxed">
          {description}
        </p>

        {cta_url && (
          <a
            href={cta_url}
            className="flex group gap-2 h-10 mt-4 justify-center text-center bg-gradient-to-r from-primary-gradientStart to-primary text-white px-4 py-2 rounded-full"
          >
            {cta_text || "Mehr erfahren"}
          </a>
        )}
      </div>
    </div>,
    document.body
  );
}
