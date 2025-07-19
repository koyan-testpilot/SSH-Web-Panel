
import React from 'react';
import { User, UserStatus } from '../../types';
import Button from '../shared/Button';
import Icon from '../shared/Icon';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onResetBandwidth: (userId: string) => void;
}

const StatusBadge: React.FC<{ status: UserStatus }> = ({ status }) => {
  const statusClasses = {
    [UserStatus.Active]: 'bg-green-500/20 text-green-400',
    [UserStatus.Depleting]: 'bg-yellow-500/20 text-yellow-400',
    [UserStatus.Exhausted]: 'bg-red-500/20 text-red-400',
    [UserStatus.Expired]: 'bg-slate-500/20 text-slate-400',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete, onResetBandwidth }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-tertiary">
          <tr>
            <th className="p-4 font-semibold text-text-secondary">Username</th>
            <th className="p-4 font-semibold text-text-secondary">Status</th>
            <th className="p-4 font-semibold text-text-secondary">Expire Date</th>
            <th className="p-4 font-semibold text-text-secondary">Bandwidth</th>
            <th className="p-4 font-semibold text-text-secondary">Devices</th>
            <th className="p-4 font-semibold text-text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tertiary">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-tertiary/50">
              <td className="p-4 font-medium">{user.username}</td>
              <td className="p-4"><StatusBadge status={user.status} /></td>
              <td className="p-4 text-text-secondary">{user.expireDate}</td>
              <td className="p-4">
                <div className="w-full bg-tertiary rounded-full h-2.5">
                  <div 
                    className="bg-accent h-2.5 rounded-full" 
                    style={{ width: `${(user.bandwidthUsage / user.bandwidthLimit) * 100}%` }}>
                  </div>
                </div>
                <div className="text-xs text-text-secondary mt-1">{user.bandwidthUsage.toFixed(1)}GB / {user.bandwidthLimit}GB</div>
              </td>
              <td className="p-4 text-text-secondary">{user.onlineDevices} / {user.deviceLimit}</td>
              <td className="p-4 text-right space-x-2">
                 <Button onClick={() => onResetBandwidth(user.id)} variant="icon" title="Reset Bandwidth">
                   <Icon name="refresh" className="w-5 h-5"/>
                </Button>
                <Button onClick={() => onEdit(user)} variant="icon" title="Edit User">
                    <Icon name="edit" className="w-5 h-5"/>
                </Button>
                <Button onClick={() => onDelete(user.id)} variant="icon" title="Delete User">
                    <Icon name="delete" className="w-5 h-5 text-danger"/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
