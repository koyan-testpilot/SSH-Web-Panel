import React, { useState } from 'react';
import { setInitialAdminCredentials } from '../../services/sshApiService';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

interface ChangeCredentialsFormProps {
  onCredentialsSet: () => void;
  onLogout: () => void;
}

const ChangeCredentialsForm: React.FC<ChangeCredentialsFormProps> = ({ onCredentialsSet, onLogout }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }
    if (!newUsername.trim()) {
        setError('Username cannot be empty.');
        return;
    }

    setLoading(true);
    try {
      const { success } = await setInitialAdminCredentials(newUsername, newPassword);
      if (success) {
        onCredentialsSet();
      } else {
        setError('Failed to update credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-xl shadow-2xl">
        <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="key" className="w-10 h-10 text-accent" />
                <h1 className="text-3xl font-bold text-text-primary">Set Up Your Account</h1>
            </div>
            <p className="text-text-secondary">For security, please change the default administrator credentials.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newUsername" className="block text-sm font-medium text-text-secondary mb-1">
              New Username
            </label>
            <input
              id="newUsername"
              name="newUsername"
              type="text"
              autoComplete="username"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full bg-tertiary border border-slate-600 rounded-md p-3 focus:ring-accent focus:border-accent"
              placeholder="Choose a new username"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-tertiary border border-slate-600 rounded-md p-3 focus:ring-accent focus:border-accent"
              placeholder="Enter new password"
            />
          </div>
          
           <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-tertiary border border-slate-600 rounded-md p-3 focus:ring-accent focus:border-accent"
              placeholder="Confirm new password"
            />
          </div>
          
          {error && <p className="text-sm text-danger text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Save and Continue'}
            </Button>
          </div>
        </form>
         <div className="text-center">
            <Button variant="secondary" onClick={onLogout} className="text-sm">
              Logout
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeCredentialsForm;
