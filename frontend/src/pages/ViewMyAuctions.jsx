import CardTwo from "@/customComponents/CardTwo";
import Spinner from "@/customComponents/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    } else {
      dispatch(getMyAuctionItems());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="flex flex-col items-center w-full h-full px-5 pt-20 lg:pl-[320px] bg-gray-100">
      <h1 className="text-custom-hover text-3xl md:text-5xl font-bold mb-5 text-center">
        My Auctions
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className={`flex flex-wrap justify-center gap-6 mb-10`}>
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                key={element._id}
                title={element.title}
                startingBid={element.startingBid}
                endTime={element.endTime}
                startTime={element.startTime}
                imgSrc={element.image?.url}
                id={element._id}
              />
            ))
          ) : (
            <h3 className="text-gray-600 text-lg md:text-xl lg:text-2xl font-semibold text-center mt-5">
              You have not posted any auctions.
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
