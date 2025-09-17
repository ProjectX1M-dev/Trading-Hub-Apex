import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Copy, 
  TrendingUp, 
  History, 
  Wallet, 
  UserPlus, 
  Activity, 
  User,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const accountManagementItems = [
    { id: 'accounts', label: 'Accounts', icon: Users },
    { id: 'copy-trading', label: 'Copy Trading', icon: Copy },
    { id: 'trading-view', label: 'TradingView', icon: TrendingUp },
    { id: 'order-history', label: 'Order History', icon: History },
    { id: 'wallet', label: 'Wallet ($0)', icon: Wallet },
    { id: 'referral', label: 'Referral', icon: UserPlus },
    { id: 'activity-logs', label: 'Activity Logs', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl font-bold">AlgoDeltaFX</span>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          User: [v1.1.24.1]
        </div>
      </div>

      <nav className="flex-1 px-4">
        {/* Dashboard Section */}
        <div className="mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeItem === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Account Management Section */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            Account Management
          </div>
          {accountManagementItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeItem === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center space-x-2 text-green-400 text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Support</span>
        </button>
        <div className="mt-2 text-xs text-gray-500">
          inkigal.tattoo@...
        </div>
      </div>
    </div>
  );
};

export default Sidebar;