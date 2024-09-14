import { Feature } from "@/types/feature";
import Image from "next/image";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className=" rounded-xl border border-gray-200 p-3">
      <div className="wow fadeInUp flex flex-col gap-5" data-wow-delay=".15s">
        <Image
          src="/images/hero/hero-img.jpg"
          alt="Blog Image"
          width={100}
          height={100}
          className="h-[300px] w-full rounded-lg object-cover object-center"
        />
        <span className=" ml-4 w-[120px] rounded-md bg-blue-100 p-1 text-center font-light tracking-wide text-blue-400">
          Technology
        </span>
        <h2 className=" ml-4 text-xl font-bold text-black dark:text-gray-300">
          The impact of Technology on the workplace: How Technology is changing
        </h2>
        <p className="  ml-4  text-justify text-sm text-zinc-700">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex maiores
          necessitatibus illo sed quae.
        </p>
        <div className=" ml-4  mt-2 flex flex-row items-center gap-3 text-base font-medium text-slate-300">
          <Image
            src="/images/hero/hero-img.jpg"
            alt="Hero Image"
            width={20}
            height={20}
            className="h-[50px] w-[50px] rounded-full object-cover object-center"
          />
          <h5>Hamzay Ayodokun</h5>
          <span className=" ml-4">August 20, 2022</span>
        </div>
        {/* <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3> */}
        {/* <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p> */}
      </div>
    </div>
  );
};

export default SingleFeature;
