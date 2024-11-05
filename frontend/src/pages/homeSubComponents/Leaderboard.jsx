import Spinner from "@/customComponents/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrophy, FaDollarSign, FaMedal } from "react-icons/fa";

const Leaderboard = () => {
  const { leaderboard, loading } = useSelector((state) => state.user);

  const getBadge = (index) => {
    if (index === 0)
      return (
        <FaTrophy className="text-yellow-500 text-2xl" title="1st Place" />
      );
    if (index === 1)
      return <FaMedal className="text-gray-400 text-2xl" title="2nd Place" />;
    if (index === 2)
      return <FaMedal className="text-orange-400 text-2xl" title="3rd Place" />;
    return (
      <span className="font-semibold text-xl text-gray-400">{index + 1}</span>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="my-8 lg:px-5">
          <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2 mb-5">
            <h3 className="text-[#111] text-xl font-semibold min-[480px]:text-xl md:text-2xl lg:text-3xl">
              Meet Our
            </h3>
            <h3 className="text-custom-hover text-xl font-semibold min-[480px]:text-xl md:text-2xl lg:text-3xl">
              Top 10 Bidders
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border my-5 border-gray-300 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-custom-primary text-white">
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">Profile</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left ">Expenditure</th>
                  <th className="py-3 px-4 text-left ">Auctions Won</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {leaderboard.slice(0, 10).map((element, index) => (
                  <tr
                    key={element._id}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      {getBadge(index)}
                    </td>
                    <td className="py-3 px-4">
                      <img
                        src={element.profileImage?.url}
                        alt={element.username}
                        className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-full border-2 border-custom-primary"
                        title={element.username}
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {element.userName}
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600 text-sm sm:text-base">
                      ${element.moneySpent.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-custom-primary text-sm sm:text-base">
                      {element.auctionsWon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to={"/leaderboard"}
            className="border-2 border-stone-200 font-bold text-xl w-full py-2 flex justify-center rounded-md hover:border-stone-500 transition-all duration-300 mt-4"
          >
            View Full Leaderboard
          </Link>
        </section>
      )}
    </>
  );
};

export default Leaderboard;
