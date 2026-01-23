import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      //handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex text-3xl font-medium justify-center my-10"> No Connections Found</h1>;

  return (
    <div className="min-h-screen bg-linear-to-b from-base-200 to-base-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
          Your Connections
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    alt={firstName}
                    className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                    src={photoUrl}
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title justify-center text-2xl font-bold">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-base-content/90 line-clamp-4">
                      {age && gender
                        ? `Age: ${age}, Gender: ${gender}`
                        : age
                          ? `Age: ${age}`
                          : `Gender: ${gender}`}
                    </p>
                  )}
                  <p className="text-base-content/80 line-clamp-3">{about}</p>
                  <div className="card-actions justify-center pt-4">
                    <Link to={"/chat/" + _id} className="w-full">
                      <button className="btn btn-primary w-full">
                        💬 Start Chat
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
