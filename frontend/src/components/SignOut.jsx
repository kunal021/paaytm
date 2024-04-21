import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignOut() {
  const { logout, isAuthenticated } = useAuth();
  const handleLogOut = () => {
    localStorage.removeItem("paytmtoken");
    localStorage.removeItem("signedin");
    logout();
  };
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <div>
      <button
        onClick={handleLogOut}
        className="flex justify-center items-center p-2 m-4 rounded-lg border-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white text-base font-bold transition-all duration-300"
      >
        LOG OUT
      </button>
    </div>
  );
}

export default SignOut;
