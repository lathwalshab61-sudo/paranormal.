import React, { createContext, useContext, useState, useEffect } from 'react';
import { postWithFallback } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('btu_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('btu_token') || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('btu_user', JSON.stringify(user));
      localStorage.setItem('btu_token', token);
    } else {
      localStorage.removeItem('btu_user');
      localStorage.removeItem('btu_token');
    }
  }, [user, token]);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const res = await postWithFallback(
        '/auth/login',
        { identifier, password },
        {
          status: 'ok',
          user: {
            id: 'user-demo',
            callSign: identifier.toUpperCase().includes('@') ? 'AGENT-BTU' : identifier.toUpperCase(),
            email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@btu.gov`,
            clearanceLevel: 'SEC-LEVEL 4',
            role: 'Senior Field Operative',
            badgeNumber: 'BTU-7749-OP',
            stationRef: 'LAT 34.0522° LON -118.2437°',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAazlzuFvu1yeDhFPtF2nOYBjP_kch0qBQcIUrm1cr0LGnR_w9xbguBgMx8WHB2GNes7UzoU9pNfdWG6ZxY3pZTWkhOBnUuIOKspiU5VgscBUmeffhqZ66JbBxNS7T2x-9vcafTlidby0Zf2IQIl5Jws189SO7dv2oIn0GkYPstv_QQMaliBvBsqCtPaByIfty7bBdC-G7XP900Y8QAUjiVMoDFJvBwiLq2AiXwqIo',
          },
          token: `BTU-SESSION-${Date.now()}`,
        }
      );

      if (res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      } else {
        return { success: false, error: res.error || 'Authentication denied' };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Login request failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (operativeData) => {
    setLoading(true);
    try {
      const res = await postWithFallback(
        '/auth/register',
        operativeData,
        {
          status: 'ok',
          user: {
            id: `agent-${Date.now().toString().slice(-4)}`,
            callSign: operativeData.callSign.toUpperCase(),
            email: operativeData.email.toLowerCase(),
            clearanceLevel: operativeData.clearanceLevel || 'SEC-LEVEL 2',
            role: operativeData.role || 'Field Operative',
            badgeNumber: operativeData.badgeNumber || 'BTU-9021-OP',
            stationRef: 'LAT 34.0522° LON -118.2437°',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAazlzuFvu1yeDhFPtF2nOYBjP_kch0qBQcIUrm1cr0LGnR_w9xbguBgMx8WHB2GNes7UzoU9pNfdWG6ZxY3pZTWkhOBnUuIOKspiU5VgscBUmeffhqZ66JbBxNS7T2x-9vcafTlidby0Zf2IQIl5Jws189SO7dv2oIn0GkYPstv_QQMaliBvBsqCtPaByIfty7bBdC-G7XP900Y8QAUjiVMoDFJvBwiLq2AiXwqIo',
          },
          token: `BTU-SESSION-${Date.now()}`,
        }
      );

      if (res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      } else {
        return { success: false, error: res.error || 'Registration rejected' };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Registration request failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('btu_user');
    localStorage.removeItem('btu_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
