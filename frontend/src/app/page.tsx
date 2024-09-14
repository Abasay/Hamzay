import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AuthorBio from "@/components/Author/author";
import Blog from "@/components/Blog";
import BlogHighlights from "@/components/Blog/HomeBlog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HeroSection from "@/components/Hero/Hero";
import Pricing from "@/components/Pricing";
import ProductReviews from "@/components/TechOptions/HomeProducts";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamzay Blogging Site",
  description: "This is a blogging site for Hamzay",

  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <HeroSection />
      <BlogHighlights />
      <ProductReviews />
      <AuthorBio />

      {/* <Hero />
      <Features />
      <Video /> */}
      {/* <Brands /> */}
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Pricing /> */}
      <Blog />
      <Contact />
    </>
  );
}
