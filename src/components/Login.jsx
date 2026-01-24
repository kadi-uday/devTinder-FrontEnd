import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-96 p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label font-medium text-[16px]">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label font-medium mt-2 text-[16px]">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label font-medium text-[16px]">Email</label>
        <input
          type="email"
          value={emailId}
          className="input input-bordered w-full"
          placeholder="Enter your email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label font-medium mt-2 text-[16px]">Password</label>
        <input
          type="password"
          value={password}
          className="input input-bordered w-full"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-600 mt-2 font-medium text-[16px]">
          {errorMessage}
        </p>

        <button
          className="btn btn-neutral w-full mt-2 hover:bg-blue-950"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="m-auto cursor-pointer py-2 text-base-600 hover:underline hover:text-blue-600 font-medium text-[16px]"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
