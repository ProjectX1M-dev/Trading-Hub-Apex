import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import AccountsPage from './components/AccountsPage';
import CopyTradingPage from './components/CopyTradingPage';
import TradingViewPage from './components/TradingViewPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import WalletPage from './components/WalletPage';
import ReferralPage from './components/ReferralPage';
import ActivityLogsPage from './components/ActivityLogsPage';
import ProfilePage from './components/ProfilePage';
import StatsCard from './components/StatsCard';
import ReferralBanner from './components/ReferralBanner';
import SocialCard from './components/SocialCard';
import EarningsCard from './components/EarningsCard';
import DataTable from './components/DataTable';
import { 
  Users, 
  Link, 
  UserX, 
  Clock, 
  User, 
  ShoppingCart,
  TrendingUp,
  Signal,
  Eye,
  BarChart3
} from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeItem) {
      case 'accounts':
        return <AccountsPage />;
      case 'copy-trading':
        return <CopyTradingPage />;
      case 'trading-view':
        return <TradingViewPage />;
      case 'order-history':
        return <OrderHistoryPage />;
      case 'wallet':
        return <WalletPage />;
      case 'referral':
        return <ReferralPage />;
      case 'activity-logs':
        return <ActivityLogsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="p-6">
      <ReferralBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Account Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Account</h2>
            <button className="text-green-400 text-sm hover:text-green-300">View</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {accountStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
              />
            ))}
          </div>
        </div>

        {/* Group Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Group</h2>
            <button className="text-green-400 text-sm hover:text-green-300">View</button>
          </div>
          <div className="space-y-3">
            {groupStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
              />
            ))}
          </div>
        </div>

        {/* Trading View Connector Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Trading View Connector</h2>
            <button className="text-green-400 text-sm hover:text-green-300">View</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tradingStats.slice(0, 4).map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
              />
            ))}
          </div>
          <div className="mt-3">
            <StatsCard
              title={tradingStats[4].title}
              value={tradingStats[4].value}
              icon={tradingStats[4].icon}
              iconColor={tradingStats[4].iconColor}
            />
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">Total Credit</h3>
              <p className="text-white text-3xl font-bold">$6</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <SocialCard />
        <EarningsCard />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DataTable
          title="Today Orders"
          columns={[{ key: 'message', label: '' }]}
          data={[]}
        />
        
        <DataTable
          title="Wallet History"
          columns={walletHistoryColumns}
          data={walletHistoryData}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          title="Individual Orders History"
          columns={orderHistoryColumns}
          data={[]}
        />
        
        <DataTable
          title="Group Orders History"
          columns={groupOrderHistoryColumns}
          data={[]}
        />
      </div>
    </div>
  );

  const accountStats = [
    { title: 'Total', value: '0', icon: Users, iconColor: 'bg-purple-600' },
    { title: 'Connected', value: '0', icon: Link, iconColor: 'bg-green-600' },
    { title: 'Disconnected', value: '0', icon: UserX, iconColor: 'bg-red-600' },
    { title: 'Expired', value: '0', icon: Clock, iconColor: 'bg-orange-600' },
    { title: 'Waiting Allocation', value: '0', icon: User, iconColor: 'bg-gray-600' },
    { title: 'Today Orders', value: '0', icon: ShoppingCart, iconColor: 'bg-purple-600' },
  ];

  const groupStats = [
    { title: 'Master Connected', value: '-', icon: Link, iconColor: 'bg-green-600' },
    { title: 'Total Child', value: '0', icon: Users, iconColor: 'bg-orange-600' },
    { title: "Today's Orders", value: '0', icon: ShoppingCart, iconColor: 'bg-purple-600' },
  ];

  const tradingStats = [
    { title: 'Connected', value: '-', icon: Link, iconColor: 'bg-green-600' },
    { title: 'Open Positions', value: '0', icon: TrendingUp, iconColor: 'bg-orange-600' },
    { title: 'Last Signal', value: '-', icon: Signal, iconColor: 'bg-yellow-600' },
    { title: "Today's Signals", value: '0', icon: BarChart3, iconColor: 'bg-green-600' },
    { title: "Today's Orders", value: '0', icon: ShoppingCart, iconColor: 'bg-purple-600' },
  ];

  const walletHistoryColumns = [
    { key: 'amount', label: 'Amount($)' },
    { key: 'type', label: 'Transaction Type' },
    { key: 'description', label: 'Description' },
    { key: 'note', label: 'Note' },
    { key: 'createTime', label: 'Create Time' },
  ];

  const walletHistoryData = [
    {
      amount: '6',
      type: 'Credit',
      description: '$6 Joining Bonus',
      note: 'Joining Bonus',
      createTime: '2025-09-17 17:59:25'
    }
  ];

  const orderHistoryColumns = [
    { key: 'accountName', label: 'Account Name' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'ticket', label: 'Ticket' },
    { key: 'type', label: 'Type' },
    { key: 'volume', label: 'Volume' },
    { key: 'price', label: 'Price($)' },
    { key: 'sl', label: 'SL (Stop Loss)' },
    { key: 'takeProfit', label: 'Take Profit' },
  ];

  const groupOrderHistoryColumns = [
    { key: 'groupName', label: 'Group Name' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'type', label: 'Type' },
    { key: 'volume', label: 'Volume' },
    { key: 'price', label: 'Price($)' },
    { key: 'sl', label: 'SL (Stop Loss)' },
    { key: 'takeProfit', label: 'Take Profit (TP)' },
    { key: 'orders', label: 'Orders' },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;