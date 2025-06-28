
import React from 'react';
import { 
  Settings, 
  FileText, 
  Award, 
  BookOpen, 
  Briefcase,
  Home,
  LineChart,
  Menu,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen, 
  isMobile 
}: AdminSidebarProps) => {
  const sections = [
    { id: 'analytics', name: 'Analytics', icon: LineChart },
    { id: 'portfolio', name: 'Portfolio Info', icon: Home },
    { id: 'routes', name: 'Routes', icon: Settings },
    { id: 'skills', name: 'Skills', icon: Briefcase },
    { id: 'blogs', name: 'Blogs', icon: FileText },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'publications', name: 'Publications', icon: BookOpen }
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out' : 'relative'}
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        w-64 bg-gray-50 border-r lg:translate-x-0
      `}>
        <nav className="p-4 space-y-2 h-full overflow-y-auto">
          {isMobile && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="font-semibold">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm sm:text-base ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{section.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
