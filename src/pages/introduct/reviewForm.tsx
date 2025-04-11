import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

type Props = {
  onClose: () => void;
};

const ReviewForm: React.FC<Props> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi dữ liệu form ở đây
    console.log({ username, rating, description, image });
    onClose(); // đóng form sau khi submit
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 w-[90%] sm:w-[400px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-cyan-800 text-center">Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="border p-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={24}
                className={`cursor-pointer ${
                  i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          <textarea
            placeholder="Write your experience..."
            className="border p-2 rounded-lg resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-700"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReviewForm;
