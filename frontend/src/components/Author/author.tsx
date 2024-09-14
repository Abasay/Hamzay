export default function AuthorBio() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        <img
          src="https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain"
          alt="Author"
          className="mb-8 h-48 w-48 rounded-full object-cover md:mb-0"
        />
        <div className="text-center md:ml-8 md:text-left">
          <h2 className="mb-4 text-3xl font-bold">Meet the Author</h2>
          <p className="text-lg text-gray-700">
            Hello, I’m John Doe, a tech enthusiast and blogger with a passion
            for writing about the latest gadgets, software, and trends in the
            tech industry.
          </p>
        </div>
      </div>
    </section>
  );
}
