import React from 'react';
import { Menu, X } from 'lucide-react';

interface TopNavBarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  onStartTour: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  onStartTour 
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left side - Toggle and Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
        
        <div className="flex items-center space-x-3">
          {sidebarCollapsed ? (
            <div className="flex items-center space-x-2">
              <img 
                src="/icon128.png" 
                alt="Trading Hub" 
                className="h-8 w-8"
              />
              <span className="text-white font-bold text-lg">Trading Hub</span>
            </div>
          ) : (
            <img 
              src="/tradinghub_dark_logo.png" 
              alt="Trading Hub" 
              className="h-8"
            />
          )}
        </div>
      </div>

      {/* Center - User Info */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 text-sm">
          User: [v1.1.24.1]
        </span>
      </div>

      {/* Right side - Start Tour Button */}
      <div className="flex items-center">
        <button
          onClick={onStartTour}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500"
        >
          Start Tour
        </button>
      </div>
    </div>
  );
};

export default TopNavBar;