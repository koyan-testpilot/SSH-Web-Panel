import React, { useState, FormEvent } from 'react';
import { updateAdminCredentials } from '../../services/sshApiService';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

const Authentication: React.FC = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ text: 'New passwords do not match.', type: 'error' });
            return;
        }
        if (formData.newPassword.length < 8) {
            setMessage({ text: 'New password must be at least 8 characters long.', type: 'error' });
            return;
        }
        if (!formData.newUsername.trim()) {
            setMessage({ text: 'New username cannot be empty.', type: 'error' });
            return;
        }
        if (!formData.currentPassword) {
            setMessage({ text: 'Current password is required.', type: 'error' });
            return;
        }
        
        setLoading(true);
        try {
            const result = await updateAdminCredentials(formData.currentPassword, formData.newUsername, formData.newPassword);
            if (result.success) {
                setMessage({ text: 'Credentials updated successfully. You may need to log in again with your new credentials on your next session.', type: 'success' });
                setFormData({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
            } else {
                setMessage({ text: result.message || 'Failed to update credentials.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'An unexpected error occurred.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Authentication Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-text-secondary mb-1">Current Password</label>
                    <input 
                        type="password" 
                        name="currentPassword" 
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" 
                        required 
                    />
                </div>
                <hr className="border-slate-700" />
                <div>
                    <label htmlFor="newUsername" className="block text-sm font-medium text-text-secondary mb-1">New Username</label>
                    <input 
                        type="text" 
                        name="newUsername" 
                        id="newUsername"
                        value={formData.newUsername}
                        onChange={handleChange}
                        className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" 
                        required
                        placeholder="Enter a new username"
                    />
                </div>
                 <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">New Password</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" 
                        required
                        placeholder="Enter a new password"
                    />
                </div>
                 <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">Confirm New Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-tertiary border border-slate-600 rounded-md p-2 focus:ring-accent focus:border-accent" 
                        required
                        placeholder="Confirm the new password"
                    />
                </div>

                {message && (
                    <div className={`text-center p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                        {message.text}
                    </div>
                )}

                <div className="flex justify-end pt-2">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Credentials'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Authentication;