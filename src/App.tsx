import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/common';

// Common pages
import { HomePage, AttendancePage, ClassesPage, MessagesPage, SettingsPage } from './pages/common';

// Member pages
import { WorkoutsPage, DietPage, ProgressPage, MembershipsPage } from './pages/member';

// Trainer pages
import { SessionsPage } from './pages/trainer';

// Admin pages
import { MembersPage, PaymentsPage, LeadsPage, EquipmentPage, ReportsPage } from './pages/admin';

import './App.css';

export function App() {
  return (
    <Router>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/memberships" element={<MembershipsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </AppProvider>
    </Router>
  );
}

export default App;
