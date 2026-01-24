import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { removeRequest } from '../utils/requestSlice'

const Requests = () => {
  
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true});
      dispatch(addRequest(res.data.data));
    }catch (err) {
      //logic error
    }
  }

  useEffect( () => {
    fetchRequests();
  }, []);

    if (!requests) return;

  if (requests.length === 0) return <h1 className="flex  text-3xl font-medium justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="min-h-screen bg-linear-to-b from-base-200 to-base-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
          Requests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
              request.fromUserId;

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
                    <p className="text-base-content/75 font-medium">
                      {age && gender
                        ? `Age: ${age}, Gender: ${gender}`
                        : age
                          ? `Age: ${age}`
                          : `Gender: ${gender}`}
                    </p>
                  )}
                  <p className="text-base-content/80 line-clamp-3">{about}</p>
                  {skills && skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-base-content/75 font-medium mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {skills.map((skill, index) => (
                          <span key={index} className="badge badge-primary badge-outline badge-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className='flex gap-4 justify-center pt-4'>
                    <button className='btn btn-success btn-outline btn-lg' onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                    <button className='btn btn-error btn-outline btn-lg' onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Requests