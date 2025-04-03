import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Avata from "../../assets/avata.jpg";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { useTheme } from "../../config/theme";
import ListMenu from "../profile/listmenu";

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
          <button className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-105">
            <img src={Avata} alt="Avata" className="w-full h-full rounded-full object-cover" />
          </button>
          <div className="text-sm font-medium text-color2">Đỗ Ngọc Đạt</div>
        </div>
      </div>

      {/* right header */}
      <div className="h-full w-[30%] right-0 top-0 flex items-center justify-end mr-5 space-x-5">
        <div className="relative flex">
          <input
            className={`hidden lg:flex rounded-lg w-full bg-gray-300 h-[30px] border-none outline-none ${isDarkMode ? "text-gray-600" : "text-color1"
              } pr-10 pl-2`}
            placeholder="Search message"
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 right-3 hover:scale-105">
            <FaIcons.FaSearch className={`${isDarkMode ? "text-gray-800" : "text-cyan-800"}`} />
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

      {/* Modal */}
      {isModalOpen && (
        <div id="modal-overlay" onClick={handleCloseModal} className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white w-[400px] p-5 rounded shadow-lg relative">
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-gray-800" : "text-cyan-800"} items-center`}>Update Name</h2>

            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              onClick={() => setIsModalOpen(false)}
            >
              <FaIcons.FaTimesCircle></FaIcons.FaTimesCircle>
            </button>

            <input
              className={`border-none bg-gray-300 rounded-lg mb-8 w-full h-[40px] outline-none ${isDarkMode ? "text-gray-700" : "text-cyan-800"} pr-2 pl-2`}
              placeholder="Enter update name"
            />

            <button
              className="relative mt-2 flex cursor-pointer items-center justify-center w-full bg-green-700 text-white py-2 rounded-md border border-green-700 overflow-hidden transition-colors duration-300
            before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
            hover:text-green-700 hover:border-green-700"
            >
              <span className="relative z-10">Update</span>
            </button>

          </div>
        </div>
      )}

      {/* List menu */}
      <ListMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Header;