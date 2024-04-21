/* eslint-disable react/prop-types */
import Balance from "./Balance";
import Navabar from "./Navabar";
import Users from "./Users";

function DashBoard() {
  // console.log("redirected to dashboard");
  return (
    <div>
      <Navabar />
      <Balance />
      <Users />
    </div>
  );
}

export default DashBoard;
