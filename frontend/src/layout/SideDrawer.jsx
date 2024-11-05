import React, { useState } from "react";
import { RiAuctionFill, RiInstagramFill,RiAuctionLine  } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { BsTrophyFill } from "react-icons/bs";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill, BsFillEnvelopeFill } from "react-icons/bs";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUserCircle,
  FaFileInvoiceDollar,
  FaEye,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-custom-primary text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-full sm:w-[300px] bg-gradient-to-r from-[#f6f4f0] to-[#ffffff] h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-transform duration-300 p-6 flex flex-col justify-between lg:left-0 border-r border-gray-200 shadow-lg rounded-r-lg`}
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-3xl font-bold text-custom-primary mb-4">
              Auction<span className="text-custom-hover">Haven</span>
            </h4>
          </Link>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                to={"/auctions"}
                className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
              >
                <RiAuctionLine  className="text-2xl mr-2" /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
              >
                <BsTrophyFill className="text-2xl mr-2" /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
                  >
                    <FaFileInvoiceDollar className="text-2xl mr-2" /> Submit
                    Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
                  >
                    <IoIosCreate className="text-2xl mr-2" /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
                  >
                    <FaEye className="text-2xl mr-2" /> View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
                >
                  <MdDashboard className="text-2xl mr-2" /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Links */}
          <div className="my-4 flex gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to={"/sign-up"}
                  className="bg-custom-primary text-white font-semibold hover:bg-[#D6482B] text-lg py-2 px-4 rounded-md shadow transition duration-150"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-200 font-semibold text-lg py-2 px-4 rounded-md shadow transition duration-150"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-custom-primary text-white font-semibold hover:bg-[#D6482B] text-lg py-2 px-4 rounded-md shadow transition duration-150"
              >
                Logout
              </button>
            )}
          </div>

          <hr className="my-4 border-gray-300" />
          <ul className="flex flex-col gap-4">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
                >
                  <FaUserCircle className="text-2xl mr-2" /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
              >
                <SiGooglesearchconsole className="text-2xl mr-2" /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
              >
                <BsFillInfoSquareFill className="text-2xl mr-2" /> About Us
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150"
              >
                <BsFillEnvelopeFill className="text-2xl mr-2" /> Contact Us
              </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        {/* Redesigned Footer */}
        <div className="mt-auto">
          <div className="flex gap-4 items-center mb-4">
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-700 transition duration-150"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-pink-500 transition duration-150"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-600 transition duration-150"
            >
              <FaTwitter />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-800 transition duration-150"
            >
              <FaLinkedin />
            </Link>
          </div>
          <p className="text-stone-500">
            Designed By{" "}
            <Link
              to={"/"}
              className="font-semibold hover:text-custom-primary transition duration-150"
            >
              Himanshu Sharma
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
