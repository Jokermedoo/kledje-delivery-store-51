
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/auth');
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || profile?.role !== 'admin') {
    return <LoadingSpinner />;
  }

  return <AdminDashboard />;
};

export default AdminPage;
