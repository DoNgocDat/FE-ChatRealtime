import { useState } from "react";
import VideoCall from "../../config/videoCall";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 relative transition-colors duration-500">
      
      {/* Back button */}
      {!joined && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 py-2 px-3 rounded-md text-cyan-800 bg-white dark:bg-gray-700 dark:text-cyan-100 shadow-sm border border-cyan-200 dark:border-gray-600 text-sm font-medium hover:scale-105 transition"
        >
          <FaArrowLeft size={14} /> Back
        </button>
      )}

      {!joined ? (
        <motion.div
          className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 flex flex-col items-center space-y-6 border border-cyan-100 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-cyan-800 dark:text-cyan-300">
            Join Meeting Room
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please enter your details to join
          </p>

          <input
            type="text"
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full px-4 py-2 h-11 rounded-xl border border-cyan-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-cyan-900 dark:text-cyan-100 placeholder-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          />
          <input
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 h-11 rounded-xl border border-cyan-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-cyan-900 dark:text-cyan-100 placeholder-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          />

          <button
            onClick={() => setJoined(true)}
            className="mt-2 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 rounded-xl font-semibold shadow-md transition"
          >
            Join Room
          </button>
        </motion.div>
      ) : (
        <VideoCall roomName={roomName} displayName={displayName} />
      )}
    </div>
  );
};

export default Meeting;
