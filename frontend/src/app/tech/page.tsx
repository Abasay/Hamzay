import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import HeroTech from "@/components/Hero/heroTech";
import Options from "@/components/TechOptions/Options";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamzay Tech Site",
  description: "This is a tech site for Hamzay",

  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <HeroTech />
      {/* <Options /> */}
    </>
  );
}
