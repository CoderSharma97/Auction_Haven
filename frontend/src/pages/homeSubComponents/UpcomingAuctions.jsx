import Spinner from "@/customComponents/Spinner";
import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="my-8 ">
          <h3 className="text-[#111] text-2xl font-semibold mb-2 min-[480px]:text-2xl md:text-3xl lg:text-4xl">
            What’s Coming Up Next?
          </h3>
          <div className="flex flex-wrap gap-6 ">
            <div className="bg-[#161613] w-full p-2 gap-10 rounded-md flex flex-col justify-between lg:flex-1 lg:h-auto lg:p-6 2xl:flex-none 2xl:basis-64 2xl:flex-grow 2xl:px-2 2xl:py-6 shadow-md transition-transform transform hover:scale-105">
              <span className="rounded-full bg-[#fdba88] text-white w-fit p-3">
                <RiAuctionFill />
              </span>
              <div>
                <h3 className="text-[#fdba88] text-2xl font-semibold mb-2 min-[480px]:text-2xl md:text-3xl lg:text-4xl">
                  What’s Coming Up Next?
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
              {auctionsStartingToday.slice(0, 2).map((element) => {
                return (
                  <Link
                    to={`/auction/item/${element._id}`}
                    key={element._id}
                    className="w-full flex flex-col gap-4 bg-white p-4 rounded-md shadow-md transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={element.image?.url}
                        alt={element.title}
                        className="w-16 h-16 2xl:w-10 2xl:h-10"
                      />
                      <p className="font-bold text-[#111] text-lg">
                        {element.title}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-stone-600 font-semibold">
                        Starting Bid:
                      </p>{" "}
                      <p className="text-[#fdba88 font-semibold]">
                        <span className="mr-1">$</span>
                        {element.startingBid}
                      </p>{" "}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-stone-600 font-bold">Starting Time:</p>
                      <p className="text-black text-[12px]">
                        {element.startTime}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
              {auctionsStartingToday.slice(2, 4).map((element) => {
                return (
                  <Link
                    to={`/auction/item/${element._id}`}
                    key={element._id}
                    className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={element.image?.url}
                        alt={element.title}
                        className="w-16 h-16 2xl:w-10 2xl:h-10"
                      />
                      <p className="font-bold text-[#111] text-lg">
                        {element.title}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-stone-600 font-semibold">
                        Starting Bid:
                      </p>{" "}
                      <p className="text-[#fdba88 font-semibold]">
                        <span className="mr-1">$</span>
                        {element.startingBid}
                      </p>{" "}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-stone-600 font-bold">Starting Time:</p>
                      <p className="text-black text-[12px]">
                        {element.startTime}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
              {auctionsStartingToday.slice(4, 6).map((element) => {
                return (
                  <Link
                    to={`/auction/item/${element._id}`}
                    key={element._id}
                    className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={element.image?.url}
                        alt={element.title}
                        className="w-16 h-16 2xl:w-10 2xl:h-10"
                      />
                      <p className="font-bold text-[#111] text-lg">
                        {element.title}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-stone-600 font-semibold">
                        Starting Bid:
                      </p>{" "}
                      <p className="text-[#fdba88 font-semibold]">
                        <span className="mr-1">$</span>
                        {element.startingBid}
                      </p>{" "}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-stone-600 font-bold">Starting Time:</p>
                      <p className="text-black text-[12px]">
                        {element.startTime}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpcomingAuctions;
