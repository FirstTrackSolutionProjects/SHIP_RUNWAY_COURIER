import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { USER_ROLES } from '@/Constants';
import { toast } from 'react-toastify';
// Import MUI components needed for file input (assuming they are installed and available)
import { MuiFileInput } from 'mui-file-input';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { InputAdornment } from "@mui/material";

const API_URL = import.meta.env.VITE_APP_API_URL

const Profile = () => {
  const token = localStorage.getItem('token');
  const userRole = token ? jwtDecode(token).role : null;
  const isAdminOrAdminEmployee = userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.ADMIN_EMPLOYEE;
  const isMerchant = userRole === USER_ROLES.MERCHANT || userRole === USER_ROLES.MERCHANT_EMPLOYEE || userRole === USER_ROLES.SUBMERCHANT;

  // Initial state for displaying profile data
  const [profileData, setProfileData] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    msme: '',
    cin: '',
    gstin: '',
    aadhar: '',
    pan: '',
    address: '',
    hub: '',
    city: '',
    state: '',
    pin: '',
    bank: '',
    account_number: '',
    ifsc: '',
    designation: '',
    selfie_doc: '', // S3 key
  });

  // State for editable form data (only for Admin/AdminEmployee)
  const [editFormData, setEditFormData] = useState({
    fullName: '', // Corresponds to profileData.name
    phone: '',
    designation: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    selfie_doc: '', // S3 key of the *new* uploaded photo
  });

  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null); // Actual URL for img src
  const [profilePhotoFile, setProfilePhotoFile] = useState(null); // File object for upload
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Effect to fetch profile photo URL whenever selfie_doc in profileData changes
  useEffect(() => {
    const getProfilePhoto = async () => {
      if (!profileData.selfie_doc) {
        setProfilePhotoUrl(null); // Clear photo if no doc
        return;
      }
      try {
        const response = await fetch(`${API_URL}/s3/getUrl`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({ key: profileData.selfie_doc })
        });
        const result = await response.json();
        if (result.downloadURL) {
          setProfilePhotoUrl(result.downloadURL);
        } else {
          setProfilePhotoUrl(null);
        }
      } catch (error) {
        console.error("Error fetching profile photo URL:", error);
        setProfilePhotoUrl(null);
      }
    };
    getProfilePhoto();
  }, [profileData.selfie_doc, token]);

  // Effect to fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const endpoint = isMerchant ? 'merchant' : 'admin'; // Correct endpoint based on user role
        const response = await fetch(`${API_URL}/${endpoint}/profile`, {
          method: 'POST', // Assuming /admin/profile and /merchant/profile are POST
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
          }
        });
        const result = await response.json();
        if (result.success && result.data) {
          const data = result.data;
          setProfileData({
            name: data.fullName,
            business_name: data.businessName,
            email: data.email,
            phone: data.phone,
            msme: data.msme,
            cin: data.cin,
            gstin: data.gst,
            aadhar: data.aadhar_number,
            pan: data.pan_number, // Corrected from pan_aadhar based on DB schema
            address: data.address,
            hub: data.hub,
            city: data.city,
            state: data.state,
            pin: data.pin,
            bank: data.bank,
            account_number: data.accountNumber,
            ifsc: data.ifsc,
            designation: data.designation,
            selfie_doc: data.selfie_doc // S3 key
          });

          // Initialize editFormData for admin/admin_employee
          if (isAdminOrAdminEmployee) {
            setEditFormData({
              fullName: data.fullName || '',
              phone: data.phone || '',
              designation: data.designation || '',
              address: data.address || '',
              city: data.city || '',
              state: data.state || '',
              pin: data.pin || '',
              selfie_doc: data.selfie_doc || '', // Current S3 key
            });
          }
        } else {
          toast.error(result.message || "Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token, isMerchant, isAdminOrAdminEmployee]); // Added isMerchant to dependencies

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) {
      setProfilePhotoFile(null);
      return;
    }
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error("Only PNG, JPEG, JPG images are supported for profile photo.");
      setProfilePhotoFile(null);
      return;
    }
    setProfilePhotoFile(file);
  };

  const handleUploadAndSave = async () => {
    setLoading(true);
    let s3Key = editFormData.selfie_doc; // Start with current S3 key

    try {
      if (profilePhotoFile) {
        // Only upload if a new file is selected
        const userId = jwtDecode(token).id;
        // Use a more robust filename, e.g., userId/profilePhoto/timestamp_originalfilename.ext
        const filename = `admin/${userId}/profilePhoto/${Date.now()}_${profilePhotoFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

        const urlResponse = await fetch(`${API_URL}/s3/putUrl`, {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: filename, filetype: profilePhotoFile.type }),
        });

        if (!urlResponse.ok) {
          throw new Error("Failed to get S3 upload URL.");
        }
        const { uploadURL } = await urlResponse.json();

        const uploadRequest = await fetch(uploadURL, {
          method: "PUT",
          headers: { "Content-Type": profilePhotoFile.type },
          body: profilePhotoFile,
        });

        if (!uploadRequest.ok) {
          throw new Error("Failed to upload file to S3.");
        }
        s3Key = filename; // Update s3Key to the newly uploaded file's key
        toast.success("Profile photo uploaded successfully!");
      }

      // Prepare data for backend update
      const updatePayload = {
        fullName: editFormData.fullName,
        phone: editFormData.phone,
        designation: editFormData.designation,
        address: editFormData.address,
        city: editFormData.city,
        state: editFormData.state,
        pin: editFormData.pin,
        selfie_doc: s3Key, // Use the new S3 key or existing one
      };

      // Send update request to backend
      const response = await fetch(`${API_URL}/admin/profile/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(updatePayload),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setIsEditing(false); // Exit edit mode
        // Update profileData state manually to reflect changes immediately
        setProfileData(prev => ({
            ...prev,
            name: updatePayload.fullName,
            phone: updatePayload.phone,
            designation: updatePayload.designation,
            address: updatePayload.address,
            city: updatePayload.city,
            state: updatePayload.state,
            pin: updatePayload.pin,
            selfie_doc: updatePayload.selfie_doc,
        }));
        setProfilePhotoFile(null); // Clear selected file after successful save
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("An error occurred while saving profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editFormData to current profileData when cancelling
    setEditFormData({
        fullName: profileData.name || '',
        phone: profileData.phone || '',
        designation: profileData.designation || '',
        address: profileData.address || '',
        city: profileData.city || '',
        state: profileData.state || '',
        pin: profileData.pin || '',
        selfie_doc: profileData.selfie_doc || '',
    });
    setProfilePhotoFile(null); // Clear selected file
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
      <div className='w-full h-full bg-white p-8 flex flex-col items-center'>
        <div className='text-center text-3xl font-medium text-black mb-8'>
          {isAdminOrAdminEmployee ? "Admin Profile" : "Merchant Profile"}
        </div>

        <div className='border-2 relative p-6 md:max-w-[500px] w-full bg-white rounded-2xl overflow-y-auto space-y-8'>
          <div className='w-full space-y-6'>
            <div className='w-full flex items-center flex-col md:flex-row justify-center space-x-8'>
              <div className='flex justify-center items-center w-32 h-32 overflow-hidden rounded-full border-2 border-gray-300'>
                <img
                  src={profilePhotoFile ? URL.createObjectURL(profilePhotoFile) : profilePhotoUrl || '/user.webp'}
                  alt="Profile"
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='text-center md:text-left mt-4 md:mt-0'>
                {isEditing && isAdminOrAdminEmployee ? (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditChange}
                      className='font-medium text-xl border rounded px-2 py-1 mb-1 w-full md:w-auto outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      name="designation"
                      value={editFormData.designation}
                      onChange={handleEditChange}
                      className='font-medium text-sm text-gray-600 border rounded px-2 py-1 mb-1 w-full md:w-auto outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="Designation"
                    />
                    <p className='font-medium text-sm text-gray-600'>{profileData.email}</p> {/* Email is read-only */}
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      className='font-medium text-sm text-gray-600 border rounded px-2 py-1 w-full md:w-auto outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="Phone"
                    />
                    <div className='mt-2'>
                        <MuiFileInput
                            label="Profile Photo"
                            size="small"
                            placeholder={'Select Image'}
                            id="selfie_doc"
                            name="selfie_doc"
                            onChange={handleFileChange}
                            value={profilePhotoFile}
                            clearIconButtonProps={{
                                title: "Remove",
                                children: <CloseIcon fontSize="small" />
                            }}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <AttachFileIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            className='mb-2'
                        />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Display business name only if available for the role */}
                    {profileData.business_name && (isAdminOrAdminEmployee ? profileData.designation === '' || profileData.designation === null : true) && (
                        <p className='font-medium text-xl'>{profileData.business_name}</p>
                    )}
                    <p className='font-medium text-sm text-gray-600'>({profileData.name})</p>
                    <p className='font-medium text-sm text-gray-600'>{profileData.email}</p>
                    <p className='font-medium text-sm text-gray-600'>{profileData.phone}</p>
                  </>
                )}
                {isMerchant && <p className='font-medium text-sm text-green-400'>Balance(Coming Soon)</p>}
              </div>
            </div>
            <div className='w-full font-medium text-gray-700'>
              {isEditing && isAdminOrAdminEmployee ? (
                <div className='space-y-2'>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditChange}
                      className='font-medium text-gray-700 border rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditChange}
                      className='font-medium text-gray-700 border rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="state"
                      value={editFormData.state}
                      onChange={handleEditChange}
                      className='font-medium text-gray-700 border rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="pin"
                      value={editFormData.pin}
                      onChange={handleEditChange}
                      className='font-medium text-gray-700 border rounded px-2 py-1 w-full outline-none focus:ring-2 focus:ring-green-400'
                      placeholder="Pincode"
                    />
                </div>
              ) : (
                <>
                  {(isAdminOrAdminEmployee && profileData.designation) ? <p>Designation : {profileData.designation}</p> : null}
                  {profileData.address && <p>Address : {profileData.address}</p>}
                  {profileData.city && <p>City : {profileData.city}</p>}
                  {profileData.state && <p>State : {profileData.state}</p>}
                  {profileData.pin && <p>Pincode : {profileData.pin}</p>}
                  {isMerchant && (
                    <div className='w-full'>
                      {profileData.gstin && <p>GSTIN : {profileData.gstin}</p>}
                      {profileData.cin && <p>CIN : {profileData.cin}</p>}
                      {profileData.aadhar && <p>Aadhar Number : {profileData.aadhar}</p>}
                      {profileData.pan && <p>PAN Number : {profileData.pan}</p>}
                      {profileData.hub && <p>Hub : {profileData.hub}</p>}
                      {profileData.bank && <p>Bank Name : {profileData.bank}</p>}
                      {profileData.account_number && <p>A/C No. : {profileData.account_number}</p>}
                      {profileData.ifsc && <p>IFSC : {profileData.ifsc}</p>}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {isAdminOrAdminEmployee && (
            <div className='flex justify-center space-x-4 mt-6'>
              {isEditing ? (
                <>
                  <button
                    onClick={handleUploadAndSave}
                    disabled={loading}
                    className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
