'use client';

import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import BookBrowsing from '@/components/user/book/BookBrowsing';
import axios from 'axios';
import ApiConfig from '@/config/api-config';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'ADMIN' | 'USER';
};

type AuthMode = 'login' | 'register';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const jwtToken = localStorage.getItem('jwt-token');

      const userData = await loadCurrUser(jwtToken);

      if (userData) {
        setUser(userData);
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const loadCurrUser = async (jwtToken: string | null) => {
    if (!jwtToken) return;

    try {
      const response = await axios.get(ApiConfig.GET_CURR_USER, {
        headers: {
          Authorization: jwtToken,
        },
      });

      if (response.status) {
        return response.data.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    return await axios.post(ApiConfig.LOGIN, { username: email, password });
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    return axios.post(ApiConfig.REGISTER_USER, {
      name,
      email,
      password,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jwt-token');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        {authMode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
            setUser={(user) => setUser(user)}
            loadCurrUser={(jwtToken) => loadCurrUser(jwtToken)}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {user.role === 'ADMIN' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <BookBrowsing user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
