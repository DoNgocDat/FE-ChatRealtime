import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Avata from "../../assets/avata.jpg";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../../config/theme";
import ListMenu from "../profile/listmenu";
import { motion } from "framer-motion";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* left header */}
      <div className="h-full w-[25%] hidden sm:flex left-0 top-0 ml-5 items-center justify-start">
        <img src={Logo} className="h-[40px] w-[40px]" alt="Logo" />
        <Link to={"/"} className="text-color2 text-lg font-bold">
          Smart Chat
        </Link>
      </div>


      {/* center header */}
      <div className="flex-grow h-full items-center justify-left flex gap-16">
        <div className="flex items-center space-x-3" onClick={() => setIsModalOpen(true)}>
          <button className="w-8 h-8 rounded-full object-cover border-2 border-cyan-300 hover:scale-105">
            <img src={Avata} alt="Avata" className="w-full h-full rounded-full object-cover" />
          </button>
          <div className="text-sm font-medium text-color2">Đỗ Ngọc Đạt</div>
        </div>
      </div>

      {/* right header */}
      <div className="h-full w-[30%] right-0 top-0 flex items-center justify-end mr-5 space-x-5">
        <div className="relative flex">
          <input
            className={`hidden lg:flex rounded-full w-full h-9 px-4 pr-10 text-sm focus:outline-none shadow-sm
              ${isDarkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-cyan-800 border border-gray-200"}`}
            placeholder="Find messages..."
          />
          <button className="hidden lg:flex absolute top-1/2 right-3 transform -translate-y-1/2 text-cyan-600">
            <FaIcons.FaSearch />
          </button>
        </div>

        <button onClick={toggleTheme} className="hover:scale-105">
          {isDarkMode ? <FaIcons.FaSun className="text-yellow-400" /> : <FaIcons.FaMoon className="text-color2" />}
        </button>

        <button className="hover:scale-105">
          <FaIcons.FaPhone title="Call" className="text-color2" />
        </button>

        <button className="hover:scale-105">
          <FaIcons.FaCamera title="Video Call" className="text-color2" />
        </button>

        <button className="hover:scale-105" onClick={() => setIsOpen(true)}>
          <FaIcons.FaList className="text-color2" />
        </button>
      </div>

      <hr className="absolute bottom-0 left-0 w-full border-t border-gray-500" />

      {isModalOpen && (
        <motion.div
          id="modal-overlay"
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className={`w-[400px] rounded-2xl p-6 relative shadow-lg transition-all duration-300
      ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-cyan-800 border border-cyan-400"}`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Update Name</h2>

            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <FaIcons.FaTimesCircle size={18} />
            </button>

            <input
              className={`w-full h-[42px] px-3 rounded-xl outline-none border
        ${isDarkMode
                  ? "bg-gray-800 text-white border-gray-700 focus:border-cyan-500"
                  : "bg-gray-100 text-cyan-800 border-cyan-300 focus:border-cyan-500"
                }`}
              placeholder="Enter new name"
            />

            <button
              className="mt-5 w-full py-2 rounded-xl bg-cyan-700 text-white font-medium transition-all duration-300 hover:bg-cyan-700 active:scale-95"
            >
              Update
            </button>
          </div>
        </motion.div>
      )}

      {/* List menu */}
      <ListMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Header;