import React, { useEffect, useState } from 'react';
import signInImage from '/signin-image.jpg'; // Update the path accordingly
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import EmailOTPVerificationModal from '../components/Modals/EmailOTPVerificationModal';

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, verified, emailVerified } = useAuth();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const closeEmailModal = () => {
    setEmailModalOpen(false);
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      setLoading(true);
      const response = await loginService(formData);
      if (response.success) {
        const token = response.token;
        if (!token) {
          toast.error('Token not found. Please try again.');
          return;
        }
        login(response.token);
        toast.success('Login successful!');
      } else {
        toast.error(response?.message || 'Login failed. Please check your credentials.');
      }
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if (isAuthenticated && verified){
      navigate('/dashboard')
    } else if(isAuthenticated && emailVerified){
      navigate('/verify')
    } else if (isAuthenticated){
      setEmailModalOpen(true)
    }
  },[isAuthenticated])
  return (
    <>
    {emailModalOpen && <EmailOTPVerificationModal open={emailModalOpen} onClose={closeEmailModal} />}
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="w-full h-60 object-cover rounded-xl mb-6"
            src={signInImage}
            alt="Sign In Banner"
          />
        </div>

        <div className="bg-gray-100 shadow-md rounded-xl p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder='Enter email or phone number'
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder='password'
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{' '}
              <Link to="/register" className="text-red-600 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignIn;
