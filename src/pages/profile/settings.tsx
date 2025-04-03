import { useTheme } from "../../config/theme";

const Settings = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="space-y-5">
            <h2 className={`${isDarkMode ? "text-gray-800" : "text-cyan-800"} text-lg font-bold`}>Settings</h2>
        </div>
    );
};

export default Settings;
