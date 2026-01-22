import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex justify-center flex-1">
          <div className="card bg-base-100 w-full shadow-md md:shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold justify-center text-base-content mb-6">Edit Profile</h2>
              <div className="flex flex-col gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full focus:input-primary focus:outline-0"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full focus:input-primary focus:outline-0"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full focus:input-primary focus:outline-0"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full focus:input-primary focus:outline-0"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">Gender</span>
                    </div>
                    <div className="dropdown dropdown-end w-full">
                      <select
                        value={gender}
                        className="select select-bordered w-full focus:select-primary focus:outline-0"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </label>
                </div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">About</span>
                  </div>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered w-full focus:textarea-primary focus:outline-0 resize-none"
                    rows="4"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              {error && (
                <div className="alert alert-error mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-8l2 2m0 0l2 2m-2-2l-2 2m2-2l2-2" /></svg>
                  <span>{error}</span>
                </div>
              )}
              <div className="card-actions justify-center gap-4 mt-8">
                <button className="btn btn-primary btn-lg flex-1 rounded-lg font-semibold" onClick={saveProfile}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-1 items-start pt-0">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;