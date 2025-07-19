import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import BandwidthChart from './BandwidthChart';
import OnlineUsersTable from './OnlineUsersTable';
import { getDashboardStats, getOnlineUsers, getServerDetails } from '../../services/sshApiService';
import { DashboardStats, User, ServerDetails } from '../../types';
import Spinner from '../shared/Spinner';
import ServerInfo from './ServerInfo';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[] | null>(null);
  const [serverDetails, setServerDetails] = useState<ServerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, onlineUsersData, serverDetailsData] = await Promise.all([
          getDashboardStats(),
          getOnlineUsers(),
          getServerDetails(),
        ]);
        setStats(statsData);
        setOnlineUsers(onlineUsersData);
        setServerDetails(serverDetailsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  if (!stats || !onlineUsers || !serverDetails) {
    return <div className="text-center text-danger">Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-8">
      <ServerInfo details={serverDetails} />
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers.toString()} icon="users" color="text-accent" />
        <StatCard title="Online Users" value={stats.onlineUsers.toString()} icon="user" color="text-success" />
        <StatCard title="Expire Soon" value={stats.expiringSoon.toString()} icon="warning" color="text-warning" />
        <StatCard title="Expired" value={stats.expiredOrExhausted.toString()} icon="danger" color="text-danger" />
        <StatCard title="Total Bandwidth Used" value={`${stats.totalBandwidth.toFixed(2)} GB`} icon="bandwidth" color="text-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">Bandwidth Usage by User</h3>
          <BandwidthChart />
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">Currently Online</h3>
          <OnlineUsersTable users={onlineUsers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;