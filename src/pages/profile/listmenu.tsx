import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useState, lazy, Suspense } from "react";
import { useTheme } from "../../config/theme";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Định nghĩa kiểu cho ListMenuProps
interface ListMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

// Định nghĩa kiểu cho từng item trong menu, có thể có hoặc không có `link` và `action`
type MenuItem = {
    id: string;
    label: string;
    icon: React.ReactElement;
    component?: React.LazyExoticComponent<() => JSX.Element | null>;
    link?: string;
    action?: () => void;
};

const ListMenu = ({ isOpen, onClose }: ListMenuProps) => {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        navigate("/login"); // Chuyển hướng đến trang login
    };

    // Cập nhật kiểu của menuItems với MenuItem
    const menuItems: MenuItem[] = [
        { id: "profile", label: "Profile Information", icon: <FaIcons.FaUser />, component: lazy(() => import("./profile")) },
        { id: "account", label: "Account Information", icon: <FaIcons.FaRegUser />, component: lazy(() => import("./account")) },
        { id: "settings", label: "Settings", icon: <FaIcons.FaCog />, component: lazy(() => import("./settings")) },
        { id: "logout", label: "Log out", icon: <FaIcons.FaSignOutAlt />, action: handleLogout },
    ];

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "menu-overlay") {
            onClose();
        }
    };

    return (
        <motion.div
            id="menu-overlay"
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div
                className={`w-[90%] md:w-[600px] h-[500px] flex rounded-2xl overflow-hidden shadow-xl
                    ${isDarkMode ? "bg-gray-800 text-white border border-cyan-600" : "bg-white text-cyan-800 border border-cyan-300"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Menu */}
                <ul className={` space-y-5 w-20 md:w-64 flex flex-col items-center md:items-start py-4 px-2 ${isDarkMode ? "bg-gray-700" : "bg-cyan-50"} transition-all`}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`w-full flex flex-col md:flex-row items-center md:justify-start gap-2 md:gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all
                                hover:bg-cyan-100 hover:text-cyan-900
                                ${selectedItem?.id === item.id ? "bg-cyan-600 text-white" : ""}`}
                            onClick={() => {
                                if (item.action) {
                                    item.action();
                                } else {
                                    setSelectedItem(item);
                                }
                            }}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="hidden md:inline text-base font-medium">
                                {item.link ? <Link to={item.link}>{item.label}</Link> : item.label}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Right Content Area */}
                <div className={`flex-1 h-full p-6 relative
                    ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-cyan-800"}`}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-colors"
                        onClick={onClose}
                    >
                        <FaIcons.FaTimesCircle size={20} />
                    </button>

                    {selectedItem && selectedItem.component ? (
                        <Suspense fallback={<p>Loading...</p>}>
                            <selectedItem.component />
                        </Suspense>
                    ) : (
                        <p className="text-gray-400">Select an item from the menu.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ListMenu;
