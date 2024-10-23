"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductReviews(props: {
  products: [
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
  const { products } = props;
  // const handleGetProducts = async () => {
  //   try {
  //     const request = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL as string}/api/blogs/latest?type=product`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: `Bearer {token}`,
  //         },
  //       },
  //     );
  //     const response = await request.json();
  //     setProducts((response.data as []).splice(0, 4));
  //     console.log(response);
  //   } catch (error: any) {
  //     console.error(error);
  //     //  toast.error(error.message);
  //   }
  // };

  // useEffect(()=>{
  //   handleGetProducts()
  // }, [])

  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Top Tech Products
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-4 text-2xl font-semibold">{product.title}</h3>
                <p className="mb-4 text-gray-600">{product.description}</p>
                <Link
                  href={`tech/${product._id}`}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={"/tech"}
            className="btn bg-zinc-400 text-base font-light text-slate-800"
          >
            See More Products
          </Link>
        </div>
      </div>
    </section>
  );
}
