
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUsers } from '../../services/sshApiService';
import { User } from '../../types';

const BandwidthChart: React.FC = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            const users = await getUsers();
            // Show top 10 users by usage for a cleaner chart
            const sortedUsers = [...users].sort((a, b) => b.bandwidthUsage - a.bandwidthUsage).slice(0, 10);
            setData(sortedUsers);
        };
        fetchChartData();
    }, []);

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="username" stroke="#94a3b8" />
          <YAxis unit=" GB" stroke="#94a3b8" />
          <Tooltip 
            cursor={{fill: '#1e293b'}}
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#f8fafc' }} 
           />
          <Legend />
          <Bar dataKey="bandwidthUsage" name="Usage (GB)" fill="#38bdf8" />
          <Bar dataKey="bandwidthLimit" name="Limit (GB)" fill="#475569" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BandwidthChart;
