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

// Server Component: Fetch blogs data
async function getBlogs() {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs/latest?type=blog`,
    );
    console.log(request);
    const posts = await request.json();
    console.log(posts);
    return posts.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProducts() {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs/latest?type=product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 30 },
      },
    );
    const posts = await request.json();
    return posts.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const posts = (await getBlogs()) as [
    {
      title: string;
      description: string;
      tags: string;
      category: string;
      author: string;
      keywords: string;
      image: string;
      slug: string;
      _id: string;
    },
  ];
  const products = (await getProducts()) as [
    {
      title: string;
      description: string;
      tags: string;
      category: string;
      author: string;
      keywords: string;
      image: string;
      slug: string;
      _id: string;
    },
  ];

  return (
    <>
      <ScrollUp />
      <HeroSection />
      <BlogHighlights blogPosts={posts} />
      <ProductReviews products={products} />
      <AuthorBio />
      {/* <Hero />
      <Features />
      <Video /> */}
      {/* <Brands /> */}
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <Blog blogs={posts} /> {/* Pass posts to the Blog component */}
      <Contact />
    </>
  );
}
