/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center p-2 m-4 rounded-lg border-2 border-transparent bg-black hover:bg-gray-900 text-white text-base font-semibold">
        <button
          onClick={() =>
            navigate(`/send?id=${user._id}&firstname=${user.firstName}`)
          }
        >
          Send Money
        </button>
      </div>
    </div>
  );
}

export default User;
