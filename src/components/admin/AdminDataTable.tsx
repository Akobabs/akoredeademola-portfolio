
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface AdminDataTableProps {
  data: any[];
  activeSection: string;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

const AdminDataTable = ({ data, activeSection, onEdit, onDelete }: AdminDataTableProps) => {
  const getDetailsText = (item: any) => {
    switch (activeSection) {
      case 'routes':
        return `${item.path} - Order: ${item.order}`;
      case 'skills':
        return `${item.category} - ${item.proficiency}%`;
      case 'blogs':
        return `${item.category} - ${item.readTime} min read`;
      case 'achievements':
        return `${item.organization} - ${item.date}`;
      case 'publications':
        return `${item.journal} - ${item.authors}`;
      default:
        return '';
    }
  };

  const getStatusText = (item: any) => {
    return item.status || (item.featured ? 'Featured' : 'Active');
  };

  const getStatusClass = (item: any) => {
    return (item.status === 'published' || item.featured) 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Title
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status/Info
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                    {item.name || item.title}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4">
                  <div className="text-xs sm:text-sm text-gray-600">
                    {getDetailsText(item)}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item)}`}>
                    {getStatusText(item)}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDataTable;
