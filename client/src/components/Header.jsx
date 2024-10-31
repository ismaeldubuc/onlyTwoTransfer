import { FaCircleUser } from "react-icons/fa6";
import Sidebar from "./SideBar";

export const Header = () => {
  return (
    <div className="flex justify-between p-7 border-b-2">
      <div className="flex items-center gap-4">
        <Sidebar />
        <h1 className="text-4xl">Only Two Transfer</h1>
      </div>
      <div className="flex items-center gap-10">
        <h1 className="text-xl">John Doe</h1>
        <FaCircleUser className="text-4xl" />
      </div>
    </div>
  );
};
