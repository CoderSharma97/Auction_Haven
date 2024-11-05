import Spinner from "@/customcomponents/Spinner";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { FaDollarSign, FaTrophy } from "react-icons/fa";

const LeaderboardRow = memo(({ element, index }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="py-4 px-2 sm:px-4 font-semibold text-gray-500">{index + 1}</td>
      <td className="py-4 px-2 sm:px-4">
        <img
          src={element.profileImage?.url || "/default-avatar.png"}
          alt={element.userName}
          className="h-16 w-16 object-cover rounded-full"
        />
      </td>
      <td className="py-4 px-2 sm:px-4 font-medium">{element.userName}</td>
      <td className="py-4 px-2 sm:px-4 hidden md:table-cell">
        <FaDollarSign className="text-custom-primary mr-2 inline" />
        <span>{element.moneySpent.toLocaleString()}</span>
      </td>
      <td className="py-4 px-2 sm:px-4 hidden md:table-cell">
        <FaTrophy className="text-yellow-500 mr-2 inline" />
        <span>{element.auctionsWon}</span>
      </td>
      <td className="py-4 px-2 sm:px-4 md:hidden flex flex-col">
        <div className="flex items-center">
          <FaDollarSign className="text-custom-primary mr-2" />
          <span>{element.moneySpent.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <FaTrophy className="text-yellow-500 mr-2" />
          <span>{element.auctionsWon}</span>
        </div>
      </td>
    </tr>
  );
});

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 pt-20 lg:pl-[320px] flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 mb-10">
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <header className="mb-10 text-center">
            <h1 className="text-custom-hover text-4xl font-extrabold md:text-5xl lg:text-6xl xl:text-7xl">
              Bidders Leaderboard
            </h1>
          </header>

          <div className="overflow-x-auto w-full mx-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-custom-hover text-white">
                <tr>
                  <th className="py-4 px-2 sm:px-4 text-left text-base font-semibold uppercase">Rank</th>
                  <th className="py-4 px-2 sm:px-4 text-left text-base font-semibold uppercase">Profile</th>
                  <th className="py-4 px-2 sm:px-4 text-left text-base font-semibold uppercase">Username</th>
                  <th className="py-4 px-2 sm:px-4 hidden md:table-cell text-left text-base font-semibold uppercase">
                    <FaDollarSign className="inline mr-1" /> Bid Expenditure
                  </th>
                  <th className="py-4 px-2 sm:px-4 hidden md:table-cell text-left text-base font-semibold uppercase">
                    <FaTrophy className="inline mr-1" /> Auctions Won
                  </th>
                  <th className="py-4 px-2 sm:px-4 md:hidden">
                    <div className="flex items-center">
                      <FaDollarSign className="inline mr-1" /> Bid Expenditure
                    </div>
                    <div className="flex items-center">
                      <FaTrophy className="inline mr-1" /> Auctions Won
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {leaderboard.slice(0, 100).map((element, index) => (
                  <LeaderboardRow key={element._id} element={element} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
