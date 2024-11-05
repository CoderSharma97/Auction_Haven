import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, navigateTo]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-white w-full max-w-xl p-12 rounded-lg shadow-lg">
        <h1 className="text-custom-hover text-4xl font-semibold mb-8 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col space-y-8">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-gray-600 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg py-3 border-b-2 border-gray-300 focus:border-custom-primary transition duration-200 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg text-gray-600 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-lg py-3 border-b-2 border-gray-300 focus:border-custom-primary transition duration-200 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="bg-custom-primary text-white text-xl font-semibold py-3 rounded-lg transition-transform duration-300 hover:bg-custom-hover"
            type="submit"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-6 text-lg text-gray-600">
          Don't have an account? <a href="/register" className="text-custom-primary font-semibold">Sign Up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
