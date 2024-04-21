/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import User from "./User";

function Users() {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("");

  const signedin = localStorage.getItem("signedin");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        "http://localhost:3500/api/v1/users/filter?filter=" + filter
      );
      const data = res.data.user;
      setUser(data);
    };

    getUser();
  }, [filter]);

  return (
    <div className="m-6">
      <div className="m-2">
        <input
          placeholder="Search Users"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          className="w-full text-base px-4 py-2 rounded-lg border-2 border-gray-500 outline-blue-500"
        />
      </div>
      <div>
        {user.length > 0 ? (
          user
            .filter((user) => user._id !== signedin)
            .map((user, i) => <User key={i} user={user} />)
        ) : (
          <p className="text-center m-10 text-xl font-bold">User Not Found</p>
        )}
      </div>
    </div>
  );
}

export default Users;
