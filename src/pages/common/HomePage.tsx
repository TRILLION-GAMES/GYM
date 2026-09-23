import React from 'react';
import { useApp } from '../../context/AppContext';
import { MemberDashboard } from '../../components/member';
import { TrainerDashboard } from '../../components/trainer';
import { AdminDashboard } from '../../components/admin';

export const HomePage: React.FC = () => {
  const { role } = useApp();

  if (role === 'trainer') {
    return <TrainerDashboard />;
  }

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  // Default to Member
  return <MemberDashboard />;
};
