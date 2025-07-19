import React, { useState } from 'react';
import { login } from '../../services/sshApiService';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

interface LoginProps {
  onLoginSuccess: (isDefault: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { success, isDefault } = await login(username, password);
      if (success) {
        onLoginSuccess(isDefault);
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-xl shadow-2xl">
        <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="server" className="w-10 h-10 text-accent" />
                <h1 className="text-3xl font-bold text-text-primary">SSH Panel Login</h1>
            </div>
            <p className="text-text-secondary">Sign in to manage your server</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-tertiary border border-slate-600 rounded-md p-3 focus:ring-accent focus:border-accent"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-tertiary border border-slate-600 rounded-md p-3 focus:ring-accent focus:border-accent"
              placeholder="password"
            />
          </div>
          
          {error && <p className="text-sm text-danger text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;