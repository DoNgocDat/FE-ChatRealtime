import { useState } from "react";
import VideoCall from "../../config/videoCall";

const Meeting = () => {
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {!joined ? (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Tham gia Phòng Họp</h2>
          <input
            type="text"
            placeholder="Tên phòng"
            className="px-4 py-2 rounded bg-gray-700 text-white w-full mb-2"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tên hiển thị"
            className="px-4 py-2 rounded bg-gray-700 text-white w-full mb-4"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold"
            onClick={() => setJoined(true)}
          >
            Vào Phòng
          </button>
        </div>
      ) : (
        <VideoCall roomName={roomName} displayName={displayName} />
      )}
    </div>
  );
};

export default Meeting;
