import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState(null);
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h3 className="text-custom-hover text-2xl font-semibold text-center mb-6">
          Upload Payment Proof
        </h3>
        <form onSubmit={handlePaymentProof} className="flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Payment Proof (Screenshot)</label>
            <input
              type="file"
              onChange={proofHandler}
              accept="image/*"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-hover"
            />
          </div>
          <button
            className={`bg-custom-primary text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-custom-hover flex items-center justify-center ${
              loading && "opacity-75 cursor-not-allowed"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
