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
      {/* Nút mở sidebar nhỏ */}
      <button
        className="lg:hidden fixed top-16 left-5 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-50 shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
      </button>

      {/* Sidebar chính */}
      <div
        className={`h-full w-[75%] fixed left-0 top-0 pt-[70px] px-5 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"} 
        lg:translate-x-0 lg:inline sm:w-[25%] lg:z-auto 
        ${isDarkMode
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-b from-cyan-100 via-white to-white text-cyan-800"} backdrop-blur-md shadow-lg`}
      >
        {/* Nút đóng sidebar */}
        <button
          className="lg:hidden absolute top-14 right-3 text-red-500 hover:text-red-600 text-base"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaIcons.FaTimesCircle size={20}/>
        </button>

        {/* Tìm kiếm */}
        <div className="relative flex mt-3">
          <input
            className={`rounded-full w-full h-9 px-4 pr-10 text-sm focus:outline-none shadow-sm
              ${isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-cyan-800 border border-gray-200"}`}
            placeholder="Find friends..."
          />
          <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-cyan-600">
            <FaIcons.FaSearch />
          </button>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex items-center space-x-3 mt-6 mb-6 p-2 rounded-xl hover:bg-white/10 transition">
          <div className="relative w-10 h-10">
            <img src={Avata} alt="Avata" className="rounded-full w-full h-full object-cover border-2 border-cyan-300" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="text-sm font-semibold truncate">{user?.displayname}</div>
        </div>

        <hr className="border-gray-300 opacity-40 mb-4" />

        {/* Danh sách bạn bè */}
        <div className="space-y-3">
          {users
            .filter((connectedUser) => connectedUser.username !== user?.displayname)
            .map((connectedUser) => (
              <div
                key={connectedUser.id}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <div className="relative w-10 h-10">
                  <img src={Avata} alt="Avatar" className="rounded-full w-full h-full object-cover border-2 border-cyan-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-sm font-medium truncate">
                  {connectedUser.username}
                </div>
              </div>
            ))}
        </div>

        {/* Nút Meeting Room */}
        <button
          className="fixed bottom-5 left-5 flex items-center justify-center gap-2 w-[90%] lg:w-[87%] py-2 rounded-xl text-white text-sm font-medium
            bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 transition-all shadow-md"
          onClick={() => navigate(`/meeting?name=${encodeURIComponent(user?.displayname || "Guest")}`)}
        >
          <FaVideo className="text-lg" />
          Meeting Room
        </button>
      </div>
    </div>
  );
}
