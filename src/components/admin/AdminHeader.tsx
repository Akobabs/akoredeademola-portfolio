
import React from 'react';
import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const AdminHeader = ({ isMobile, setSidebarOpen, sidebarOpen, setIsLoggedIn }: AdminHeaderProps) => {
  return (
    <div className="border-b p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
            Portfolio Admin Panel
          </h1>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="px-3 py-2 sm:px-4 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
