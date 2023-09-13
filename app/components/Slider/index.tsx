"use client";
import { useState } from "react";
import Image from "next/image";

export const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const current = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(event.clientX - current.left, current.width)
    );
    const percent = Math.max(0, Math.min((x / current.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className="w-full relative" onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <Image
          src="https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_1280.jpg"
          alt="earth"
          fill
          priority
        />
        <div
          style={{ clipPath: ` inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        >
          <Image
            src="https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727_1280.jpg"
            alt="moon"
            fill
            priority
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};
