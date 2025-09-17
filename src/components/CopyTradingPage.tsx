import React, { useState } from 'react';
import { Plus, Search, Filter, RefreshCw, X, Info, Users, Link, UserX, ShoppingCart } from 'lucide-react';

interface CopyTradingPageProps {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
}

const CopyTradingPage: React.FC<CopyTradingPageProps> = ({ toast }) => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedCopyType, setSelectedCopyType] = useState('Multiplier');
  const [tradingEnabled, setTradingEnabled] = useState(true);
  const [formData, setFormData] = useState({
    groupName: '',
    childAccount: '',
    multiplier: '1'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.groupName.trim()) {
      toast.error('Missing Information', 'Please enter a group name');
      return;
    }
    
    toast.success('Group Created Successfully!', `Copy trading group "${formData.groupName}" has been created`);
    setShowCreateGroupModal(false);
    setFormData({
      groupName: '',
      childAccount: '',
      multiplier: '1'
    });
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childAccount) {
      toast.error('Missing Information', 'Please select a child account');
      return;
    }
    
    toast.success('Child Account Added!', 'Account has been successfully added to the copy trading group');
    setShowAddChildModal(false);
    setFormData({
      groupName: '',
      childAccount: '',
      multiplier: '1'
    });
  };

  const handleCancel = () => {
    setShowCreateGroupModal(false);
    setShowAddChildModal(false);
    setFormData({
      groupName: '',
      childAccount: '',
      multiplier: '1'
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Copy Trading</h1>
        <button
          onClick={() => setShowCreateGroupModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* Connect Master's Account Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 className="text-white text-lg font-semibold mb-4">Connect Master's Account</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500">
              <option>Select Master Account</option>
            </select>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Link className="w-4 h-4" />
            <span>Connect</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Trading</span>
            <button
              onClick={() => setTradingEnabled(!tradingEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tradingEnabled ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  tradingEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-orange-400 font-semibold">P - 0</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-400 font-semibold">C - 0</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 font-semibold">C - 0</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-400 font-semibold">F - 0</span>
          </div>
        </div>
      </div>

      {/* Child Accounts Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Child Accounts</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddChildModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Child</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              Place Order
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4 p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500">
              <option>Sort by</option>
            </select>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2 ml-auto">
            <button className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </button>
            <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white">
              <div className="space-y-0.5">
                <div className="w-4 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 mb-6">
            <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center relative">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              {/* Robot-like decorations */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-6 bg-gray-600 rounded-t"></div>
              </div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-4 bg-gray-600 rounded-l"></div>
              </div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-4 bg-gray-600 rounded-r"></div>
              </div>
            </div>
          </div>
          <h3 className="text-gray-400 text-lg font-medium">No child account connected yet.</h3>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded mr-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Create Group
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  placeholder="Enter Group Name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
              </div>

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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Child Account Modal */}
      {showAddChildModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded mr-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Add Child Account
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddChild} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Child Account
                </label>
                <select
                  name="childAccount"
                  value={formData.childAccount}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select Child Account</option>
                </select>
              </div>

              {/* Copy Type Selection */}
              <div>
                <div className="flex space-x-2 mb-4">
                  {['Multiplier', 'Fixed Lot', 'Balance Based'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedCopyType(type)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        selectedCopyType === type
                          ? type === 'Balance Based'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {selectedCopyType === 'Multiplier' && (
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Multiplier
                    </label>
                    <input
                      type="text"
                      name="multiplier"
                      value={formData.multiplier}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                    />
                  </div>
                )}

                {selectedCopyType === 'Balance Based' && showTooltip && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800 mb-4">
                    When you select the <strong>Balance Based</strong> option, the master account's balance is used as the reference for copying trades to the child account. This means the child account's trade size is adjusted proportionally based on the balance ratio between the child and the master account.
                  </div>
                )}
              </div>

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

export default CopyTradingPage;