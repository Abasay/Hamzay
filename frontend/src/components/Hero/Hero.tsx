"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import blogData from "../Blog/blogData";

const products = [
  {
    title: "Apple MacBook Pro",
    description: "High-performance laptop for professionals.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.tqR7GXnTrABvILUwwufQjQHaFf?rs=1&pid=ImgDetMain",
    affiliateLink:
      "https://th.bing.com/th/id/OIP.tqR7GXnTrABvILUwwufQjQHaFf?rs=1&pid=ImgDetMain",
  },
  {
    title: "Sony WH-1000XM4",
    description: "Noise-cancelling wireless headphones.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.Lz8v44GOE5YO5J-njdvwgAHaHa?rs=1&pid=ImgDetMain",
    affiliateLink:
      "https://th.bing.com/th/id/OIP.Lz8v44GOE5YO5J-njdvwgAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "Samsung Galaxy S24",
    description: "Next-gen smartphone with a powerful camera.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain",
    affiliateLink:
      "https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain",
  },
];

// Use the data array as needed in your component
export default function HeroSection() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [dataRes, setDataRes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const filterBlogs = blogData.filter((blog) =>
        blog.title.includes(searchWord),
      );

      const searchProducts = products.filter((product) =>
        product.title.includes(searchWord),
      );

      const result = [...filterBlogs, ...searchProducts];
      setDataRes(result);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [searchWord]);
  return (
    <section className="relative z-10 mt-24 overflow-hidden bg-gray-900 py-16 pb-16 text-white  dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] 2xl:pb-[200px] ">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Techie&apos;s Blog
        </h1>
        <p className="mb-6 text-xl">
          Your source for the latest tech write-ups and in-depth reviews of
          trending products.
        </p>
        <div className="relative mb-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for blogs or products..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full rounded-sm px-6 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isLoading && (
            <span className="loading loading-spinner loading-xs  absolute right-2 top-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 "></span>
          )}
          <div className=" scrollbar-hide h-[150px] overflow-y-auto">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2 top-2 h-6 w-6 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg> */}
            {dataRes.length > 0 && searchWord && (
              <div className="dropdown dropdown-open mx-auto  w-full text-center transition-all delay-200 duration-700 ease-in-out ">
                {/* <div tabIndex={0} role="button" className="btn m-1">
            Click
          </div> */}
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] mx-auto -mt-5 w-full rounded-sm bg-base-100 p-2 text-zinc-800 shadow transition-all delay-200 duration-700 ease-in-out "
                >
                  {dataRes.map((data: any, idx: number) => (
                    <li className="menu-item" key={idx}>
                      <Link href={data.affiliateLink || ""}>
                        <span className="menu-content">
                          <div className="menu-title">{data.title}</div>
                          <div className="menu-description">
                            {data.description || data.paragraph}
                          </div>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className=" absolute left-[5%] top-20 flex flex-col gap-4 space-x-0 sm:left-[17%] sm:flex-row sm:space-x-4">
            <Link
              href="/blogs"
              className="btn bg-blue-500 px-6 py-2 text-white hover:bg-transparent"
            >
              Read Blogs
            </Link>
            <Link
              href="/products"
              className="btn rounded-lg border border-blue-500 bg-transparent px-6 py-2 text-white hover:bg-transparent"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
