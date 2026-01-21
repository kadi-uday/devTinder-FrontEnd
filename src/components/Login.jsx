import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [emailId, setEmailId] = useState("udaykadi@gmail.com");
  const [password, setPassword] = useState("Uday@1234");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className=" flex items-center justify-center bg-base-100 mt-32">
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-96 p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">Login</legend>

        <label className="label font-medium">Email</label>
        <input
          type="email"
          value={emailId}
          className="input input-bordered w-full"
          placeholder="Enter your email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label font-medium mt-2">Password</label>
        <input
          type="password"
          value={password}
          className="input input-bordered w-full"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral w-full mt-6 hover:bg-blue-950" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
