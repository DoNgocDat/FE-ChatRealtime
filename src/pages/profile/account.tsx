import { useTheme } from "../../config/theme";

const Account = () => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className={"space-y-5"}
        >
            <h2 className="text-center text-xl font-semibold text-cyan-700">Account Information</h2>

            <input
                placeholder="New Password"
                type="password"
                name="password"
                className={`w-full h-11 rounded-xl px-3 outline-none border transition focus:ring-2 ${
                    isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-500"
                        : "bg-white border-cyan-200 text-cyan-900 focus:ring-cyan-500"
                }`}
            />

            <input
                placeholder="Re-enter New Password"
                type="password"
                name="re-enterpassword"
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
    );
};

export default Account;
