import { ArrowLeft } from "lucide-react";

export function BackButton({href} : {href:string}) {
  return (
    <a href={href}>
        <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white px-8 py-2 text-sm font-medium text-white transition-colors shadow-lg">
          {/* Sichtbarer Text */}
          <span className="relative z-10 flex text-black left-2 transition-opacity duration-500 group-hover:opacity-0">
            Zurück
          </span>
          {/* Hover-Overlay */}
          <span className="absolute inset-0 z-0 grid w-1/4 place-items-center bg-gray-300 transition-all duration-500 group-hover:w-full">
            <ArrowLeft size={16} strokeWidth={2}  color="black" />
          </span>
        </button>
    </a>
  );
}
