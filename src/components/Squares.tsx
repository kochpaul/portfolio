import { useEffect, useState } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}: SquaresProps) {
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
  if (!canvasEl) return;

  const ctx = canvasEl.getContext("2d");
  if (!ctx) return;

  let animationFrame: number;
  let gridOffset = { x: 0, y: 0 };
  let numSquaresX = 0;
  let numSquaresY = 0;

  const resizeCanvas = () => {
    canvasEl.width = canvasEl.offsetWidth;
    canvasEl.height = canvasEl.offsetHeight;
    numSquaresX = Math.ceil(canvasEl.width / squareSize) + 1;
    numSquaresY = Math.ceil(canvasEl.height / squareSize) + 1;
  };

  const drawGrid = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.y / squareSize) * squareSize;

    ctx.lineWidth = 0.5;

    for (let x = startX; x < canvasEl.width + squareSize; x += squareSize) {
      for (let y = startY; y < canvasEl.height + squareSize; y += squareSize) {
        const squareX = x - (gridOffset.x % squareSize);
        const squareY = y - (gridOffset.y % squareSize);

        // 🟡 HOVER-LOGIK ENTFERNT

        ctx.strokeStyle = borderColor;
        ctx.strokeRect(squareX, squareY, squareSize, squareSize);
      }
    }

    const gradient = ctx.createRadialGradient(
      canvasEl.width / 2,
      canvasEl.height / 2,
      0,
      canvasEl.width / 2,
      canvasEl.height / 2,
      Math.sqrt(Math.pow(canvasEl.width, 2) + Math.pow(canvasEl.height, 2)) / 2
    );
    gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
    gradient.addColorStop(1, "#060606");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  };

  const updateAnimation = () => {
    const effectiveSpeed = Math.max(speed, 0.1);

    switch (direction) {
      case "right":
        gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case "left":
        gridOffset.x = (gridOffset.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case "up":
        gridOffset.y = (gridOffset.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case "down":
        gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case "diagonal":
        gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
    }

    drawGrid();
    animationFrame = requestAnimationFrame(updateAnimation);
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animationFrame = requestAnimationFrame(updateAnimation);

  return () => {
    window.removeEventListener("resize", resizeCanvas);
    cancelAnimationFrame(animationFrame);
  };
}, [canvasEl, direction, speed, borderColor, squareSize]);

  return (
    <canvas
      ref={setCanvasEl}
      className={`w-full h-full border-none block ${className}`}
    />
  );
}
