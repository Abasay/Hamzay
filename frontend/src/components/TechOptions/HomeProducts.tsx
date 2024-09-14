export default function ProductReviews() {
  const products = [
    {
      name: "Apple MacBook Pro",
      description: "High-performance laptop for professionals.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.tqR7GXnTrABvILUwwufQjQHaFf?rs=1&pid=ImgDetMain",
      affiliateLink:
        "https://th.bing.com/th/id/OIP.tqR7GXnTrABvILUwwufQjQHaFf?rs=1&pid=ImgDetMain",
    },
    {
      name: "Sony WH-1000XM4",
      description: "Noise-cancelling wireless headphones.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.Lz8v44GOE5YO5J-njdvwgAHaHa?rs=1&pid=ImgDetMain",
      affiliateLink:
        "https://th.bing.com/th/id/OIP.Lz8v44GOE5YO5J-njdvwgAHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Samsung Galaxy S24",
      description: "Next-gen smartphone with a powerful camera.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain",
      affiliateLink:
        "https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Top Tech Products
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-4 text-2xl font-semibold">{product.name}</h3>
                <p className="mb-4 text-gray-600">{product.description}</p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Buy Now
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="btn bg-zinc-400 text-base font-light text-slate-800">
            See More Products
          </button>
        </div>
      </div>
    </section>
  );
}
