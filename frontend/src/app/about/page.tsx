import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import CoreValues from "@/components/About/AboutValues";
import AboutWebsite from "@/components/About/AboutWebsite";
import AuthorStory from "@/components/About/AuthorStory";
import CallToAction from "@/components/About/CallToAction";
import ContactSection from "@/components/About/ContactUs";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is About Page",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="About Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      /> */}
      {/* <AboutSectionOne />
      <AboutSectionTwo /> */}
      <AboutWebsite />
      <AuthorStory />
      <CoreValues />
      <CallToAction />
      <ContactSection />
    </>
  );
};

export default AboutPage;
