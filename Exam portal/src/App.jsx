import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout
import AppLayout from './layouts/AppLayout';

// Auth
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import DepartmentsPage from './pages/admin/DepartmentsPage';
import CoursesPage from './pages/admin/CoursesPage';
import SubjectsPage from './pages/admin/SubjectsPage';
import SemestersPage from './pages/admin/SemestersPage';
import UsersPage from './pages/admin/UsersPage';
import StudentsPage from './pages/admin/StudentsPage';
import TeachersPage from './pages/admin/TeachersPage';
import AdminExamsPage from './pages/admin/AdminExamsPage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import QuestionBankPage from './pages/teacher/QuestionBankPage';
import TeacherExamsPage from './pages/teacher/TeacherExamsPage';
import CreateExamPage from './pages/teacher/CreateExamPage';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';
import TeacherEvaluatePage from './pages/teacher/TeacherEvaluatePage';
import TeacherResultsPage from './pages/teacher/TeacherResultsPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AvailableExamsPage from './pages/student/AvailableExamsPage';
import ExamInterfacePage from './pages/student/ExamInterfacePage';
import StudentResultsPage from './pages/student/StudentResultsPage';
import PerformanceAnalyticsPage from './pages/student/PerformanceAnalyticsPage';
import StudentProfilePage from './pages/student/StudentProfilePage';

// Protect Routes by Role
function ProtectedRoute({ children, role }) {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-state"><div className="spinner"/></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'TEACHER') return <Navigate to="/teacher" replace />;
    return <Navigate to="/student" replace />;
  }
  return children;
}

export default function App() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div className="loading-state"><div className="spinner"/></div>;

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={`/${user.role.toLowerCase()}`} replace />} />
      
      {/* Exam Interface (Full screen, no layout) */}
      <Route path="/student/exam/:scheduleId" element={
        <ProtectedRoute role="STUDENT"><ExamInterfacePage /></ProtectedRoute>
      } />

      {/* Main App with Layout */}
      <Route element={<AppLayout />}>
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/departments" element={<ProtectedRoute role="ADMIN"><DepartmentsPage /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute role="ADMIN"><CoursesPage /></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute role="ADMIN"><SubjectsPage /></ProtectedRoute>} />
        <Route path="/admin/semesters" element={<ProtectedRoute role="ADMIN"><SemestersPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="ADMIN"><UsersPage /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="ADMIN"><StudentsPage /></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute role="ADMIN"><TeachersPage /></ProtectedRoute>} />
        <Route path="/admin/exams" element={<ProtectedRoute role="ADMIN"><AdminExamsPage /></ProtectedRoute>} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<ProtectedRoute role="TEACHER"><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/questions" element={<ProtectedRoute role="TEACHER"><QuestionBankPage /></ProtectedRoute>} />
        <Route path="/teacher/exams" element={<ProtectedRoute role="TEACHER"><TeacherExamsPage /></ProtectedRoute>} />
        <Route path="/teacher/exams/create" element={<ProtectedRoute role="TEACHER"><CreateExamPage /></ProtectedRoute>} />
        <Route path="/teacher/schedule" element={<ProtectedRoute role="TEACHER"><TeacherSchedulePage /></ProtectedRoute>} />
        <Route path="/teacher/evaluate" element={<ProtectedRoute role="TEACHER"><TeacherEvaluatePage /></ProtectedRoute>} />
        <Route path="/teacher/results" element={<ProtectedRoute role="TEACHER"><TeacherResultsPage /></ProtectedRoute>} />

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/exams" element={<ProtectedRoute role="STUDENT"><AvailableExamsPage /></ProtectedRoute>} />
        <Route path="/student/schedule" element={<ProtectedRoute role="STUDENT"><AvailableExamsPage /></ProtectedRoute>} />
        <Route path="/student/results" element={<ProtectedRoute role="STUDENT"><StudentResultsPage /></ProtectedRoute>} />
        <Route path="/student/analytics" element={<ProtectedRoute role="STUDENT"><PerformanceAnalyticsPage /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute role="STUDENT"><StudentProfilePage /></ProtectedRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
