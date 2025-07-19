
import { MOCK_USERS } from '../constants';
import { User, DashboardStats, UserStatus, ServerDetails, Service, ServiceStatus } from '../types';

// The "database". Initialize with a deep copy of mock data.
let users: User[] = JSON.parse(JSON.stringify(MOCK_USERS));
let adminCredentials = { username: 'admin', password: 'password' };
let isDefaultCredentials = true;

const SIMULATED_DELAY = 500; // ms

// Simulate a server boot time to calculate uptime dynamically.
// This will be a random time within the last 30 days, persisted in localStorage.
const getPersistentServerBootTime = (): Date => {
    const storedBootTime = localStorage.getItem('ssh_panel_boot_time');
    if (storedBootTime) {
        // Use the stored time if it exists
        return new Date(parseInt(storedBootTime, 10));
    }
    // Otherwise, create a new time and store it
    const newBootTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    localStorage.setItem('ssh_panel_boot_time', newBootTime.getTime().toString());
    return newBootTime;
};

const serverBootTime = getPersistentServerBootTime();


// Helper to simulate network delay and return deep copies to prevent state leakage
const simulateApi = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Deep copy to simulate receiving data from an API
            resolve(JSON.parse(JSON.stringify(data)));
        }, SIMULATED_DELAY / 2); // Reduced delay for faster UI updates
    });
};

/**
 * A pure function that takes a user object and returns a new user object
 * with the status property correctly calculated based on other properties.
 * @param user The user to process.
 * @returns A new user object with the correct status.
 */
const withUpdatedStatus = (user: User): User => {
    const today = new Date();
    const expireDate = new Date(user.expireDate);
    let status: UserStatus;

    if (expireDate < today) {
        status = UserStatus.Expired;
    } else if (user.bandwidthUsage >= user.bandwidthLimit) {
        status = UserStatus.Exhausted;
    } else if (user.bandwidthUsage / user.bandwidthLimit >= 0.8) {
        status = UserStatus.Depleting;
    } else {
        status = UserStatus.Active;
    }

    // Return a new object to maintain immutability
    return { ...user, status };
};


/**
 * Checks if a user's expiration date is within the next 7 days.
 * @param expireDateStr The user's expiration date string.
 * @returns True if the user is expiring soon, false otherwise.
 */
const isExpiringSoon = (expireDateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only

    const expireDate = new Date(expireDateStr);
    expireDate.setHours(0, 0, 0, 0);

    if (expireDate < today) return false; // Already expired

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    sevenDaysFromNow.setHours(0, 0, 0, 0);

    return expireDate <= sevenDaysFromNow;
};


// --- API Functions ---

export const login = (username: string, password: string): Promise<{ success: boolean; isDefault: boolean }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (username === adminCredentials.username && password === adminCredentials.password) {
                resolve({ success: true, isDefault: isDefaultCredentials });
            } else {
                resolve({ success: false, isDefault: false });
            }
        }, SIMULATED_DELAY);
    });
};

export const setInitialAdminCredentials = (newUsername: string, newPassword: string): Promise<{ success: boolean }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!newUsername.trim() || !newPassword.trim()) {
                resolve({ success: false });
                return;
            }
            adminCredentials = { username: newUsername, password: newPassword };
            isDefaultCredentials = false;
            resolve({ success: true });
        }, SIMULATED_DELAY);
    });
};

export const updateAdminCredentials = (currentPassword: string, newUsername: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
     return new Promise(resolve => {
        setTimeout(() => {
            if (currentPassword !== adminCredentials.password) {
                resolve({ success: false, message: 'Current password is incorrect.' });
                return;
            }
            if (!newUsername.trim() || !newPassword.trim()) {
                resolve({ success: false, message: 'New username and password cannot be empty.' });
                return;
            }
            adminCredentials = { username: newUsername, password: newPassword };
            resolve({ success: true });
        }, SIMULATED_DELAY);
    });
};

/**
 * Gets all users with their status property updated on-the-fly.
 * This is a read-only operation on the service's state.
 */
export const getUsers = (): Promise<User[]> => {
    const usersWithUpToDateStatus = users.map(withUpdatedStatus);
    return simulateApi(usersWithUpToDateStatus);
};

export const getDashboardStats = (): Promise<DashboardStats> => {
    const usersWithUpToDateStatus = users.map(withUpdatedStatus);

    const expiringSoonCount = usersWithUpToDateStatus.filter(u => {
        // Not "expiring soon" if already expired or exhausted.
        if (u.status === UserStatus.Expired || u.status === UserStatus.Exhausted) {
            return false;
        }
        // It's "expiring soon" if date is near or bandwidth is depleting.
        return isExpiringSoon(u.expireDate) || u.status === UserStatus.Depleting;
    }).length;

    const expiredOrExhaustedCount = usersWithUpToDateStatus.filter(
        u => u.status === UserStatus.Expired || u.status === UserStatus.Exhausted
    ).length;
    
    const stats: DashboardStats = {
        totalUsers: users.length,
        onlineUsers: usersWithUpToDateStatus.reduce((acc, u) => acc + u.onlineDevices, 0),
        expiringSoon: expiringSoonCount,
        expiredOrExhausted: expiredOrExhaustedCount,
        totalBandwidth: usersWithUpToDateStatus.reduce((acc, user) => acc + user.bandwidthUsage, 0),
    };
    return simulateApi(stats);
};

export const getOnlineUsers = (): Promise<User[]> => {
    const online = users.map(withUpdatedStatus).filter(u => u.onlineDevices > 0 && u.status !== UserStatus.Expired);
    return simulateApi(online);
};

/**
 * Helper function to format uptime from milliseconds to a human-readable string.
 * @param ms Milliseconds to format.
 */
const formatUptime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let uptimeString = '';
    if (days > 0) uptimeString += `${days}d `;
    if (hours > 0) uptimeString += `${hours}h `;
    if (minutes > 0) uptimeString += `${minutes}m`;
    
    return uptimeString.trim() || "Just now";
};

export const getServerDetails = (): Promise<ServerDetails> => {
    const uptimeMs = Date.now() - serverBootTime.getTime();
    
    // Simulate some services randomly being active/inactive to feel more "live"
    const services: Service[] = [
        { name: "SSH (OpenSSH)", status: ServiceStatus.Active }, // SSH should always be active
        { name: "Web Server (Nginx)", status: Math.random() > 0.1 ? ServiceStatus.Active : ServiceStatus.Inactive },
        { name: "Firewall (UFW)", status: ServiceStatus.Active }, // Firewall should usually be active
        { name: "Database (PostgreSQL)", status: Math.random() > 0.6 ? ServiceStatus.Active : ServiceStatus.Inactive },
        { name: "Cron Daemon", status: ServiceStatus.Active },
    ];

    const details: ServerDetails = {
        ipAddress: "172.67.142.151",
        domain: "ssh-panel.dev",
        os: "Ubuntu 22.04.3 LTS",
        uptime: formatUptime(uptimeMs),
        services: services,
    };
    return simulateApi(details);
};

export const addUser = (newUser: Omit<User, 'id' | 'status'>): Promise<User> => {
    const userWithId = {
        ...newUser,
        id: `user-${Date.now()}`,
    };
    // Ensure the new user is created with the correct status from the start
    const finalUser = withUpdatedStatus(userWithId as User);
    users.push(finalUser);
    return simulateApi(finalUser);
};

export const updateUser = (userId: string, updatedData: Partial<Omit<User, 'id' | 'status'>>): Promise<User | null> => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        const currentUser = users[userIndex];
        
        // Merge data, but preserve original password if the new one is blank
        const mergedData = { ...currentUser, ...updatedData };
        if (!updatedData.password) {
            mergedData.password = currentUser.password;
        }
        
        // Replace the old user object with a new one that has an updated status
        const updatedUser = withUpdatedStatus(mergedData);
        users[userIndex] = updatedUser;
        
        return simulateApi(updatedUser);
    }
    return simulateApi(null);
};

export const deleteUser = (userId: string): Promise<{ success: boolean }> => {
    users = users.filter(u => u.id !== userId);
    return simulateApi({ success: true });
};

export const resetUserBandwidth = (userId: string): Promise<User | null> => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        const currentUser = users[userIndex];
        // Create a new user object with reset bandwidth
        const userWithResetBandwidth = { ...currentUser, bandwidthUsage: 0 };
        // Replace the old user object with the new one, with its status recalculated
        const finalUser = withUpdatedStatus(userWithResetBandwidth);
        users[userIndex] = finalUser;

        return simulateApi(finalUser);
    }
    return simulateApi(null);
};
