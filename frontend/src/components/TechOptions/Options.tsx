"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const TECHOPTIONS = [
  {
    id: 1,
    title: "Wearable device",
    image: "/images/tech/wearables.jpg",
    link: "wearable-device",
  },
  {
    id: 2,
    title: "Mobile device",
    image: "/images/tech/mobile.jpg",
    link: "mobile-device",
  },
  {
    id: 3,
    title: "Home devices",
    image: "/images/tech/home.jpg",
    link: "home-devices",
  },
  {
    id: 4,
    title: "Audio devices",
    image: "/images/tech/audio_devices.jpg",
    link: "audio-devices",
  },
  {
    id: 5,
    title: "Gaming gadget",
    image: "/images/tech/game.jpg",
    link: "gaming-gadget",
  },
  {
    id: 6,
    title: "Accessories",
    image: "/images/tech/accessories.jpg",
    link: "accessories",
  },
  {
    id: 7,
    title: "Travel gadget",
    image: "/images/tech/travel.jpg",
    link: "travel-gadget",
  },
  {
    id: 8,
    title: "Office gadget",
    image: "/images/tech/office.jpg",
    link: "office-gadget",
  },
  {
    id: 9,
    title: "Softwares",
    image: "/images/tech/software.jpg",
    link: "softwares",
  },
  {
    id: 10,
    title: "Health and Fitness",
    image: "/images/tech/health_and_fitness.jpg",
    link: "health-and-fitness",
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
              <Link
                href={`/tech/category/${option.link}`}
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Options;
