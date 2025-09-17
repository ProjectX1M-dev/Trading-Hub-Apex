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
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isCollapsed, setIsCollapsed }) => {
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
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gray-900 h-screen flex flex-col transition-all duration-300 ease-in-out relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors z-10"
      >
        {isCollapsed ? <Menu className="w-3 h-3" /> : <X className="w-3 h-3" />}
      </button>

      <div className="p-6">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
          {isCollapsed ? (
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          ) : (
            <img 
              src="/tradinghub_dark_logo.png" 
              alt="Trading Hub" 
              className="h-8"
            />
          )}
        </div>
        {!isCollapsed && (
          <div className="mt-4 text-sm text-gray-400">
            User: [v1.1.24.1]
          </div>
        )}
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
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2 rounded-lg text-left transition-colors relative group ${
                  activeItem === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-4 h-4" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Account Management Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Account Management
            </div>
          )}
          {accountManagementItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2 rounded-lg text-left transition-colors relative group ${
                  activeItem === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-4 h-4" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} text-green-400 text-sm w-full relative group`} title={isCollapsed ? 'Support' : ''}>
          <HelpCircle className="w-4 h-4" />
          {!isCollapsed && <span>Support</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Support
            </div>
          )}
        </button>
        {!isCollapsed && (
          <div className="mt-2 text-xs text-gray-500">
            inkigal.tattoo@...
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;