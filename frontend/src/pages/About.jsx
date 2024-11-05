import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We uphold honesty and transparency, ensuring a trustworthy and fair auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "Our platform embraces the latest technology, delivering a smooth, engaging, and effective auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We nurture a lively community where buyers and sellers can discover and share exceptional finds.",
    },
    {
      id: 4,
      title: "Customer Commitment",
      description:
        "Dedicated to your satisfaction, our support team is here to guide you every step of the way.",
    },
  ];

  return (
    <section className="w-full px-6 pt-20 lg:pl-[320px] flex flex-col min-h-screen justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto space-y-12">
        <header>
          <h1 className="text-custom-hover text-4xl font-extrabold mb-4 md:text-6xl">
            About Us
          </h1>
          <p className="text-lg text-gray-700 md:text-xl">
            Welcome to AuctionHaven, your trusted destination for thrilling
            online auctions. Established in 2024, we’re passionate about
            providing a reliable, user-friendly space where buyers and sellers
            connect, explore, and exchange securely.
          </p>
        </header>

        <section>
          <h2 className="text-gray-800 text-3xl font-semibold mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            At AuctionHaven, our mission is to reshape how people buy and sell
            online by building a dynamic marketplace that invites users to
            discover unique items, make informed choices, and enjoy the thrill
            of competitive bidding.
          </p>
        </section>

        <section>
          <h2 className="text-gray-800 text-3xl font-semibold mb-4">
            Our Values
          </h2>
          <ul className="space-y-6">
            {values.map((element) => (
              <li
                key={element.id}
                className="text-lg text-gray-700 flex items-start gap-2"
              >
                <span className="text-custom-hover font-bold">
                  {element.title}:
                </span>
                <span>{element.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-gray-800 text-3xl font-semibold mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-700">
            Founded by Himanshu Sharma, AuctionHaven was born from a passion for
            connecting people with one-of-a-kind items. With a deep background
            in the auction industry, our team is committed to crafting a
            platform that provides a world-class experience for auction
            enthusiasts everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-gray-800 text-3xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg text-gray-700">
            Whether you're here to buy, sell, or simply explore, AuctionHaven
            invites you to become part of our vibrant community. Uncover hidden
            treasures, discover new opportunities, and embrace the thrill of
            winning your next great find.
          </p>
        </section>

        <footer className="text-center">
          <p className="text-custom-hover text-2xl font-bold">
            Thank you for choosing AuctionHaven. We’re thrilled to be part of
            your auction journey!
          </p>
        </footer>
      </div>
    </section>
  );
};

export default About;
