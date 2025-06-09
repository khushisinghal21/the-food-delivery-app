import React, { useEffect, useState } from 'react';
import { FaUser, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
const Login = ({ onLoginSuccess, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remmemberMe: false
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.remmemberMe
      ? localStorage.setItem('loginData', JSON.stringify(formData))
      : localStorage.removeItem('loginData');

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    onLoginSuccess(formData);
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Message */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 
        ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="bg-green-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm">
          <FaCheckCircle className="flex-shrink-0" />
          <span>Login Successful!</span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div className="relative">
          <FaUser className={iconClass} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className={iconClass} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remmemberMe"
            checked={formData.remmemberMe}
            onChange={handleChange}
            className="accent-amber-500"
          />
          <label htmlFor="remmemberMe" className="text-sm text-white">
            Remember Me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Login
        </button>
        
      </form>
      <div>
        <Link to='/signup ' onClick={ onClose} className='inline-flex items-center gap-2
        text-amber-400 hover:text-amber-600 transition-colors'>
          <FaUserPlus></FaUserPlus>
          Create New Account
        </Link>
      </div>


    </div>
  );
};

export default Login;
