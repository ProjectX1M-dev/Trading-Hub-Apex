import React, { useState } from 'react';
import { Search, Filter, RefreshCw, Download, Calendar, ChevronDown } from 'lucide-react';

const OrderHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('group-orders');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const groupOrderColumns = [
    { key: 'id', label: 'Id', searchable: false },
    { key: 'view', label: 'View', searchable: false },
    { key: 'groupName', label: 'Group Name', searchable: true, placeholder: 'Search Group Name' },
    { key: 'symbol', label: 'Symbol', searchable: true, placeholder: 'Search Symbol' },
    { key: 'type', label: 'Type', searchable: false, dropdown: true, options: ['Select Type', 'Buy', 'Sell'] },
    { key: 'volume', label: 'Volume', searchable: true, placeholder: 'Search Volume' },
    { key: 'price', label: 'Price($)', searchable: true, placeholder: 'Search Price($)' },
    { key: 'stopLoss', label: 'Stop Loss Price($)', searchable: true, placeholder: 'Search Stop Loss Price($)' },
    { key: 'takeProfit', label: 'SL (Stop Loss)', searchable: true, placeholder: 'Search SL (Stop Loss)' },
    { key: 'takeProfitTP', label: 'Take Profit (TP)', searchable: true, placeholder: 'Search Take Profit (TP)' },
    { key: 'orderFrom', label: 'Order From', searchable: false, dropdown: true, options: ['Select Order From', 'Manual', 'Auto', 'Signal'] },
    { key: 'placedOrder', label: 'Placed Order', searchable: false, dropdown: true, options: ['Select Placed Order', 'Pending', 'Executed', 'Cancelled'] },
    { key: 'cancelledOrder', label: 'Cancelled Order', searchable: false, dropdown: true, options: ['Select Cancelled Order', 'Yes', 'No'] },
    { key: 'createTime', label: 'Create Time', searchable: true, placeholder: 'Select Date' }
  ];

  const individualOrderColumns = [
    { key: 'id', label: 'Id', searchable: false },
    { key: 'accountName', label: 'Account Name', searchable: true, placeholder: 'Search Account Name' },
    { key: 'symbol', label: 'Symbol', searchable: true, placeholder: 'Search Symbol' },
    { key: 'ticket', label: 'Ticket', searchable: true, placeholder: 'Search Ticket' },
    { key: 'type', label: 'Type', searchable: false, dropdown: true, options: ['Select Type', 'Buy', 'Sell'] },
    { key: 'volume', label: 'Volume', searchable: true, placeholder: 'Search Volume' },
    { key: 'price', label: 'Price($)', searchable: true, placeholder: 'Search Price($)' },
    { key: 'stopLoss', label: 'SL (Stop Loss)', searchable: true, placeholder: 'Search SL (Stop Loss)' },
    { key: 'takeProfit', label: 'Take Profit (TP)', searchable: true, placeholder: 'Search Take Profit (TP)' },
    { key: 'state', label: 'State', searchable: false, dropdown: true, options: ['Select State', 'Open', 'Closed', 'Pending'] },
    { key: 'orderFrom', label: 'Order From', searchable: false, dropdown: true, options: ['Select Order From', 'Manual', 'Auto', 'Signal'] },
    { key: 'createTime', label: 'Create Time', searchable: true, placeholder: 'Select Date' }
  ];

  const currentColumns = activeTab === 'group-orders' ? groupOrderColumns : individualOrderColumns;

  const renderSearchInput = (column: any) => {
    if (!column.searchable && !column.dropdown) return null;

    if (column.dropdown) {
      return (
        <div className="relative">
          <select className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-green-500 appearance-none">
            {column.options.map((option: string, index: number) => (
              <option key={index} value={option === column.options[0] ? '' : option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      );
    }

    if (column.key === 'createTime') {
      return (
        <div className="relative">
          <input
            type="text"
            placeholder={column.placeholder}
            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
          <Calendar className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
        </div>
      );
    }

    return (
      <input
        type="text"
        placeholder={column.placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
      />
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Order History</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Select Date
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('group-orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'group-orders'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Group Orders
        </button>
        <button
          onClick={() => setActiveTab('individual-orders')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'individual-orders'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Individual Orders
        </button>
      </div>

      {/* Export Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                {currentColumns.map((column) => (
                  <th key={column.key} className="text-left text-gray-300 text-xs font-medium p-3 min-w-[120px]">
                    <div className="space-y-2">
                      <div>{column.label}</div>
                      {renderSearchInput(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={currentColumns.length} className="text-center text-gray-500 py-12">
                  There are no records to display
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Rows per page</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-green-500 appearance-none pr-6"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Showing 0 of 0 records</span>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-white disabled:opacity-50" disabled>
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <span className="text-gray-400 text-sm">1</span>
              <button className="p-1 text-gray-400 hover:text-white disabled:opacity-50" disabled>
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;