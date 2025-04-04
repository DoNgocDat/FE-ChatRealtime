import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { login } from "../../services/serviceLogin";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(form);
      sessionStorage.setItem('accessToken', response.access_token);
      console.log('Access token:', response.access_token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error: any) {
      toast.error(`Login failed! ${error.response?.data?.message}`);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      {/* Nút quay lại ở góc trái trên cùng */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 flex items-center gap-2 py-2 px-3 rounded-md text-cyan-800 hover:scale-105 bg-color2 text-sm font-medium transition-colors duration-300"
      >
        <FaArrowLeft size={14} /> Quay lại
      </button>

      <motion.div
        className="w-full max-w-md bg-color2 shadow-[0_0px_15px_0_rgba(59,130,246,0.5)] rounded-md p-6 flex flex-col items-center space-y-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className='text-3xl text-cyan-800 font-semibold'>Login</h2>
        <hr className="w-full border-t-2 border-gray-300" />

        <form onSubmit={handleLogin} className='w-full flex flex-col space-y-4'>
          {/* Username Input */}
          <div className="relative w-full">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder='Username'
              type='text'
              name='username'
              value={form.username}
              onChange={handleChange}
              className='w-full pl-10 text-cyan-800 border bg-gray-300 h-10 rounded-lg p-2 outline-none'
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              className='w-full pl-10 text-cyan-800 border bg-gray-300 h-10 rounded-lg p-2 outline-none'
            />
          </div>

          <span className='text-blue-600 text-sm self-end cursor-pointer'>Forgot your password?</span>

          <button
            type="submit"
            className="relative mt-2 flex cursor-pointer items-center justify-center w-full bg-green-700 text-white py-2 rounded-md border border-green-700 overflow-hidden transition-colors duration-300
            before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100
            hover:text-green-700 hover:border-green-700"
          >
            <span className="relative z-10">Login</span>
          </button>
        </form>

        <p className='text-cyan-800 text-sm'>
          You don't have an account yet?
          <Link to="/register" className='text-blue-600'> Register</Link>
        </p>
      </motion.div >
    </div>
  );
}

export default LoginPage;