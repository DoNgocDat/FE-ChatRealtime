import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800"
    >
      <h1 className="text-9xl font-bold text-cyan-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Oops! The page you are looking for does not exist.</h2>
      <p className="text-gray-500 mt-2">Looks like you got lost.</p>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-white bg-cyan-800 rounded-lg shadow-md"
        >
          Return to home page
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
