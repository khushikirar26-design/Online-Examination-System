// ============================================================
// AUTH SERVICE
// Mock implementation — replace fetch calls with real API:
//   POST /api/auth/login
// ============================================================
import { users } from '../data/mockData';

const STORAGE_KEY = 'oes_current_user';

export const authService = {
  // Mock login — checks against in-memory users array
  login: async (identifier, password) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate latency
    const user = users.find(
      (u) =>
        (u.email === identifier || u.username === identifier) &&
        u.password_hash === password
    );
    if (!user) throw new Error('Invalid credentials');
    if (user.status !== 'ACTIVE') throw new Error('Account is inactive');
    const { password_hash, ...safeUser } = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!authService.getCurrentUser(),
};
