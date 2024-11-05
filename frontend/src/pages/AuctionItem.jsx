import Spinner from "@/customComponents/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { RiAuctionFill } from "react-icons/ri"; // Original icon, can keep if desired
import { MdAttachMoney } from "react-icons/md"; // New icon for placing bids
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [id, dispatch]);

  return (
    <section className="w-full min-h-screen bg-gray-100 px-5 pt-20 lg:pl-[320px] flex flex-col">
      <div className="flex items-center text-lg gap-2">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 text-gray-800 hover:text-custom-primary"
        >
          Home
        </Link>
        <FiChevronRight className="text-stone-400" />
        <Link
          to="/auctions"
          className="font-semibold transition-all duration-300 text-gray-800 hover:text-custom-primary"
        >
          Auctions
        </Link>
        <FiChevronRight className="text-stone-400" />
        <span className="text-stone-600">{auctionDetail.title}</span>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-6 flex-col lg:flex-row mt-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={auctionDetail.image?.url}
                alt={auctionDetail.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">{auctionDetail.title}</h3>
                <p className="text-lg">
                  Condition:{" "}
                  <span className="text-custom-hover">{auctionDetail.condition}</span>
                </p>
                <p className="text-lg font-bold">
                  Minimum Bid:{" "}
                  <span className="text-custom-hover">Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
              <h4 className="text-xl font-semibold">Auction Item Description</h4>
              <hr className="my-2 border-t border-gray-300" />
              <ul>
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-md my-2">
                      {element}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <header className="bg-stone-200 py-4 text-xl font-semibold text-center rounded-lg shadow-md">
              BIDS
            </header>
            <div className="bg-white p-4 min-h-fit lg:min-h-[650px] overflow-auto shadow-lg rounded-lg mt-2">
              {auctionBidders && new Date(auctionDetail.startTime) < Date.now() && new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div key={index} className="py-2 flex items-center justify-between border-b border-gray-200">
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full hidden md:block"
                        />
                        <p className="text-lg font-semibold">{element.userName}</p>
                      </div>
                      <p className={`text-xl font-semibold ${index === 0 ? "text-green-600" : index === 1 ? "text-blue-600" : index === 2 ? "text-yellow-600" : "text-gray-600"}`}>
                        {index + 1}
                        {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No bids for this auction</p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img src="/notStarted.png" alt="not-started" className="w-full max-h-[650px] object-contain" />
              ) : (
                <img src="/auctionEnded.png" alt="ended" className="w-full max-h-[650px] object-contain" />
              )}
            </div>

            {user.role === "Bidder" && (
              <div className="bg-gradient-to-r from-custom-primary to-custom-hover py-4 text-xl font-semibold text-white flex flex-col items-center justify-center rounded-lg shadow-lg mt-4">
                {Date.now() >= new Date(auctionDetail.startTime) && Date.now() <= new Date(auctionDetail.endTime) ? (
                  <div className="flex flex-col items-center w-full">
                    <label htmlFor="bidAmount" className="mb-2">Place Your Bid:</label>
                    <div className="flex items-center justify-center mb-4">
                      <input
                        type="number"
                        id="bidAmount"
                        className="w-48 p-3 rounded-md focus:outline-none border-2 border-gray-300 text-black"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={auctionDetail.startingBid}
                        placeholder={`Min: Rs.${auctionDetail.startingBid}`}
                      />
                      <button
                        className="ml-2 p-3 bg-black rounded-full transition-all duration-300 hover:bg-gray-800 flex items-center"
                        onClick={handleBid}
                      >
                        <MdAttachMoney className="mr-2" /> {/* Changed icon */}
                        Place Bid
                      </button>
                    </div>
                  </div>
                ) : new Date(auctionDetail.startTime) > Date.now() ? (
                  <p>Auction has not started yet!</p>
                ) : (
                  <p>Auction has ended!</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
