import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useState, lazy, Suspense } from "react";
import { useTheme } from "../../config/theme";
import { Link } from "react-router-dom";

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
        <div
            id="menu-overlay"
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
            onClick={handleOverlayClick}
        >
            <div
                className={`bg-white shadow-lg flex w-[90%] md:w-[600px] h-[500px] relative rounded-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } md:translate-x-0`}
            >
                {/* Danh sách menu bên trái */}
                <ul className={`bg-gray-300 p-4 flex flex-col items-center md:items-start w-16 md:w-64 ${isDarkMode ? "text-gray-800" : "text-cyan-800"} rounded-l-lg`}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`flex flex-col w-full mt-2 mb-2 md:flex-row items-center md:justify-start space-y-2 md:space-y-0 md:space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-400 rounded-lg transition-all ${selectedItem?.id === item.id ? "bg-gray-500 text-white" : ""}`}
                            onClick={() => {
                                if (item.action) {
                                    item.action(); // Gọi hàm logout nếu có
                                } else {
                                    setSelectedItem(item);
                                }
                            }}
                        >
                            {item.icon}
                            <span className="hidden md:inline">
                                {item.link ? <Link to={item.link}>{item.label}</Link> : <span>{item.label}</span>}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Nội dung menu bên phải */}
                <div className="flex-1 h-full p-4 bg-gray-100 relative rounded-r-lg">
                    {/* Nút đóng menu */}
                    <button className="absolute top-2 right-2 text-red-500 hover:text-red-600" onClick={onClose}>
                        <FaIcons.FaTimesCircle />
                    </button>

                    {selectedItem && selectedItem.component ? (
                        <Suspense fallback={<p>Loading...</p>}>
                            <selectedItem.component />
                        </Suspense>
                    ) : (
                        <p className="text-gray-500">Select an item from the menu.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListMenu;
