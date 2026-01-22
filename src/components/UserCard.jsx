import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFromFeed(userId));
//     } catch (err) {}
//   };

  return (
    <div className="card bg-base-100 w-full max-w-md shadow-md md:shadow-2xl border border-base-300 hover:shadow-xl transition-shadow duration-300">
      <figure className=" overflow-hidden">
        <img src={user.photoUrl} alt="photo" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-base-content">{firstName + " " + lastName}</h2>
        {(age || gender) && (
          <p className="text-base-content/80 font-medium">
            {age && gender 
              ? `Age: ${age}, Gender: ${gender}` 
              : age 
              ? `Age: ${age}` 
              : `Gender: ${gender}`}
          </p>
        )}
        <p className="text-base-content/60 text-sm leading-relaxed">{about}</p>
        <div className="card-actions justify-center gap-4 my-3">
          <button
            className="btn btn-outline btn-error flex-1 rounded-lg font-semibold"
            // onClick={() => handleSendRequest("ignored", _id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Ignore
          </button>
          <button
            className="btn btn-success flex-1 rounded-lg font-semibold"
            // onClick={() => handleSendRequest("interested", _id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;