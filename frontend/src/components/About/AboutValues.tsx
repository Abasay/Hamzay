export default function CoreValues() {
  const values = [
    {
      title: "Transparency",
      description: "We provide unbiased reviews with complete transparency.",
    },
    {
      title: "Objectivity",
      description:
        "Our content is research-based and backed by data and user experience.",
    },
    {
      title: "Passion for Tech",
      description:
        "We are driven by our passion for technology and innovation.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Core Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 text-center shadow-md"
            >
              <h3 className="mb-4 text-2xl font-semibold">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
