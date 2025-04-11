import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { register } from "../../services/serviceRegister";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaArrowLeft,
} from "react-icons/fa";

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
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-white p-4">
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 flex items-center gap-2 py-2 px-3 rounded-md text-cyan-800 hover:scale-105 bg-white shadow-sm border border-cyan-200 text-sm font-medium transition"
      >
        <FaArrowLeft size={14} /> Back
      </button>

      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 flex flex-col items-center space-y-6 border border-cyan-100"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl text-cyan-800 font-bold">Create Account</h2>
        <p className="text-sm text-gray-500">Please fill in the details</p>

        <form className="w-full flex flex-col space-y-4" onSubmit={handleRegister}>
          <div className="relative w-full">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-3 h-11 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-400 outline-none text-cyan-900 placeholder-cyan-400 transition"
            />
          </div>

          <div className="relative w-full">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 h-11 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-400 outline-none text-cyan-900 placeholder-cyan-400 transition"
            />
          </div>

          <div className="relative w-full">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 h-11 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-400 outline-none text-cyan-900 placeholder-cyan-400 transition"
            />
          </div>

          <div className="relative w-full">
            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input
              placeholder="Display Name"
              type="text"
              name="displayname"
              value={form.displayname}
              onChange={handleChange}
              className="w-full pl-10 pr-3 h-11 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-400 outline-none text-cyan-900 placeholder-cyan-400 transition"
            />
          </div>

          <div className="relative w-full">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input
              placeholder="Birthday"
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full pl-10 pr-3 h-11 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-400 outline-none text-cyan-900 placeholder-cyan-400 transition"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-cyan-800 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-cyan-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-1 text-cyan-700 hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
