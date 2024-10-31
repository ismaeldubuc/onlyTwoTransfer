import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

export const GuestHeader = () => {
  return (
    <div className="flex justify-between p-7 border-b-2">
      <div className="flex items-center gap-4">
        <Sidebar />
        <h1 className="text-4xl">Only Two Transfer</h1>
      </div>
      <div className="flex items-center gap-10">
        <Link to={"/signup"} className="p-3 bg-blue-300 rounded-xl hover:text-white hover:bg-black transtion-colors ease-in-out duration-200">
          Inscrivez vous
        </Link>
        <Link
          to={"/login"}
          className="p-3  rounded-xl border border-gray-500 hover:text-white hover:bg-black transition-colors ease-in-out duration-200"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
};
