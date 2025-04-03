import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { register } from "../../services/serviceRegister";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaCalendarAlt, FaIdCard, FaArrowLeft } from "react-icons/fa";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    displayname: "",
    birthday: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Register successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error(`Register failed! ${error.response?.data?.message}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      {/* Nút quay lại ở góc trái trên cùng */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 flex items-center gap-2 py-2 px-3 rounded-md text-cyan-800 hover:scale-105 bg-color2 text-sm font-medium transition-colors duration-300"
      >
        <FaArrowLeft size={14} /> Quay lại
      </button>

      <motion.div
        className="w-full max-w-md bg-color2 shadow-[0_0px_15px_0_rgba(59,130,246,0.5)] rounded-lg p-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl text-cyan-800 font-semibold text-center mb-6">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative w-full">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-3 text-cyan-800 bg-gray-300 h-10 rounded-lg outline-none"
            />
          </div>

          <div className="relative w-full">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 text-cyan-800 bg-gray-300 h-10 rounded-lg outline-none"
            />
          </div>

          <div className="relative w-full">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 text-cyan-800 bg-gray-300 h-10 rounded-lg outline-none"
            />
          </div>

          <div className="relative w-full">
            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Display Name"
              type="text"
              name="displayname"
              value={form.displayname}
              onChange={handleChange}
              className="w-full pl-10 pr-3 text-cyan-800 bg-gray-300 h-10 rounded-lg outline-none"
            />
          </div>

          <div className="relative w-full">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Birthday"
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full pl-10 pr-3 text-color3 bg-gray-300 h-10 rounded-lg outline-none"
            />
          </div>

          <button
            type="submit"
            className="relative mt-2 flex cursor-pointer items-center justify-center w-full bg-green-700 text-white py-2 rounded-md border border-green-700 overflow-hidden transition-colors duration-300
            before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
            hover:text-green-700 hover:border-green-700"
          >
            <span className="relative z-10">Register</span>
          </button>
        </form>

        <p className="text-cyan-800 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login.
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
