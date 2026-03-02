import React, { useState } from 'react'
const API_URL = import.meta.env.VITE_APP_API_URL
const ChangePassword = () => {
    const INITIAL_STATE = {
        oldPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('New password must match the Confirm new password')
            return;
        }
        await fetch(`${API_URL}/password/change`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(formData),
        }).then(response => response.json()).then(result => alert(result.message))
        setFormData(INITIAL_STATE)
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="py-16 w-full h-full flex flex-col items-center justify-center bg-white overflow-x-hidden overflow-y-auto">
      <div className='max-w-md w-full mx-4 bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-yellow-400 flex flex-col items-center'>
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className='text-center text-3xl font-bold text-green-800'>Change Password</h2>
          <p className="text-gray-500 mt-2 text-sm text-center">Update your account security with a strong password</p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Old Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={formData.oldPassword} 
              onChange={handleChange} 
              name="oldPassword" 
              className="py-3 px-4 rounded-xl w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none" 
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
              className="py-3 px-4 rounded-xl w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              name="confirmNewPassword" 
              value={formData.confirmNewPassword} 
              onChange={handleChange} 
              className="py-3 px-4 rounded-xl w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
              required
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 py-3 px-4 rounded-xl w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-200 transform active:scale-95 transition-all duration-200"
          >
            Update Password
          </button>
          
          <div className="w-full flex justify-center pt-2">
             <div className="h-1.5 w-16 bg-yellow-400 rounded-full opacity-60"></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
