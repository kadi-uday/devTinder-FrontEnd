import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="min-h-screen bg-linear-to-br from-base-100 to-base-200 pt-20 pb-24 px-4">
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
