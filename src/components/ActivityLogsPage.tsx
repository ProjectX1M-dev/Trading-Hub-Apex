import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  ChevronDown, 
  Grid,
  List
} from 'lucide-react';

interface ActivityLog {
  id: number;
  description: string;
  note: string;
  createTime: string;
}

interface ActivityLogsPageProps {
  toast: {
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
  };
}

const ActivityLogsPage: React.FC<ActivityLogsPageProps> = ({ toast }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDescription, setSearchDescription] = useState('');
  const [searchNote, setSearchNote] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleExport = () => {
    toast.success('Export Started', 'Your activity logs are being prepared for download');
  };

  const handleDateSelect = () => {
    toast.info('Date Filter', 'Select a date to filter your activity logs');
  };

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      description: 'Payment Request Generated',
      note: 'Payment Request Generated Using PayPal',
      createTime: '2025-09-17 21:04:04'
    },
    {
      id: 2,
      description: 'Regenerate Bridge Key',
      note: 'Test Bridge Key Regenerated Successfully !',
      createTime: '2025-09-17 20:56:10'
    },
    {
      id: 3,
      description: 'Add Bridge',
      note: 'Bridge Test Created Successfully ! Bridge ID: 1506',
      createTime: '2025-09-17 20:54:47'
    },
    {
      id: 4,
      description: 'Remove Bridge',
      note: '45 Bridge Deleted Successfully !',
      createTime: '2025-09-17 20:35:51'
    },
    {
      id: 5,
      description: 'Update Bridge Trading Flag',
      note: 'Bridge Trading Flag Turned Off! Bridge Strategy ID...',
      createTime: '2025-09-17 20:35:24'
    },
    {
      id: 6,
      description: 'Add Bridge',
      note: 'Bridge 45 Created Successfully ! Bridge ID: 1505',
      createTime: '2025-09-17 20:35:08'
    },
    {
      id: 7,
      description: 'Profile Updation',
      note: 'User Updated Profile Data',
      createTime: '2025-09-17 20:32:52'
    },
    {
      id: 8,
      description: 'Login',
      note: 'inkigal.tattoo@gmail.com logged in at Wed Sep 17 2...',
      createTime: '2025-09-17 20:29:52'
    },
    {
      id: 9,
      description: 'Login',
      note: 'inkigal.tattoo@gmail.com logged in at Wed Sep 17 2...',
      createTime: '2025-09-17 20:15:26'
    },
    {
      id: 10,
      description: 'Login',
      note: 'inkigal.tattoo@gmail.com logged in at Wed Sep 17 2...',
      createTime: '2025-09-17 20:03:08'
    }
  ]);

  const filteredLogs = activityLogs.filter(log => {
    const matchesDescription = searchDescription === '' || log.description.toLowerCase().includes(searchDescription.toLowerCase());
    const matchesNote = searchNote === '' || log.note.toLowerCase().includes(searchNote.toLowerCase());
    const matchesDate = selectedDate === '' || log.createTime.includes(selectedDate);
    
    return matchesDescription && matchesNote && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Activity Logs</h1>
      </div>

      {/* Export and View Controls */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleDateSelect}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Select Date
          </button>
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

      {/* Activity Logs Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-300 text-sm font-medium p-4 w-16">
                  Id
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[200px]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>Description</span>
                      <div className="flex flex-col">
                        <div className="w-2 h-1 bg-gray-400"></div>
                        <div className="w-2 h-1 bg-gray-400 mt-0.5"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Description"
                      value={searchDescription}
                      onChange={(e) => setSearchDescription(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[300px]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>Note</span>
                      <div className="flex flex-col">
                        <div className="w-2 h-1 bg-gray-400"></div>
                        <div className="w-2 h-1 bg-gray-400 mt-0.5"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Note"
                      value={searchNote}
                      onChange={(e) => setSearchNote(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </th>
                <th className="text-left text-gray-300 text-sm font-medium p-4 min-w-[180px]">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span>Create Time</span>
                      <div className="flex flex-col">
                        <div className="w-2 h-1 bg-gray-400"></div>
                        <div className="w-2 h-1 bg-gray-400 mt-0.5"></div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select Date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-12">
                    No activity logs found
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-750">
                    <td className="p-4 text-gray-300 text-sm">{log.id}</td>
                    <td className="p-4 text-gray-300 text-sm">{log.description}</td>
                    <td className="p-4 text-gray-300 text-sm">{log.note}</td>
                    <td className="p-4 text-gray-300 text-sm">{log.createTime}</td>
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
              Showing {Math.min(startIndex + 1, filteredLogs.length)} of {filteredLogs.length} records
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50 text-sm" 
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <div className="flex space-x-1">
                <button className="px-2 py-1 bg-green-600 text-white rounded text-sm">
                  1
                </button>
                <button className="px-2 py-1 text-gray-400 hover:text-white text-sm">
                  2
                </button>
              </div>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50 text-sm" 
                disabled={currentPage === totalPages || totalPages === 0}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;