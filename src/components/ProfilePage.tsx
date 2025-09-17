import React, { useState } from 'react';
import { Upload, Edit, ChevronDown } from 'lucide-react';

interface ProfilePageProps {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ toast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    ageRange: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    mobileNumber: ''
  });

  const ageRanges = [
    'Select Age Range',
    '18-25',
    '26-35',
    '36-45',
    '46-55',
    '56-65',
    '65+'
  ];

  const countries = [
    'Select Country',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'Brazil',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (!profileData.fullName.trim()) {
      toast.error('Missing Information', 'Please enter your full name');
      return;
    }
    
    toast.success('Profile Updated Successfully!', 'Your profile information has been saved');
    setIsEditing(false);
  };

  const handleCancel = () => {
    toast.info('Changes Cancelled', 'Your profile changes have been discarded');
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Profile</h1>
      </div>

      {/* Profile Form */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        {/* Profile Picture Section */}
        <div className="flex items-start space-x-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">I</span>
            </div>
          </div>
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 mb-2">
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
            <p className="text-gray-400 text-sm">
              Allowed JPG, JPEG or PNG. Max size of 1 MB
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Age Range
            </label>
            <div className="relative">
              <select
                name="ageRange"
                value={profileData.ageRange}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500 appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {ageRanges.map((range) => (
                  <option key={range} value={range === 'Select Age Range' ? '' : range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Country
            </label>
            <div className="relative">
              <select
                name="country"
                value={profileData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500 appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {countries.map((country) => (
                  <option key={country} value={country === 'Select Country' ? '' : country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={profileData.state}
              onChange={handleInputChange}
              placeholder="Enter State"
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
              placeholder="Enter City"
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={profileData.pincode}
              onChange={handleInputChange}
              placeholder="Enter Pincode"
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Mobile Number - Full Width */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={profileData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter Your Mobile Number"
            disabled={!isEditing}
            className="w-full max-w-md bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;