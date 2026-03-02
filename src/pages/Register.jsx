import { Link } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";
import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
// import EmailOTPVerificationModal from '../components/Modals/EmailOTPVerificationModal'; // Removed modal import
import registerImage from '/register-image.jpg';
import registerService from '../services/register'; // Now using default export, but implementation expects named exports. Assuming service file updates handle this.
import { requestRegistrationOTPService } from '../services/register'; // NEW service import (assuming both exported from services/register now)
import { toast } from 'react-toastify';
import { Box, Button, TextField } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { USER_ROLES } from '../Constants'; // Assuming Constants.jsx is the path

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    reg_email: "",
    reg_password: "",
    confirm_password: "",
    business_name: "",
    mobile: "",
    role: USER_ROLES.MERCHANT, // Default role selection
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  // --- OTP STATE & LOGIC ---
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0); // 30-second regeneration cooldown
  const [otpValidUntil, setOtpValidUntil] = useState(0); // Absolute timestamp (ms) for 5-minute validity
  const timerRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const emailRef = useRef(''); // Stores the email that received the OTP
  // -------------------------

  const { isAuthenticated, login, verified, role} = useAuth(); // Added role: authRole
  // const [emailModalOpen, setEmailModalOpen] = useState(false) // Removed modal state
  const navigate = useNavigate();

  // const closeEmailModal = () => { // Removed modal function
  //   setEmailModalOpen(false);
  // }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateOTP = async () => {
    const email = formData.reg_email;
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Please enter a valid email format before generating OTP.");
        return;
    }

    setIsGenerating(true);
    try {
        await requestRegistrationOTPService(email);
        
        emailRef.current = email; 
        setOtpSent(true);
        setTimer(30); // Start 30-second regeneration cooldown
        setOtpValidUntil(Date.now() + 300 * 1000); // OTP valid for 5 minutes (300,000 ms)
        setOtp(''); // Clear previous OTP input
        toast.success("OTP sent to your email. Active for 5 minutes.");

    } catch (error) {
        // Error handling for requestRegistrationOTPService uses throw
        toast.error(error); 
    } finally {
        setIsGenerating(false);
    }
  };


  const validate = (isSubmission = false) => {
    let validationErrors = false;

    if (!Object.values(USER_ROLES).includes(formData.role)) {
      toast.error("Invalid user role selected");
      validationErrors = true;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      toast.error("Full name should contain alphabets only")
      validationErrors = true;
    }

    if (!/\S+@\S+\.\S+/.test(formData.reg_email)) {
      toast.error("Invalid email format")
      validationErrors = true;
    }

    if (formData.reg_password.length < 4) {
      toast.error("Password should be at least 4 characters")
      validationErrors = true;
    }

    if (formData.reg_password !== formData.confirm_password) {
      toast.error("Passwords do not match")
      validationErrors = true;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number should be exactly 10 digits")
      validationErrors = true;
    }

    // Check if email used for OTP matches current form email
    if (isSubmission && otpSent && emailRef.current !== formData.reg_email) {
        toast.error("Please re-generate OTP for the modified email address.");
        validationErrors = true;
    }

    // OTP validation only required on final submission
    if (isSubmission && !validationErrors) {
        if (!otpSent) {
            toast.error("Please generate the OTP.");
            validationErrors = true;
        } else if (Date.now() > otpValidUntil) {
            toast.error("The OTP has expired (5 minute limit). Please generate a new one.");
            validationErrors = true;
        } else if (otp.length !== 6) {
            toast.error("Please enter the 6-digit OTP.");
            validationErrors = true;
        }
    }

    return validationErrors;
  };

  useEffect(()=>{
    if (isAuthenticated && verified){
      navigate("/dashboard")
    } else if (isAuthenticated && role === USER_ROLES.MERCHANT) {
      navigate("/verify")
    }
  },[isAuthenticated, verified, navigate, role]) // Navigation dependencies added

  // Timer useEffect: Handles starting, stopping, and cleanup of the 30s regeneration cooldown
  useEffect(() => {
    // If otpSent is true and the cooldown timer is active (timer > 0)
    if (otpSent && timer > 0) {
        // Clear any existing interval before setting a new one
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    
    // Cleanup on unmount or when dependencies (otpSent, timer) change
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
  },[otpSent, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    // Pass true to validate for final submission checks including OTP
    const validationErrors = validate(true); 
    if (validationErrors) {
        toast.error("Please check form format!");
        return;
    }

    setLoading(true);

    try {
        const registerPayload = {
            fullName: formData.name,
            businessName: formData.business_name,
            email: formData.reg_email,
            password: formData.reg_password,
            mobile: formData.mobile,
            role: formData.role,
            otp: otp, // Include OTP
        };
        
        const registerResponse = await registerService(registerPayload)
        
        if (registerResponse?.token) { // Successful registration returns a token
          toast.success("Registration and Email Verification successful!");
          await login(registerResponse.token);
          
          const newRole = registerPayload.role;
              
          // --- FIX: Role-based Redirection ---
          if (newRole === USER_ROLES.MERCHANT) {
              // Merchant must proceed to KYC
              navigate("/verify"); 
          } else {
              // Other roles skip KYC and go straight to Dashboard
              navigate("/dashboard"); 
          }
          // ------------------------------------
        } else {
          toast.error(registerResponse?.message || "Registration failed, please try again.");
        }
    } catch (err) {
        // Handles errors thrown by registerService (e.g., Invalid OTP, OTP Expired)
        toast.error(err); 
    } finally {
        setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <>
    {/* {emailModalOpen && <EmailOTPVerificationModal open={emailModalOpen} onClose={closeEmailModal} />} // Removed modal usage */}
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-10 mb-9">

      {/* Top Image */}
      <div className="w-full max-w-md flex justify-center mb-6">
        <img
          src={registerImage}
          alt="Register Banner"
          className="w-full max-h-64 object-cover rounded-xl mb-8"
        />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-center text-2xl font-extrabold text-[#145A32] mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-none p-3 focus:outline-none"
            />
          </div>

        {/* Phone Number */}
        <div className="relative w-full">

          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#145A32] focus-within:border-[#145A32] transition">

            {/* Flag + Code Section */}
            <div className="flex items-center gap-2 px-3 bg-white border-r border-gray-300 h-12">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className="w-5 h-4 object-cover rounded-sm"
              />
              <span className="text-gray-700 font-medium text-sm">+91</span>
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              name="mobile"
              placeholder="Phone Number"
              required
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({
                  ...formData,
                  mobile: value,
                });
              }}
              className="flex-1 h-12 px-2 bg-gray-50 outline-none text-gray-700 placeholder-gray-400"
              maxLength={10}
            />
          </div>

        </div>

    {/* Email + Generate OTP */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center border border-gray-300 rounded-md pr-1 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
              <FaEnvelope className="text-gray-500 mx-3" />
              <input
                type="email"
                placeholder="Email"
                required
                name="reg_email"
                value={formData.reg_email}
                onChange={handleChange}
                className="w-full focus:outline-none"
                disabled={otpSent && timer > 0} // Disable email input if OTP is active
              />
              <button
                type="button"
                onClick={handleGenerateOTP}
                disabled={isGenerating || (otpSent && timer > 0 && emailRef.current === formData.reg_email)}
                className={`px-3 py-1 text-sm rounded-md font-semibold transition whitespace-nowrap 
                            ${(isGenerating || (otpSent && timer > 0 && emailRef.current === formData.reg_email)) 
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                              : "bg-[#E49B0F] text-white hover:bg-[#C97A00]"}`}
              >
                {isGenerating ? 'Sending...' : (otpSent && timer > 0) ? formatTime(timer) : 'Generate OTP'}
              </button>
            </div>
           

            {/* OTP Input Field (Conditional) */}
            {(otpSent || timer > 0) && (
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    required
                    name="otp"
                    value={otp}
                    onChange={(e) => {
                        // Restrict input to 6 digits and numbers
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                    }}
                    className="w-full focus:outline-none"
                    maxLength={6}
                  />
                </div>
            )}
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              name="reg_password"
              value={formData.reg_password}
              onChange={handleChange}
              className="w-full border-none p-3 focus:outline-none"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 ml-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full border-none p-3 focus:outline-none"
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 ml-2"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
          </div>

          {/* Business Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
            <FaBuilding className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Business Name"
              required
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="w-full border-none p-3 focus:outline-none"
            />
          </div>
          
          {/* Role Selection */}
          <div className="flex flex-col border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#145A32]">
            <label htmlFor="role-select" className="text-gray-500 text-sm mb-1">Register As:</label>
            <select
              id="role-select"
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full focus:outline-none border-none bg-transparent"
            >
              <option value={USER_ROLES.MERCHANT}>Merchant</option>
              {/* Temporarily hidden roles */}
              {/* <option value={USER_ROLES.SUBMERCHANT}>Sub-merchant</option> */}
              {/* <option value={USER_ROLES.MERCHANT_EMPLOYEE}>Merchant Employee</option> */}
              {/* <option value={USER_ROLES.ADMIN_EMPLOYEE}>Admin Employee</option> */}
              {/* Note: ADMIN role is excluded from public registration */}
            </select>
          </div>

         {/* Terms & Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#145A32] font-semibold hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#145A32] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

           <button
              type="submit"
              disabled={!acceptTerms}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 
              ${acceptTerms ? "bg-[#145A32] hover:bg-[#0E3F2D]" : "bg-gray-400 cursor-not-allowed"}`}
            >
              Register
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-[#E49B0F] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
