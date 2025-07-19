import React from 'react';
import { ServerDetails, ServiceStatus } from '../../types';
import Icon from '../shared/Icon';

interface ServerInfoProps {
  details: ServerDetails;
}

const InfoCard: React.FC<{ icon: string; title: string; value: string }> = ({ icon, title, value }) => (
    <div className="bg-tertiary p-4 rounded-lg flex items-center gap-4">
        <Icon name={icon} className="w-6 h-6 text-accent" />
        <div>
            <p className="text-sm text-text-secondary">{title}</p>
            <p className="font-semibold text-text-primary">{value}</p>
        </div>
    </div>
);

const ServerInfo: React.FC<ServerInfoProps> = ({ details }) => {
  return (
    <div className="bg-secondary p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">Server Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <InfoCard icon="info" title="IP Address" value={details.ipAddress} />
            <InfoCard icon="globe" title="Domain" value={details.domain} />
            <InfoCard icon="server" title="Operating System" value={details.os} />
            <InfoCard icon="clock" title="Uptime" value={details.uptime} />
        </div>
        <div>
            <h4 className="font-semibold text-text-primary mb-3">Service Status</h4>
            <div className="space-y-2">
                {details.services.map(service => (
                    <div key={service.name} className="flex items-center justify-between bg-tertiary p-3 rounded-md">
                        <span className="font-medium text-text-secondary">{service.name}</span>
                        <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${service.status === ServiceStatus.Active ? 'bg-success' : 'bg-danger'}`}></span>
                            <span className={`text-sm font-semibold ${service.status === ServiceStatus.Active ? 'text-success' : 'text-danger'}`}>{service.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ServerInfo;
