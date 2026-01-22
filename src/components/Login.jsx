import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("udaykadi@gmail.com");
  const [password, setPassword] = useState("Uday@1234");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL +"/login", {
        emailId,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data || "Login failed. Please try again.");
    }
  }

  return (
    <div className="mt-32 flex items-center justify-center bg-base-100">
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-96 p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

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

      <p className="text-red-600 mt-2 font-medium text-[16px]">{errorMessage}</p>

        <button className="btn btn-neutral w-full mt-2 hover:bg-blue-950" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
