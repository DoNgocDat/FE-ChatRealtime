import { useTheme } from "../../config/theme";
import { getUserInfo } from '../../services/serviceUser';
import { useEffect, useState } from "react";
import { User } from '../../type/userType'

const Profile = () => {
    const { isDarkMode } = useTheme();
    const [user, setUser] = useState<User | null>(null);
    const [, setLoading] = useState<boolean>(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            getUserInfo(accessToken)
                .then((data) => {
                    if (data) {
                        setUser(data);
                    } else {
                        setError('Không tìm thấ người dùng hoặc không có quyền truy cập');
                    }
                })
                .catch(() => {
                    setError('lỗi khi lấy dữ liệu người dùng');
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            setError('Không tìm thấy mã token truy cập');
            setLoading(false);
        }
    }, [])

    return user ? (
        <div className="space-y-5">
            <h2 className={`${isDarkMode ? "text-gray-800" : "text-cyan-800"} text-lg font-bold`}>Profile Information</h2>
            <input placeholder="Email" type="email" name="email" value={user.email}
                className={`w-full ${isDarkMode ? "text-gray-700" : "text-cyan-800"} border-none outline-none bg-gray-300 h-[40px] rounded-lg pl-2 pr-2`}>
            </input>
            <input placeholder="Displayname" type="text" name="displayname" value={user.displayname}
                className={`w-full ${isDarkMode ? "text-gray-700" : "text-cyan-800"} border-none outline-none bg-gray-300 h-[40px] rounded-lg pl-2 pr-2`}>
            </input>
            <input placeholder="Birthday" type="date" name="birthday" value={user.birthday ? new Date(user.birthday).toISOString().slice(0, 10) : ""}
                className={`w-full ${isDarkMode ? "text-gray-700" : "text-cyan-800"} border-none outline-none bg-gray-300 h-[40px] rounded-lg pl-2 pr-2`}>
            </input>
            <button
                className="relative mt-2 flex cursor-pointer items-center justify-center w-full bg-green-700 text-white py-2 rounded-md border border-green-700 overflow-hidden transition-colors duration-300
            before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
            hover:text-green-700 hover:border-green-700"
            >
                <span className="relative z-10">Update</span>
            </button>
        </div>
    ) : null;
};

export default Profile;