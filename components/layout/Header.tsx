
import React from 'react';
import { Page } from '../../types';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

interface HeaderProps {
    currentPage: Page;
    onLogout: () => void;
}

const pageTitles: Record<Page, string> = {
    dashboard: "Dashboard Overview",
    users: "User Management",
    installation: "VPS Installation Guide",
    help: "GitHub Deployment Guide"
}

const Header: React.FC<HeaderProps> = ({ currentPage, onLogout }) => {
  return (
    <header className="bg-secondary p-4 shadow-md z-10 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-text-primary capitalize">{pageTitles[currentPage]}</h2>
      <Button onClick={onLogout} variant="icon" title="Logout">
        <Icon name="logout" className="w-6 h-6 text-text-secondary hover:text-danger" />
      </Button>
    </header>
  );
};

export default Header;
