import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "@/customComponents/Spinner";
import FeaturedAuctions from "./homeSubComponents/FeaturedAuctions";
import Leaderboard from "./homeSubComponents/Leaderboard";
import UpcomingAuctions from "./homeSubComponents/UpcomingAuctions";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div>
          <p className="text-[#DECCBE] font-bold text-xl mb-8">
            Experience the Thrill of the Auction!
          </p>
          <h1
            className={`text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Clear Bids,
          </h1>
          <h1
            className={`text-custom-primary text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Clear Wins!
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-custom-primary font-semibold hover:bg-custom-hover rounded-md px-8 flex items-center py-2 text-white  transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-custom-hover bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-custom-hover font-bold text-xl  rounded-md px-8 flex items-center py-2 transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Four Easy Steps to Winning!
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => {
              return (
                <div
                  key={element.title}
                  className="bg-white flex flex-col gap-2 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300  select-none" // Increased padding and added shadow, added 'select-none' for unselectable text
                >
                  <h5 className="font-bold text-lg text-gray-800 hover:text-custom-primary transition-colors duration-300">
                    {" "}
                    {/* Increased font size and added hover color change */}
                    {element.title}
                  </h5>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {" "}
                    {/* Adjusted color and added line-clamp for limiting visible lines */}
                    {element.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;
