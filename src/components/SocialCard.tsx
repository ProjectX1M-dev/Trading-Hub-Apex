import React from 'react';
import { Youtube, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const SocialCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold mb-1">Follow us on social media</h3>
          <p className="text-green-100 text-sm mb-4">Stay in touch</p>
          <div className="flex space-x-3">
            <Youtube className="w-6 h-6 text-white hover:text-green-200 cursor-pointer" />
            <Instagram className="w-6 h-6 text-white hover:text-green-200 cursor-pointer" />
            <Facebook className="w-6 h-6 text-white hover:text-green-200 cursor-pointer" />
            <Twitter className="w-6 h-6 text-white hover:text-green-200 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-white hover:text-green-200 cursor-pointer" />
          </div>
        </div>
        <div className="text-right">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;