import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
const AwesomeToast = ({ message, icon }) => (
  <div className="animate-slide-in fixed bottom-6 right-6 flex items-center 
  bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20">
    <span className='text-2xl mr-3 text-[#2D1B0E]'>{icon}</span>
    <span className='font-semibold text-[#2D1B0E]'>{message}</span>
  </div>
);

const SignUp = () => {
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowToast(true);
    // You can add actual sign-up logic here (API call etc.)
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a120b] p-4">
      {showToast && <AwesomeToast message="Sign Up Successful" icon={<FaCheckCircle />} />}

      <div className='w-full max-w-md bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] p-8 rounded-xl shadow-lg 
        border-4 border-amber-700/30 transform transition-all duration-300 hover:shadow-2xl'>
        <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 
          bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform'>
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 
            placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 
            transition-all duration-200 hover:scale-[1.02]'
            required
          />

          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 
            placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 
            transition-all duration-200 hover:scale-[1.02]'
            required
          />

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 
              placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 
              transition-all duration-200 hover:scale-[1.02]'
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg 
            transition-transform hover:scale-[1.02]'
          >
            Sign Up
          </button>
        </form>

        <div className='mt-6 text-center '>
          <Link to='/login' className='group inline-flex  items-center text-amber-400
          hover:text-amber-600 transition-all duration-300'>
            <FaArrowLeft className="mr-2 transform -translate-x-2 opacity-0 group-hover:opacity-100 transition-all
            duration-300  ">

              </FaArrowLeft>
              <span className='transform group-hover:translate-x-2 transition-all duration-300'>
                Back to Login</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default SignUp;
