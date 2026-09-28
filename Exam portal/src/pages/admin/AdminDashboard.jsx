import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Building2, School, BookOpen, ClipboardList,
  GraduationCap, TrendingUp, Calendar, Award, BarChart2, Activity
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#7c3aed', '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboardStats().then((s) => { setStats(s); setLoading(false); });
  }, []);

  const courseData = [
    { name: 'MCA', students: 22 },
    { name: 'M.Tech', students: 14 },
    { name: 'B.Tech (IT)', students: 10 },
    { name: 'MBA', students: 4 },
  ];

  const examTypeData = [
    { name: 'MCQ', value: 60 },
    { name: 'Mixed', value: 30 },
    { name: 'Theory', value: 10 },
  ];

  if (loading) return (
    <div className="loading-state">
      <div className="spinner" />
      <p>Loading dashboard...</p>
    </div>
  );

  const statCards = [
    { label: 'Total Students', value: stats?.students, icon: GraduationCap, color: 'purple', to: '/admin/students' },
    { label: 'Teachers', value: stats?.teachers, icon: Users, color: 'blue', to: '/admin/teachers' },
    { label: 'Departments', value: stats?.departments, icon: Building2, color: 'green', to: '/admin/departments' },
    { label: 'Courses', value: stats?.courses, icon: School, color: 'amber', to: '/admin/courses' },
    { label: 'Subjects', value: stats?.subjects, icon: BookOpen, color: 'red', to: '/admin/subjects' },
    { label: 'Active Exams', value: stats?.active_exams, icon: ClipboardList, color: 'purple', to: '/admin/exams' },
  ];

  return (
    <div>
      <div className="welcome-banner">
        <h1>Administrator Dashboard</h1>
        <p>Manage your university examination system from one central place.</p>
        <div className="welcome-stats">
          {[
            { label: 'Total Users', value: (stats?.students || 0) + (stats?.teachers || 0) + 1 },
            { label: 'Question Bank', value: '37+' },
            { label: 'Examinations', value: stats?.active_exams },
          ].map((ws) => (
            <div className="welcome-stat" key={ws.label}>
              <div className="ws-value">{ws.value}</div>
              <div className="ws-label">{ws.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        {statCards.map((sc) => (
          <Link to={sc.to} key={sc.label} style={{ textDecoration: 'none' }}>
            <div className="stat-card">
              <div className={`stat-icon ${sc.color}`}>
                <sc.icon size={22} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{sc.value ?? '—'}</div>
                <div className="stat-label">{sc.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Students by Course</span>
            <BarChart2 size={18} color="var(--text-muted)" />
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={courseData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                <Bar dataKey="students" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Exam Type Distribution</span>
            <Activity size={18} color="var(--text-muted)" />
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={examTypeData} cx="50%" cy="50%"
                  innerRadius={60} outerRadius={90}
                  paddingAngle={4} dataKey="value"
                >
                  {examTypeData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Quick Actions</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Add Department', to: '/admin/departments', icon: Building2 },
                { label: 'Add Course', to: '/admin/courses', icon: School },
                { label: 'Add Subject', to: '/admin/subjects', icon: BookOpen },
                { label: 'Manage Users', to: '/admin/users', icon: Users },
              ].map((action) => (
                <Link key={action.label} to={action.to}
                  className="nav-item"
                  style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}
                >
                  <action.icon size={16} className="nav-icon" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <Calendar size={18} color="var(--text-muted)" />
          </div>
          <div className="card-body">
            {[
              { text: 'DBMS Mid Semester exam scheduled', time: '2 hours ago', color: 'purple' },
              { text: 'Abhay Patel submitted DBMS exam', time: '5 hours ago', color: 'green' },
              { text: 'Prof. Mehta added 5 new questions', time: 'Yesterday', color: 'blue' },
              { text: 'Computer Networks result published', time: '2 days ago', color: 'amber' },
              { text: 'New semester 2 created for MCA', time: '3 days ago', color: 'purple' },
            ].map((act, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none'
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: act.color === 'purple' ? 'var(--primary)' :
                    act.color === 'green' ? 'var(--success)' :
                    act.color === 'blue' ? 'var(--info)' : 'var(--warning)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{act.text}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
