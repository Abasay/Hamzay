export default function ProductReviews() {
  const products = [
    {
      name: "Apple MacBook Pro",
      description: "High-performance laptop for professionals.",
      imageUrl: "/macbook.jpg",
      affiliateLink: "https://affiliate.com/macbook",
    },
    {
      name: "Sony WH-1000XM4",
      description: "Noise-cancelling wireless headphones.",
      imageUrl: "/sony-headphones.jpg",
      affiliateLink: "https://affiliate.com/sony-headphones",
    },
    {
      name: "Samsung Galaxy S24",
      description: "Next-gen smartphone with a powerful camera.",
      imageUrl: "/galaxy.jpg",
      affiliateLink: "https://affiliate.com/galaxy-s24",
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
      </div>
    </section>
  );
}
