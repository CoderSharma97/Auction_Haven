import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-5 lg:px-32 pt-20 bg-gray-100">
      <h1 className="text-custom-hover text-3xl font-bold text-center mb-6 md:text-5xl">
        Create Auction
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <form onSubmit={handleCreateAuction} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">Auction Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-gray-600">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
                placeholder="Enter auction title"
              />
            </div>
            <div>
              <label className="text-gray-600">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
                placeholder="Enter starting bid"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover] transition duration-150"
              rows={5}
              placeholder="Enter auction description"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-gray-600">Auction Starting Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
              />
            </div>
            <div>
              <label className="text-gray-600">Auction End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-custom-hover transition duration-150"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-600">Auction Item Image</label>
            <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="object-cover h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="font-semibold">Click to upload</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                )}
                <input type="file" className="hidden" onChange={imageHandler} />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-custom-primary hover:bg-custom-hover text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
