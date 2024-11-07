"use client";
import toast from "react-hot-toast";
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        },
      );

      if (!response.ok) {
        toast.error("An error occurred, please try again later.");
        return;
      }

      const data = await response.json();
      toast.success("Message sent successfully. We will get back to you soon.");
      console.log("Success:", data);
      // Optionally reset the form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // console.error("Error:", error);
      toast.error("An error occurred, please try again later.");
    }
  };
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="shadow-three mb-12 rounded-sm bg-white px-8 py-11 dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
          "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need to reach out to us? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                We will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke dark:shadow-two w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="shadow-submit dark:shadow-submit-dark btn rounded-sm border bg-primary text-base font-medium text-white duration-300 hover:bg-transparent  hover:text-zinc-900">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
