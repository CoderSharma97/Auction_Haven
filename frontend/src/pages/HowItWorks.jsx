import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Sign up or log in to access features such as posting auctions, bidding on items, managing your dashboard, and submitting payment confirmations.",
    },
    {
      icon: <FaGavel />,
      title: "Choose Your Role",
      description:
        'Register as a "Bidder" to participate in auctions, or as an "Auctioneer" to post items for bidding.',
    },
    {
      icon: <FaEnvelope />,
      title: "Bid Win Notification",
      description:
        "When you win an item, you’ll receive an email with payment details to complete your purchase securely.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Policy",
      description:
        "Auctioneers pay a 5% commission on payments received. Non-compliance restricts new listings, and reminders are sent for unpaid dues.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Payment Proof Submission",
      description:
        "Upload payment proof for verification. Once approved, your account balance and commission details will be updated accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Repost Unpaid Items",
      description:
        "If a buyer fails to pay, repost the item without additional charges to find a new bidder.",
    },
  ];

  return (
    <section className="w-full h-full px-5 pt-20 lg:pl-[320px] flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-200">
      <h1 className="text-custom-hover text-3xl font-bold mb-6 md:text-5xl xl:text-6xl">
        Discover How AuctionHaven Works
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {steps.map((element, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 flex items-start gap-4 group"
          >
            <div className="bg-black text-white p-4 text-2xl rounded-full group-hover:bg-custom-hover transition-colors duration-300">
              {element.icon}
            </div>
            <div>
              <h3 className="text-custom-hover text-xl font-semibold mb-2 md:text-2xl">
                {element.title}
              </h3>
              <p className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                {element.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
