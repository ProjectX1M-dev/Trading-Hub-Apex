import React, { useState } from 'react';
import { Plus, Search, Filter, RefreshCw, X, Eye, EyeOff } from 'lucide-react';

const AccountsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);
  const [formData, setFormData] = useState({
    mt5Id: '',
    password: '',
    serverName: '',
    nickName: '',
    duration: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowAddModal(false);
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData({
      mt5Id: '',
      password: '',
      serverName: '',
      nickName: '',
      duration: ''
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Account Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500">
            <option>Sort by</option>
            <option>Name</option>
            <option>Date Added</option>
            <option>Status</option>
          </select>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-gray-400 text-lg font-medium mb-2">No Account Added Yet.</h3>
        <p className="text-gray-500 text-sm">Add your first trading account to get started</p>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded mr-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Add Account
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* MT5 ID and Password Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    MT5 Id
                  </label>
                  <input
                    type="text"
                    name="mt5Id"
                    value={formData.mt5Id}
                    onChange={handleInputChange}
                    placeholder="Enter MT5 Id"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••••"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Server Name and Nick Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Server Name
                  </label>
                  <input
                    type="text"
                    name="serverName"
                    value={formData.serverName}
                    onChange={handleInputChange}
                    placeholder="Enter Server Name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleInputChange}
                    placeholder="Enter Nick Name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              {/* Select Duration */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Select Duration
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select Duration</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>

              {/* Auto Renew Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">Auto Renew</span>
                <button
                  type="button"
                  onClick={() => setAutoRenew(!autoRenew)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRenew ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRenew ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;