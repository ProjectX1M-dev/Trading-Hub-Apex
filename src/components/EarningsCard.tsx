import React from 'react';
import { DollarSign } from 'lucide-react';

const EarningsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold mb-1">Referral Earning</h3>
          <p className="text-white text-3xl font-bold">$0</p>
          <p className="text-green-100 text-sm mt-2">Referral Users</p>
          <p className="text-green-100 text-sm">0</p>
        </div>
        <div className="text-right">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;