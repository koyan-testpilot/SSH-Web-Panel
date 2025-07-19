import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import Users from './components/users/Users';
import Installation from './components/installation/Installation';
import Authentication from './components/authentication/Authentication';
import Help from './components/help/Help';
import Login from './components/auth/Login';
import ChangeCredentialsForm from './components/auth/ChangeCredentialsForm';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsCredentialChange, setNeedsCredentialChange] = useState(false);

  const handleLoginSuccess = (isDefault: boolean) => {
    setIsAuthenticated(true);
    setNeedsCredentialChange(isDefault);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setNeedsCredentialChange(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'authentication':
        return <Authentication />;
      case 'installation':
        return <Installation />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (needsCredentialChange) {
    return <ChangeCredentialsForm onCredentialsSet={() => setNeedsCredentialChange(false)} onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen bg-primary text-text-primary">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;