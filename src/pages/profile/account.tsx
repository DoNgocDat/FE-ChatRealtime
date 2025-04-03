import { useTheme } from "../../config/theme";

const Account = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="space-y-5">
            <h2 className={`${isDarkMode ? "text-gray-800" : "text-cyan-800"} text-lg font-bold`}>Account Information</h2>
            <input placeholder="New Password" type="password" name="password"
                className="w-full text-cyan-800 border-none outline-none bg-gray-300 h-[40px] rounded-lg pl-2 pr-2">
            </input>
            <input placeholder="Re-enter New Password" type="password" name="re-enterpassword"
                className="w-full text-cyan-800 border-none outline-none bg-gray-300 h-[40px] rounded-lg pl-2 pr-2">
            </input>
            <button
                className="relative mt-2 flex cursor-pointer items-center justify-center w-full bg-green-700 text-white py-2 rounded-md border border-green-700 overflow-hidden transition-colors duration-300
            before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
            hover:text-green-700 hover:border-green-700"
            >
                <span className="relative z-10">Update</span>
            </button>
        </div>
    );
};

export default Account;
