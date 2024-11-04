"use client";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = (props: {
  blogs: [
    {
      title: string;
      description: string;
      tags: string;
      category: string;
      author: string;
      keywords: string;
      image: string;
      slug: string;
    },
  ];
}) => {
  const { blogs } = props;
  // const [blogs, setBlogs] = useState<any>(props.blogs);

  const [loading, setLoading] = useState<boolean>(false);

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
    <section
      id="blog"
      className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Our blogs are here to guide you, dive in and discover credible information that change your businesses and personal life"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogs.map((blog: any) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
