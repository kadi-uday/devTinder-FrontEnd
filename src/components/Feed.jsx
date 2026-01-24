import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      //error message
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1 className="flex  text-3xl font-medium justify-center my-10">
        No more users to show
      </h1>
    );

  return (
    feed && (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-base-100 to-base-200 pt-14 pb-28 px-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
