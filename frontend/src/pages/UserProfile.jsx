import Spinner from "@/customComponents/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const renderInputField = (label, value) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary transition-all"
        disabled
      />
    </div>
  );

  return (
    <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white mx-auto w-full h-auto px-4 py-6 rounded-md shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profileImage?.url || "/imageHolder.jpg"}
              alt="User Profile"
              className="w-36 h-36 rounded-full shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold">{user.userName}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInputField("Username", user.userName)}
              {renderInputField("Email", user.email)}
              {renderInputField("Phone", user.phone)}
              {renderInputField("Address", user.address)}
              {renderInputField("Role", user.role)}
              {renderInputField("Joined On", user.createdAt?.substring(0, 10))}
            </div>
          </div>

          {user.role === "Auctioneer" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField("Bank Name", user.paymentMethods.bankTransfer.bankName)}
                {renderInputField("Bank Account (IBAN)", user.paymentMethods.bankTransfer.bankAccountNumber)}
                {renderInputField("User Name On Bank Account", user.paymentMethods.bankTransfer.bankAccountName)}
                {renderInputField("Razorpay Account Number", user.paymentMethods.razorpay.razorpayAccountNumber)}
                {renderInputField("Paypal Email", user.paymentMethods.paypal.paypalEmail)}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Other User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                renderInputField("Unpaid Commissions", user.unpaidCommission)
              )}
              {user.role === "Bidder" && (
                <>
                  {renderInputField("Auctions Won", user.auctionsWon)}
                  {renderInputField("Money Spent", user.moneySpent)}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
