import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PenTool, Layout, FileText, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transition-transform duration-200 ease-in-out lg:translate-x-0 transform">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <PenTool className="h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">CopyGenius</span>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
              isActive('/dashboard') 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/dashboard/projects')}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
              isActive('/dashboard/projects') 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Projects
          </button>
          <button 
            onClick={() => navigate('/dashboard/settings')}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
              isActive('/dashboard/settings') 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}