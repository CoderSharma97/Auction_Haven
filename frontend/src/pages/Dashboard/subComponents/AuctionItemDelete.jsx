import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this auction item?")) {
      dispatch(deleteAuctionItem(id));
    }
  };

  return (
    <div className="overflow-x-auto mb-10 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Auction Items</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {allAuctions.length > 0 ? (
            allAuctions.map((element) => (
              <tr key={element._id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-2 px-4">
                  <img
                    src={element.image?.url}
                    alt={element.title}
                    className="h-16 w-16 object-cover rounded-md shadow-md"
                  />
                </td>
                <td className="py-2 px-4 font-medium">{element.title}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <Link
                    to={`/auction/details/${element._id}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    View
                  </Link>
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleAuctionDelete(element._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-left text-xl text-sky-600 py-3">
              <td colSpan="3" className="text-center">No Auctions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
