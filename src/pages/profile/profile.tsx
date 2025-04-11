import { useTheme } from "../../config/theme";
import { getUserInfo } from '../../services/serviceUser';
import { useEffect, useState } from "react";
import { User } from '../../type/userType';

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
                        setError('User not found or access denied');
                    }
                })
                .catch(() => {
                    setError('Failed to fetch user data');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError('Access token not found');
            setLoading(false);
        }
    }, []);

    return user ? (
        <div
            className={"space-y-5"}
        >
            <h2 className="text-center text-xl font-semibold text-cyan-700">Profile Information</h2>

            <input
                placeholder="Email"
                type="email"
                name="email"
                value={user.email}
                readOnly
                className={`w-full h-11 rounded-xl px-3 outline-none border transition focus:ring-2 ${
                    isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-500"
                        : "bg-white border-cyan-200 text-cyan-900 focus:ring-cyan-500"
                }`}
            />

            <input
                placeholder="Displayname"
                type="text"
                name="displayname"
                value={user.displayname}
                readOnly
                className={`w-full h-11 rounded-xl px-3 outline-none border transition focus:ring-2 ${
                    isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-500"
                        : "bg-white border-cyan-200 text-cyan-900 focus:ring-cyan-500"
                }`}
            />

            <input
                placeholder="Birthday"
                type="date"
                name="birthday"
                value={user.birthday ? new Date(user.birthday).toISOString().slice(0, 10) : ""}
                readOnly
                className={`w-full h-11 rounded-xl px-3 outline-none border transition focus:ring-2 ${
                    isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-500"
                        : "bg-white border-cyan-200 text-cyan-900 focus:ring-cyan-500"
                }`}
            />

            <button
                className={`mt-3 w-full py-2 rounded-xl relative overflow-hidden border transition-all duration-300
                    before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300
                    hover:before:scale-x-100
                    ${isDarkMode
                        ? "bg-cyan-600 text-white border-cyan-600 hover:text-cyan-600"
                        : "bg-cyan-700 text-white border-cyan-700 hover:text-cyan-700"
                    }`}
            >
                <span className="relative z-10">Update</span>
            </button>
        </div>
    ) : null;
};

export default Profile;
