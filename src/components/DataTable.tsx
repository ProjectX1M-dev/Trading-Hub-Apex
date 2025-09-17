import React from 'react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  showViewLink?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data, showViewLink = true }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">{title}</h3>
        {showViewLink && (
          <button className="text-green-400 text-sm hover:text-green-300">View</button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left text-gray-400 text-sm font-medium p-4 ${column.width || ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-gray-500 py-8">
                  {title.includes('History') ? 'There is no record to display' : 'No records to display'}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-b-0">
                  {columns.map((column) => (
                    <td key={column.key} className="p-4 text-gray-300 text-sm">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;