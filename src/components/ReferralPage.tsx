import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  Calendar,
  Download,
  Search,
  Grid,
  List,
  Lock,
  Gift,
  TrendingUp
} from 'lucide-react';

interface ReferralPageProps {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
}

const ReferralPage: React.FC<ReferralPageProps> = ({ toast }) => {
  const [activeTab, setActiveTab] = useState('all-referral-users');
  const [searchTerm, setSearchTerm] = useState('');

  const handleReferralLinkClick = () => {
    const referralLink = 'https://tradinghub.com/ref/user123';
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral Link Copied!', 'Share this link to earn rewards from referrals');
  };

  const handleCreditClick = () => {
    toast.info('Credit Pending Amount', 'Your pending referral earnings will be credited to your wallet');
  };

  const handleWithdrawClick = () => {
    toast.warning('Minimum Withdrawal Required', 'You need at least $10 to make a withdrawal');
  };

  const stats = [
    {
      title: 'Referred User',
      value: '0',
      icon: Users,
      iconColor: 'bg-purple-600'
    },
    {
      title: 'Active User',
      value: '0',
      icon: UserCheck,
      iconColor: 'bg-blue-600'
    },
    {
      title: 'Current Month Earning ($)',
      value: '0',
      icon: DollarSign,
      iconColor: 'bg-green-600'
    },
    {
      title: 'Last Month Earning ($)',
      value: '0',
      icon: TrendingUp,
      iconColor: 'bg-orange-600'
    }
  ];

  const milestones = [
    {
      title: 'Unlock at 10+ users & earn 15% credits',
      isUnlocked: false,
      buttonText: 'Referral Link',
      buttonColor: 'bg-purple-600'
    },
    {
      title: 'Unlock at 30+ users & earn 20% credits',
      isUnlocked: false,
      buttonText: '',
      buttonColor: ''
    },
    {
      title: 'Unlock at 50+ users & earn 25% credits',
      isUnlocked: false,
      buttonText: '',
      buttonColor: ''
    }
  ];

  const tabs = [
    { id: 'all-referral-users', label: 'All Referral Users' },
    { id: 'active-referral-users', label: 'Active Referral Users' },
    { id: 'all-earning', label: 'All Earning' },
    { id: 'cashout-log', label: 'Cashout Log' }
  ];

  const getTableColumns = () => {
    switch (activeTab) {
      case 'all-referral-users':
        return [
          { key: 'id', label: 'Id' },
          { key: 'fullName', label: 'Full Name' },
          { key: 'mobileNo', label: 'Mobile No' },
          { key: 'email', label: 'Email' },
          { key: 'createTime', label: 'Create Time' }
        ];
      case 'active-referral-users':
        return [
          { key: 'id', label: 'Id' },
          { key: 'view', label: 'View' },
          { key: 'fullName', label: 'Full Name' },
          { key: 'mobileNo', label: 'Mobile No' },
          { key: 'email', label: 'Email' },
          { key: 'amount', label: 'Amount ($)' },
          { key: 'lastRechargeDate', label: 'Last Recharge Date' }
        ];
      case 'all-earning':
        return [
          { key: 'id', label: 'Id' },
          { key: 'view', label: 'View' },
          { key: 'activeUsers', label: 'Active Users' },
          { key: 'percentage', label: 'Percentage(%)' },
          { key: 'amount', label: 'Amount($)' },
          { key: 'description', label: 'Description' }
        ];
      case 'cashout-log':
        return [
          { key: 'id', label: 'Id' },
          { key: 'amount', label: 'Amount ($)' },
          { key: 'cashoutType', label: 'Cashout Type' },
          { key: 'status', label: 'Status' },
          { key: 'createTime', label: 'Create Time' },
          { key: 'updateTime', label: 'Update Time' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Referral</h1>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Total Pending Amount */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Total Pending Amount ($)</h3>
              <p className="text-white text-3xl font-bold">0</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleCreditClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Credit
            </button>
            <button 
              onClick={handleWithdrawClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-2">Invite your friends, earn rewards with every referral! 🎯</h3>
              <button 
                onClick={handleReferralLinkClick}
                className="bg-green-400 hover:bg-green-300 text-green-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Referral Link
              </button>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Gift className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.iconColor}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Sharing Percentage */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Sharing Percentage</span>
              <span className="text-gray-400 text-sm">Unlock Next Referral</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-xl font-bold">10%</span>
              <span className="text-red-400 text-sm">❤️ / 10</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
          </div>
        </div>

        {/* Milestone Cards */}
        {milestones.map((milestone, index) => (
          <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
            <p className="text-gray-300 text-sm mb-4">{milestone.title}</p>
            {milestone.isUnlocked ? (
              <button className={`${milestone.buttonColor} hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm transition-colors`}>
                {milestone.buttonText}
              </button>
            ) : (
              <div className="flex justify-center">
                <Lock className="w-8 h-8 text-yellow-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export and Search */}
      <div className="flex items-center justify-between mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white">
              <Grid className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-white">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                {getTableColumns().map((column) => (
                  <th key={column.key} className="text-left text-gray-300 text-sm font-medium p-4">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={getTableColumns().length} className="text-center text-gray-500 py-12">
                  There are no records to display
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;