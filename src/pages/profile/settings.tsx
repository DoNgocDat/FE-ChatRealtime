import { useTheme } from "../../config/theme";

const Settings = () => {
    const { isDarkMode } = useTheme();

    return (
        <div
            className={"space-y-5"}
        >
            <h2 className="text-center text-xl font-semibold text-cyan-700">Settings</h2>
            {/* Add your settings controls here */}
        </div>
    );
};

export default Settings;
