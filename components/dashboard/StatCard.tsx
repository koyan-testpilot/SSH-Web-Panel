import React from 'react';
import Icon from '../shared/Icon';

interface StatCardProps {
  title: string;
  value: string;
  icon: 'users' | 'user' | 'warning' | 'danger' | 'bandwidth';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
      <div>
        <p className="text-sm text-text-secondary font-medium">{title}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
      </div>
      <div className={`p-3 rounded-full bg-tertiary`}>
        <Icon name={icon} className={`w-7 h-7 ${color}`} />
      </div>
    </div>
  );
};

export default StatCard;