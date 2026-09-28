import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FileQuestion, ClipboardList,
  BarChart2, Users, Settings, Building2, GraduationCap,
  CalendarDays, Award, LogOut, Menu, X, FlaskConical,
  BookMarked, ChevronRight, School,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const adminNav = [
  { label: 'Overview', items: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Directory' },
  ]},
  { label: 'Academic Structure', items: [
    { to: '/admin/departments', icon: Building2, label: 'Departments' },
    { to: '/admin/courses', icon: School, label: 'Courses' },
    { to: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { to: '/admin/semesters', icon: CalendarDays, label: 'Semesters' },
  ]},
  { label: 'People', items: [
    { to: '/admin/students', icon: GraduationCap, label: 'Students' },
    { to: '/admin/teachers', icon: Users, label: 'Teachers' },
  ]},
  { label: 'Examinations', items: [
    { to: '/admin/exams', icon: ClipboardList, label: 'Examinations' },
  ]},
];

const teacherNav = [
  { label: 'Overview', items: [
    { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { label: 'Questions', items: [
    { to: '/teacher/questions', icon: FileQuestion, label: 'Question Bank' },
  ]},
  { label: 'Examinations', items: [
    { to: '/teacher/exams', icon: ClipboardList, label: 'My Exams' },
    { to: '/teacher/exams/create', icon: BookMarked, label: 'Create Exam' },
    { to: '/teacher/schedule', icon: CalendarDays, label: 'Schedule' },
  ]},
  { label: 'Evaluation', items: [
    { to: '/teacher/evaluate', icon: FlaskConical, label: 'Theory Evaluation' },
    { to: '/teacher/results', icon: Award, label: 'Results' },
  ]},
];

const studentNav = [
  { label: 'Overview', items: [
    { to: '/student', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { label: 'Examinations', items: [
    { to: '/student/exams', icon: ClipboardList, label: 'Available Exams' },
    { to: '/student/schedule', icon: CalendarDays, label: 'My Schedule' },
  ]},
  { label: 'Performance', items: [
    { to: '/student/results', icon: Award, label: 'My Results' },
    { to: '/student/analytics', icon: BarChart2, label: 'Analytics' },
  ]},
  { label: 'Profile', items: [
    { to: '/student/profile', icon: GraduationCap, label: 'My Profile' },
  ]},
];

function getNav(role) {
  if (role === 'ADMIN') return adminNav;
  if (role === 'TEACHER') return teacherNav;
  return studentNav;
}

function getInitials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function getRoleBadgeClass(role) {
  if (role === 'ADMIN') return 'role-admin';
  if (role === 'TEACHER') return 'role-teacher';
  return 'role-student';
}

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navSections = getNav(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <GraduationCap size={20} />
          </div>
          <div className="logo-text">
            <h2>ExamPortal</h2>
            <span>University Examination</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to.split('/').length <= 2}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <item.icon size={17} className="nav-icon" />
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar">{getInitials(user?.full_name)}</div>
            <div className="user-info">
              <div className="name">{user?.full_name}</div>
              <div className="role">
                <span className={`badge ${getRoleBadgeClass(user?.role)}`} style={{fontSize:'0.6rem',padding:'1px 7px'}}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
          <button className="nav-item" style={{ marginTop: 8, color: '#dc2626' }} onClick={handleLogout}>
            <LogOut size={17} className="nav-icon" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
