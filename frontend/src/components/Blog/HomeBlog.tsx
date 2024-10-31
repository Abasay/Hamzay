"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogHighlights(props: {
  blogPosts: [
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
}) {
  // const blogs = [
  //   {
  //     id: 1,
  //     title: "The Future of AI",
  //     paragraph:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
  //     imageUrl: "/images/blog/blog-01.jpg",
  //     description: "An in-depth look into how AI is shaping the world.",
  //     author: {
  //       name: "Samuyl Joshi",
  //       image: "/images/blog/author-01.png",
  //       designation: "Graphic Designer",
  //     },
  //     tags: ["creative"],
  //     publishDate: "2025",
  //     slug: "future-of-ai",
  //   },
  //   {
  //     id: 2,
  //     title: "Best Laptops of 2024",
  //     description: "Top recommendations for tech enthusiasts.",
  //     slug: "best-laptops-2024",
  //     paragraph:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
  //     imageUrl: "/images/blog/blog-02.jpg",
  //     author: {
  //       name: "Musharof Chy",
  //       image: "/images/blog/author-02.png",
  //       designation: "Content Writer",
  //     },
  //     tags: ["computer"],
  //     publishDate: "2025",
  //   },
  //   {
  //     id: 3,
  //     title: "Why 5G Matters",
  //     paragraph:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
  //     imageUrl: "/images/blog/blog-03.jpg",
  //     description: "Exploring the impact of 5G on modern communication.",
  //     author: {
  //       name: "Lethium Deo",
  //       image: "/images/blog/author-03.png",
  //       designation: "Graphic Designer",
  //     },
  //     tags: ["design"],
  //     publishDate: "2025",
  //     slug: "why-5g-matters",
  //   },
  // ];

  // const [blogs, setBlogs] = useState<
  //   {
  //     title: string;
  //     description: string;
  //     tags: string;
  //     category: string;
  //     author: string;
  //     keywords: string;
  //     image: string;
  //     slug: string;
  //   }[]
  // >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const { blogPosts } = props;

  // const handleGetBlogs = async () => {
  //   try {
  //     const request = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs/latest?type=blog`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: `Bearer {token}`,
  //         },
  //       },
  //     );
  //     const response = await request.json();
  //     setBlogs((response.data as []).splice(0, 3));
  //     console.log(response);
  //   } catch (error: any) {
  //     console.error(error);
  //     //  toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   handleGetBlogs();
  // }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Blogs</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((blog) => (
            <div
              key={blog.slug}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-4 text-2xl font-semibold">{blog.title}</h3>
                <p className="mb-4 text-gray-600">{blog.description}</p>
                <Link
                  href={`/blog/${blog._id}`}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-center">
        <Link
          href={"/blogs"}
          className="btn text-base font-light text-slate-600"
        >
          Load More
        </Link>
      </div>
    </section>
  );
}
