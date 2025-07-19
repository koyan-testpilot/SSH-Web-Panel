import { MOCK_USERS } from '../constants';
import { User, DashboardStats, UserStatus, ServerDetails, Service, ServiceStatus } from '../types';

// The "database". Initialize with a deep copy of mock data.
let users: User[] = JSON.parse(JSON.stringify(MOCK_USERS));

const SIMULATED_DELAY = 500; // ms

// Helper to simulate network delay and return deep copies to prevent state leakage
const simulateApi = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Deep copy to simulate receiving data from an API
            resolve(JSON.parse(JSON.stringify(data)));
        }, SIMULATED_DELAY);
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

export const login = (username: string, password: string): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                resolve(true);
            } else {
                resolve(false);
            }
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

export const getServerDetails = (): Promise<ServerDetails> => {
    const details: ServerDetails = {
        ipAddress: "192.168.1.101",
        domain: "panel.example.com",
        os: "Ubuntu 22.04.3 LTS",
        uptime: "14d 8h 22m",
        services: [
            { name: "SSH (OpenSSH)", status: ServiceStatus.Active },
            { name: "Web Server (Nginx)", status: ServiceStatus.Active },
            { name: "Firewall (UFW)", status: ServiceStatus.Active },
            { name: "Database (PostgreSQL)", status: ServiceStatus.Inactive },
        ],
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