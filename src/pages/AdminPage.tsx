
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/auth';
import { authService } from '@/services/authService';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AuthForm from '@/components/auth/AuthForm';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    authService.init();
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser) {
      setShowAuth(true);
      setIsLoading(false);
      return;
    }

    if (currentUser.role !== 'admin') {
      navigate('/');
      return;
    }

    setUser(currentUser);
    setIsLoading(false);
  }, [navigate]);

  const handleLogin = (loggedInUser: User) => {
    if (loggedInUser.role !== 'admin') {
      navigate('/');
      return;
    }
    setUser(loggedInUser);
    setShowAuth(false);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showAuth || !user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
};

export default AdminPage;
