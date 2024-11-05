import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "@/store/slices/userSlice";
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [razorpayAccountNumber, setRazorpayAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("razorpayAccountNumber", razorpayAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImage(file);
      setProfileImagePreview(reader.result);
    };
  };

  return (
    <section className="w-full px-4 py-20 flex flex-col min-h-screen items-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 flex flex-col items-center">
        <h1 className="text-custom-hover text-3xl font-bold mb-8">
          Register
        </h1>
        <form
          className="w-full space-y-6"
          onSubmit={handleRegister}
        >
          <p className="text-lg font-semibold text-gray-700">
            Personal Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Profile Image</label>
            <div className="flex items-center gap-4">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="profile preview"
                  className="w-16 h-16 rounded-full border"
                />
              ) : (
                <FaUserCircle size={64} color="#8abf8a" /> // Show the icon when no image is available
              )}
              <input type="file" onChange={imageHandler} />
            </div>
          </div>
          {role === "Auctioneer" && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                Payment Method Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
                >
                  <option value="">Select Your Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="PNB">PNB</option>
                  <option value="ICICI BANK">ICICI BANK</option>
                  <option value="Axis Bank">Axis Bank</option>
                </select>
                <input
                  type="text"
                  value={bankAccountNumber}
                  placeholder="IFSC"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
                />
                <input
                  type="text"
                  value={bankAccountName}
                  placeholder="Bank Account Username"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  value={razorpayAccountNumber}
                  placeholder="Razorpay Account Number"
                  onChange={(e) => setRazorpayAccountNumber(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
                />
                <input
                  type="email"
                  value={paypalEmail}
                  placeholder="Paypal Email"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custom-primary text-white py-3 rounded-lg hover:bg-custom-hover focus:outline-none"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
