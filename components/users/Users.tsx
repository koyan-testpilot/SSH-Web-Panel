
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserStatus } from '../../types';
import { getUsers as fetchUsers, addUser as apiAddUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser, resetUserBandwidth } from '../../services/sshApiService';
import UsersTable from './UsersTable';
import UserFormModal from './UserFormModal';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await apiDeleteUser(userId);
      loadUsers();
    }
  };

  const handleResetBandwidth = async (userId: string) => {
    if (window.confirm('Are you sure you want to reset bandwidth for this user?')) {
      await resetUserBandwidth(userId);
      loadUsers();
    }
  };

  const handleSaveUser = async (user: Omit<User, 'id' | 'status'>) => {
    if (editingUser) {
      await apiUpdateUser(editingUser.id, user);
    } else {
      await apiAddUser(user);
    }
    loadUsers();
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleAddUser} variant="primary">
          Add New User
        </Button>
      </div>
      
      <div className="bg-secondary shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center items-center"><Spinner /></div>
        ) : (
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onResetBandwidth={handleResetBandwidth}
          />
        )}
      </div>

      {isModalOpen && (
        <UserFormModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Users;
