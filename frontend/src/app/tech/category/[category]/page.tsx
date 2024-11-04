"use client";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { TECHOPTIONS } from "@/components/TechOptions/Options";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryPage: React.FC = () => {
  const params = useParams();

  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [pageCategory, setPageCategory] = useState("");

  useEffect(() => {
    const { category } = params;

    if (!category) {
      router.push("/tech");
    }

    const searchCategory = TECHOPTIONS.find(
      (option) => option.link === category,
    );

    if (!searchCategory) {
      router.push("/tech");
    }

    setPageCategory(searchCategory.title as string);

    // Fetch data from API
    (async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs/category/${category}`,
      );
      const posts = await request.json();
      console.log(posts);
      setPosts(posts.data);
      return posts.data;
    })();
  }, [params]);

  return (
    <>
      <Breadcrumb
        pageName={`Tech Options - ${pageCategory}`}
        description="This is the list of products"
      />
      <div className="mt-4">
        <div className="container mx-auto mt-8 px-4">
          <div className="rounded-md bg-gray-100 p-4 text-center text-gray-700 shadow-md">
            <p className=" italic">
              At 4hmztech, we recommend products and services that we believe
              in. Our posts include affiliate links which may earn us a small
              commission at no additional cost to you if you make a purchase
              through these links.
            </p>
          </div>
        </div>
      </div>

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {posts.map((blog) => (
              <div
                key={blog._id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          {/* <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Prev
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li className="mx-1">
                  <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                    ...
                  </span>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    12
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
