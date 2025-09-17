import React from 'react';
import { Gift } from 'lucide-react';

const ReferralBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gift className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-white font-semibold">Get Rewarded for Sharing</h3>
            <p className="text-green-100 text-sm">Invite your friends, earn rewards with every referral 🎯</p>
          </div>
        </div>
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Referral Link
        </button>
      </div>
    </div>
  );
};

export default ReferralBanner;