import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="bg-gray-100 py-16 text-base">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
        <p className="mb-6 text-lg">
          We’d love to hear from you! Connect with us on social media or send us
          an email.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="mailto:contact@techiesblog.com"
            className="rounded-lg bg-blue-500 px-6 py-2"
          >
            Email Us
          </Link>
          <a
            href="https://twitter.com/techiesblog"
            className="rounded-lg border border-white bg-transparent px-6 py-2"
          >
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
