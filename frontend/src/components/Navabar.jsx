import { useState, useEffect } from "react";
import axios from "axios";
import SignOut from "./SignOut";

function Navabar() {
  const [userData, setUserData] = useState([]);
  const id = localStorage.getItem("signedin");

  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(
        `http://localhost:3500/api/v1/users/user/${id}`
      );

      // console.log(res.data);
      setUserData(res.data.result);
    };
    getuser();
  }, [id]);
  return (
    <>
      <div className="flex justify-between items-center shadow-lg px-6">
        <h1 className="text-xl font-bold">
          Hello, <span>{userData.firstName}</span>
        </h1>
        <SignOut />
      </div>
    </>
  );
}

export default Navabar;
