import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
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

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="basis-full max-w-sm bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 p-4">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h5 className="font-semibold text-xl text-custom-hover mb-1">{title}</h5>
        {startingBid && (
          <p className="text-gray-600 mb-2">
            Starting Bid:{" "}
            <span className="text-[#fdba88] font-semibold">{startingBid}</span>
          </p>
        )}
        <p className="text-gray-700 mb-4">
          {timeLeft.type}{" "}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-[#fdba88] font-semibold">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-red-500 font-semibold">Time's up!</span>
          )}
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <Link
            className="bg-stone-700 text-center text-white text-lg py-2 rounded-md transition-all duration-300 hover:bg-black"
            to={`/auction/details/${id}`}
          >
            View Auction
          </Link>
          <button
            className="bg-custom-hover text-center text-white text-lg py-2 rounded-md transition-all duration-300 hover:bg-red-600"
            onClick={handleDeleteAuction}
          >
            Delete Auction
          </button>
          <button
            onClick={() => setOpenDrawer(true)}
            className="bg-sky-500 text-center text-white text-lg py-2 rounded-md transition-all duration-300 hover:bg-sky-700"
          >
            Republish Auction
          </button>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector(state => state.auction);
  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${openDrawer && id ? "bottom-0" : "-bottom-full"} left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end`}
    >
      <div className="bg-white h-fit transition-all duration-300 w-full p-5">
        <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-2">
          Republish Auction
        </h3>
        <p className="text-stone-600 text-center mb-4">
          Let's republish the auction with the same details but new starting and ending times.
        </p>
        <form className="flex flex-col gap-5 my-5">
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600">Republish Auction Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[16px] text-stone-600">Republish Auction End Time</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
            />
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-lg transition-all duration-300 hover:bg-blue-700"
              onClick={handleRepublishAuction}
            >
              {loading ? "Republishing" : "Republish"}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-lg transition-all duration-300 hover:bg-yellow-700"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
