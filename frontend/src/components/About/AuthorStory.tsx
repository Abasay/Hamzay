export default function AuthorStory() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        <img
          src="https://th.bing.com/th/id/OIP.hMUcV__Ixcd7YMIuDp6HJgHaEK?rs=1&pid=ImgDetMain"
          alt="Author"
          className="mb-6 h-48 w-48 rounded-full md:mb-0 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-3xl font-bold">Meet Hamzat Quadri</h2>
          <p className="  font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
            Hello! I’m John Doe, a tech enthusiast with a background in computer
            engineering and a passion for writing. I started Techie’s Blog to
            share my knowledge and provide insightful reviews of the latest
            technology and gadgets. With over 5 years of experience in the tech
            industry, my goal is to help readers stay informed and make smart
            choices when it comes to tech.
          </p>
        </div>
      </div>
    </section>
  );
}
