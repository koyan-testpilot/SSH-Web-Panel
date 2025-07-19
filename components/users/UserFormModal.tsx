
import React, { useState } from 'react';
import { User } from '../../types';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { generateSecurePassword } from '../../services/geminiService';

interface UserFormModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (user: Omit<User, 'id' | 'status'>) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: '',
    expireDate: user?.expireDate || new Date().toISOString().split('T')[0],
    bandwidthLimit: user?.bandwidthLimit || 50,
    deviceLimit: user?.deviceLimit || 1,
  });
  const [isGeneratingPassword, setIsGeneratingPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

  const handleGeneratePassword = async () => {
    setIsGeneratingPassword(true);
    try {
        const password = await generateSecurePassword();
        setFormData(prev => ({...prev, password}));
    } catch (error) {
        console.error("Failed to generate password:", error);
        alert("Could not generate a password. Please try again.");
    } finally {
        setIsGeneratingPassword(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.expireDate) {
        alert("Please fill in all required fields.");
        return;
    }
    if (!user && !formData.password) {
        alert("Password is required for new users.");
        return;
    }
    onSave({
      ...formData,
      // Mock data for usage/online for new users
      bandwidthUsage: user?.bandwidthUsage || 0,
      onlineDevices: user?.onlineDevices || 0,
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal title={user ? 'Edit User' : 'Add New User'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">Username</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password {user && '(Leave blank to keep unchanged)'}</label>
          <div className="flex gap-2">
            <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" />
            <Button type="button" onClick={handleGeneratePassword} disabled={isGeneratingPassword}>
              {isGeneratingPassword ? '...' : 'Generate'}
            </Button>
          </div>
        </div>
        <div>
          <label htmlFor="expireDate" className="block text-sm font-medium text-text-secondary mb-1">Expire Date</label>
          <input type="date" name="expireDate" id="expireDate" min={today} value={formData.expireDate} onChange={handleChange} className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="bandwidthLimit" className="block text-sm font-medium text-text-secondary mb-1">Bandwidth Limit (GB)</label>
                <input type="number" name="bandwidthLimit" id="bandwidthLimit" value={formData.bandwidthLimit} onChange={handleChange} className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" min="1" required />
            </div>
            <div>
                <label htmlFor="deviceLimit" className="block text-sm font-medium text-text-secondary mb-1">Device Limit</label>
                <input type="number" name="deviceLimit" id="deviceLimit" value={formData.deviceLimit} onChange={handleChange} className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" min="1" required />
            </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save User</Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
