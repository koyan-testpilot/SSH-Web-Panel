export enum UserStatus {
  Active = 'Active',
  Expired = 'Expired',
  Depleting = 'Depleting',
  Exhausted = 'Exhausted',
}

export interface User {
  id: string;
  username: string;
  password?: string;
  expireDate: string;
  bandwidthLimit: number; // in GB
  bandwidthUsage: number; // in GB
  deviceLimit: number;
  onlineDevices: number;
  status: UserStatus;
}

export interface DashboardStats {
  totalUsers: number;
  onlineUsers: number;
  expiringSoon: number;
  expiredOrExhausted: number;
  totalBandwidth: number;
}

export type Page = 'dashboard' | 'users' | 'installation' | 'help';

// New types for Server Status
export enum ServiceStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export interface Service {
    name: string;
    status: ServiceStatus;
}

export interface ServerDetails {
    ipAddress: string;
    domain: string;
    os: string;
    uptime: string;
    services: Service[];
}