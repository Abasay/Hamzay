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
            Hamzat Quadri had undergone sound knowledge in the technological
            world both physical and online learning under the tutelage of
            'simplilearn'. He is certified to work in the IT world. A passionate
            blogger, bringing to your reach trending technological product
            reviews with ease.
          </p>
        </div>
      </div>
    </section>
  );
}
