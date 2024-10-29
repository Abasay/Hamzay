"use client";
import React, { useRef, useState } from "react";

const TECHOPTIONS = [
  {
    id: 1,
    title: "Wearable device",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/game-cat.webp",
  },
  {
    id: 2,
    title: "Mobile device",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/phone-cat.webp",
  },
  {
    id: 3,
    title: "Home devices",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
  {
    id: 4,
    title: "Audio devices",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/watch-cat.webp",
  },
  {
    id: 5,
    title: "Gaming gadget",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
  {
    id: 6,
    title: "Accessories",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/watch-cat.webp",
  },
  {
    id: 7,
    title: "Travel gadget",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
  {
    id: 8,
    title: "Office gadget",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
  {
    id: 9,
    title: "Softwares",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
  {
    id: 10,
    title: "Health and Fitness",
    image:
      "https://matjar.themejr.net/wp-content/uploads/2024/07/cat-laptop.webp",
  },
];

const Options = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 0.5; // Reduced speed for smoother effect
    requestAnimationFrame(() => {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    });
  };

  return (
    <section className="mt-10">
      <div className="bg-white">
        <div
          ref={sliderRef}
          className={`scrollbar-hide mx-auto flex w-[95%] cursor-grab justify-evenly gap-6 overflow-x-auto scroll-smooth active:cursor-grabbing ${
            isDragging ? "select-none" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ userSelect: "none", scrollBehavior: "smooth" }} // Enable smooth scrolling
        >
          {TECHOPTIONS.map((option) => (
            <div key={option.id} className="p-3">
              <div
                className="wow fadeInUp flex w-[220px] flex-col gap-5 hover:text-blue-800"
                data-wow-delay=".15s"
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="h-[220px] w-full rounded-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105 hover:cursor-pointer"
                  draggable={false} // Prevent image drag
                />
                <span className="rounded-md p-1 text-center  font-[700] tracking-wide hover:text-blue-800">
                  {option.title.slice(0, 18).length === option.title.length
                    ? option.title
                    : option.title.slice(0, 18) + "..."}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Options;
