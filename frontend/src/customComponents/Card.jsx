import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDollarSign, FaClock } from "react-icons/fa"; // Import the icons

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="flex-grow basis-full bg-white rounded-lg group sm:basis-80 lg:basis-72 2xl:basis-64 max-w-[350px] mx-auto shadow-md transition-shadow duration-300 hover:shadow-2xl"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full aspect-[8/4] m-auto md:p-4 rounded-t-lg"
      />
      <div className="px-6 pt-4 pb-4"> {/* Increased padding */}
        <h5 className="font-extrabold text-xl text-gray-900 group-hover:text-custom-primary mb-2 transition-colors duration-300">
          {title}
        </h5>
        {startingBid && (
          <p className="text-gray-700 font-semibold text-base tracking-wide mb-1 flex items-center">
            <FaDollarSign className="mr-1" /> {/* Dollar sign icon */}
            Starting Bid:{" "}
            <span className="text-custom-hover font-bold ml-1">
              {startingBid}
            </span>
          </p>
        )}
        <p className="text-gray-600 font-medium text-sm tracking-wide flex items-center">
          <FaClock className="mr-1" /> {/* Clock icon */}
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-custom-hover font-semibold ml-1">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-custom-hover font-semibold ml-1">
              Time's up!
            </span>
          )}
        </p>
      </div>
      {/* Decorative element */}
      <div className="h-1 bg-custom-hover rounded-b-lg mt-2 transition-all duration-300 group-hover:opacity-100 opacity-50"></div>
    </Link>
  );
};

export default Card;
