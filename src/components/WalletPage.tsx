import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Calendar, 
  ChevronDown,
  X,
  DollarSign
} from 'lucide-react';

interface Transaction {
  id: number;
  amount: number;
  type: 'Credit' | 'Debit';
  description: string;
  createTime: string;
}

const WalletPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState('OTHER');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchAmount, setSearchAmount] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      amount: 6,
      type: 'Credit',
      description: '$6 Joining Bonus',
      createTime: '2025-09-17 19:59:25'
    }
  ]);

  const totalBalance = transactions.reduce((sum, transaction) => {
    return transaction.type === 'Credit' ? sum + transaction.amount : sum - transaction.amount;
  }, 0);

  const transactionTypes = [
    'OTHER',
    'DEPOSIT',
    'WITHDRAWAL',
    'BONUS',
    'COMMISSION',
    'REFUND'
  ];

  const handleAddAmount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      amount: parseFloat(amount),
      type: 'Credit',
      description: description,
      createTime: new Date().toLocaleString('sv-SE').replace('T', ' ')
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setDescription('');
    setShowAddModal(false);
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setAmount('');
    setDescription('');
    setSelectedTransactionType('OTHER');
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesAmount = searchAmount === '' || transaction.amount.toString().includes(searchAmount);
    const matchesDescription = searchDescription === '' || transaction.description.toLowerCase().includes(searchDescription.toLowerCase());
    const matchesType = selectedTypeFilter === '' || selectedTypeFilter === 'Select Option' || transaction.type === selectedTypeFilter;
    const matchesDate = selectedDate === '' || transaction.createTime.includes(selectedDate);
    
    return matchesAmount && matchesDescription && matchesType && matchesDate;
  });

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Wallet</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">
            Balance: ${totalBalance}
          </div>
        </div>
      </div>

      {/* Add Amount Section */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <h2 className="text-white text-lg font-semibold mb-4">Add Amount</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedTransactionType}
              onChange={(e) => setSelectedTransactionType(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 appearance-none pr-10 min-w-[120px]"
            >
              {transactionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          <input
            type="number"
            placeholder="Enter Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            Select Date
          </button>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white">
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
      </div>

      {/* Transaction History Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-300 text-sm font-medium p-4">
                  <div className="space-y-2">
                    <div>Id</div>
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[150px]">
                  <div className="space-y-2">
                    <div>Amount ($)</div>
                    <input
                      type="text"
                      placeholder="Search Amount ($)"
                      value={searchAmount}
                      onChange={(e) => setSearchAmount(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[150px]">
                  <div className="space-y-2">
                    <div>Transaction Type</div>
                    <div className="relative">
                      <select
                        value={selectedTypeFilter}
                        onChange={(e) => setSelectedTypeFilter(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-green-500 appearance-none"
                      >
                        <option value="">Select Option</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[200px]">
                  <div className="space-y-2">
                    <div>Description</div>
                    <input
                      type="text"
                      placeholder="Search Description"
                      value={searchDescription}
                      onChange={(e) => setSearchDescription(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[180px]">
                  <div className="space-y-2">
                    <div>Create Time</div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select Date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                      />
                      <Calendar className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-12">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700 last:border-b-0">
                    <td className="p-4 text-gray-300 text-sm">{transaction.id}</td>
                    <td className="p-4 text-gray-300 text-sm">{transaction.amount}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.type === 'Credit' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 text-sm">{transaction.description}</td>
                    <td className="p-4 text-gray-300 text-sm">{transaction.createTime}</td>
                  </tr>
                ))
              )}
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
            <span className="text-gray-400 text-sm">
              Showing {Math.min(startIndex + 1, filteredTransactions.length)} of {filteredTransactions.length} records
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-50" 
                disabled={currentPage === 1}
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <span className="text-gray-400 text-sm">{currentPage}</span>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-50" 
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Amount Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <div className="w-6 h-6 bg-green-600 rounded mr-2 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                Add Amount
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAmount} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Transaction Type
                </label>
                <div className="relative">
                  <select
                    value={selectedTransactionType}
                    onChange={(e) => setSelectedTransactionType(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500 appearance-none"
                  >
                    {transactionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
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

export default WalletPage;