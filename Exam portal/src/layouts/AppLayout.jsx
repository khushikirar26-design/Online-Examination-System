import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const pageTitles = {
  '/admin': { title: 'Admin Dashboard', subtitle: 'System overview and management' },
  '/admin/departments': { title: 'Departments', subtitle: 'Manage academic departments' },
  '/admin/courses': { title: 'Courses', subtitle: 'Manage courses and programs' },
  '/admin/subjects': { title: 'Subjects', subtitle: 'Manage subjects and assignments' },
  '/admin/semesters': { title: 'Semesters', subtitle: 'Manage semesters and academic years' },
  '/admin/students': { title: 'Students', subtitle: 'Manage student records' },
  '/admin/teachers': { title: 'Teachers', subtitle: 'Manage teaching staff' },
  '/admin/users': { title: 'User Directory', subtitle: 'All system users' },
  '/admin/exams': { title: 'Examinations', subtitle: 'Overview of all examinations' },
  '/teacher': { title: 'Teacher Dashboard', subtitle: 'Your teaching overview' },
  '/teacher/questions': { title: 'Question Bank', subtitle: 'Manage your question repository' },
  '/teacher/exams': { title: 'My Examinations', subtitle: 'Manage and review exams' },
  '/teacher/exams/create': { title: 'Create Examination', subtitle: 'Step-by-step exam wizard' },
  '/teacher/schedule': { title: 'Exam Schedule', subtitle: 'View and manage schedules' },
  '/teacher/evaluate': { title: 'Theory Evaluation', subtitle: 'Grade student written answers' },
  '/teacher/results': { title: 'Results', subtitle: 'Review and publish results' },
  '/student': { title: 'Student Dashboard', subtitle: 'Your academic overview' },
  '/student/exams': { title: 'Available Exams', subtitle: 'Upcoming scheduled examinations' },
  '/student/schedule': { title: 'My Schedule', subtitle: 'Your examination schedule' },
  '/student/results': { title: 'My Results', subtitle: 'View your published results' },
  '/student/analytics': { title: 'Performance Analytics', subtitle: 'Your academic performance insights' },
  '/student/profile': { title: 'My Profile', subtitle: 'Personal and academic information' },
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: 'ExamPortal', subtitle: '' };

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
