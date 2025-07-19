import React from 'react';
import Icon from '../shared/Icon';
import { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Users', icon: 'users' },
    { id: 'authentication', label: 'Authentication', icon: 'key' },
    { id: 'installation', label: 'Installation', icon: 'command-line' },
    { id: 'help', label: 'GitHub Guide', icon: 'help' },
  ];

  return (
    <aside className="w-64 bg-secondary flex-shrink-0 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 p-3 mb-8">
          <Icon name="server" className="w-8 h-8 text-accent" />
          <h1 className="text-xl font-bold text-text-primary">SSH Panel</h1>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={`w-full flex items-center gap-3 p-3 my-1 rounded-lg transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'text-text-secondary hover:bg-tertiary hover:text-text-primary'
                  }`}
                >
                  <Icon name={item.icon as any} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-center text-xs text-slate-500">
        <p>&copy; 2024 SSH Web Panel</p>
        <p>Created with React & Gemini</p>
      </div>
    </aside>
  );
};

export default Sidebar;