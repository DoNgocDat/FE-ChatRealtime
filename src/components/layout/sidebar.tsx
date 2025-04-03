import * as FaIcons from "react-icons/fa";
import Avata from "../../assets/avata.jpg";
import { useTheme } from "../../config/theme";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  user: { displayname: string } | null;
  users: { id: string; username: string }[];
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, user, users }: SidebarProps) {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      {/* Nút mở sidebar trên màn hình nhỏ */}
      <button
        className="lg:hidden fixed top-16 left-5 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`lg:shadow-[0_0px_15px_0_rgba(59,130,246,0.5)] h-full w-[75%] fixed left-0 top-0 pt-[70px] pl-5 pr-5 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0 z-50 shadow-[0_0px_15px_0_rgba(59,130,246,0.5)]" : "-translate-x-full"} lg:translate-x-0 lg:inline sm:w-[25%] lg:z-auto
        ${isDarkMode ? "bg-gray-800 text-white" : "text-cyan-800 bg-gray-200"}`}
      >
        {/* Nút đóng sidebar */}
        <button
          className="lg:hidden absolute top-14 right-2 text-red-500 hover:text-red-600 text-sm"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaIcons.FaTimesCircle />
        </button>

        {/* Ô tìm kiếm */}
        <div className="relative flex">
          <input
            className={`rounded-lg w-full bg-gray-300 h-[30px] border-none outline-none ${isDarkMode ? "text-gray-600" : "text-cyan-800"
              } pr-10 pl-2`}
            placeholder="Search for friends"
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 right-0 h-full w-[10%]">
            <FaIcons.FaSearch className={`${isDarkMode ? "text-gray-700" : "text-cyan-800"}`} />
          </button>
        </div>

        {/* Thông tin người dùng */}
        <div className={`flex items-center space-x-3 mt-5 mb-5 ${isDarkMode ? "hover:bg-gray-400" : "hover:bg-gray-300"} rounded-lg p-1`}>
          <button className="relative max-w-10 max-h-10 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform ">
            <img src={Avata} alt="Avata" className="w-full h-full rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="text-sm font-medium truncate">{user?.displayname}</div>
        </div>

        <hr className="bottom-0 left-0 w-full border-t border-gray-300" />

        {/* Danh sách bạn bè */}
        <div className="mt-5">
          {users
            .filter((connectedUser) => connectedUser.username !== user?.displayname)
            .map((connectedUser) => (
              <div
                key={connectedUser.id}
                className={`flex items-center space-x-3 mb-5 ${isDarkMode ? "hover:bg-gray-400" : "hover:bg-gray-300"} rounded-lg p-1`}
              >
                <button className="relative max-w-10 max-h-10 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform">
                  <img src={Avata} alt="Avata" className="w-full h-full rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </button>
                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-cyan-800"} truncate`}>
                  {connectedUser.username}
                </div>
              </div>
            ))}
        </div>
        {/* Nút Meeting Room cố định */}
        <button
          className={`fixed bottom-5 left-5 flex items-center justify-center gap-2 w-[90%] lg:w-[87%] py-2 rounded-lg text-white text-sm font-medium transition-all duration-300
            ${isDarkMode ? "bg-cyan-800 hover:bg-cyan-900" : "bg-cyan-800 hover:bg-cyan-900"}`}
          onClick={() => navigate(`/meeting?name=${encodeURIComponent(user?.displayname || "Guest")}`)}
        >
          <FaVideo className="text-lg" />
          Meeting Room
        </button>

      </div>
    </div>
  );
}
