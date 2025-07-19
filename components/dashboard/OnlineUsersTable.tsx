
import React from 'react';
import { User } from '../../types';
import Icon from '../shared/Icon';

interface OnlineUsersTableProps {
  users: User[];
}

const OnlineUsersTable: React.FC<OnlineUsersTableProps> = ({ users }) => {
  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.id} className="flex items-center justify-between bg-tertiary p-3 rounded-lg">
            <div className="flex items-center gap-3">
               <Icon name="user" className="w-5 h-5 text-text-secondary"/>
               <span className="font-medium text-text-primary">{user.username}</span>
            </div>
            <div className="text-right">
                <p className="text-sm text-success font-semibold">{user.onlineDevices} / {user.deviceLimit}</p>
                <p className="text-xs text-text-secondary">Devices</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-text-secondary text-center py-4">No users are currently online.</p>
      )}
    </div>
  );
};

export default OnlineUsersTable;
