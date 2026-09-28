import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileQuestion, ClipboardList, Clock, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers } from '../../data/mockData';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [exams, setExams] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const teacher = teachers.find((t) => t.user_id === user?.user_id);

  useEffect(() => {
    if (!teacher) return;
    Promise.all([
      teacherService.getDashboardStats(teacher.teacher_id),
      teacherService.getExams(teacher.teacher_id),
      teacherService.getPendingEvaluations(teacher.teacher_id),
    ]).then(([s, e, p]) => {
      setStats(s); setExams(e); setPending(p); setLoading(false);
    });
  }, [teacher?.teacher_id]);

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Loading dashboard...</p></div>;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const pendingCount = pending.filter((p) => !p.is_evaluated).length;

  return (
    <div>
      <div className="welcome-banner">
        <h1>{greeting}, {user?.full_name?.split(' ')[0] || 'Professor'} 👋</h1>
        <p>Manage your question bank, create examinations, and evaluate student answers.</p>
        <div className="welcome-stats">
          {[
            { label: 'Subjects', value: stats?.subjects },
            { label: 'Questions', value: stats?.questionBank },
            { label: 'Active Exams', value: stats?.activeExams },
          ].map((ws) => (
            <div className="welcome-stat" key={ws.label}>
              <div className="ws-value">{ws.value ?? '—'}</div>
              <div className="ws-label">{ws.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'My Subjects', value: stats?.subjects, icon: BookOpen, color: 'purple', to: '/teacher/questions' },
          { label: 'Question Bank', value: stats?.questionBank, icon: FileQuestion, color: 'blue', to: '/teacher/questions' },
          { label: 'Active Exams', value: stats?.activeExams, icon: ClipboardList, color: 'green', to: '/teacher/exams' },
          { label: 'Pending Evaluations', value: pendingCount, icon: Clock, color: 'amber', to: '/teacher/evaluate' },
        ].map((s) => (
          <Link key={s.label} to={s.to} style={{ textDecoration: 'none' }}>
            <div className="stat-card">
              <div className={`stat-icon ${s.color}`}><s.icon size={22} /></div>
              <div className="stat-content">
                <div className="stat-value">{s.value ?? '—'}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">My Examinations</span>
            <Link to="/teacher/exams" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div className="card-body">
            {exams.length === 0 ? (
              <div className="empty-state" style={{ padding: '30px 20px' }}>
                <ClipboardList size={36} />
                <h3>No exams yet</h3>
                <p>Create your first examination</p>
              </div>
            ) : (
              exams.map((e) => (
                <div key={e.exam_id} className="exam-card" style={{ marginBottom: 10, padding: '14px 16px' }}>
                  <div className="exam-card-icon" style={{ width: 40, height: 40 }}>
                    <ClipboardList size={18} />
                  </div>
                  <div className="exam-card-content">
                    <div className="exam-card-title">{e.exam_code}</div>
                    <div className="exam-card-meta">
                      <span>{e.subject?.subject_name || '—'}</span>
                      <span>•</span>
                      <span>{e.total_marks} marks</span>
                      <span>•</span>
                      <span>{e.duration} min</span>
                    </div>
                  </div>
                  <span className="badge badge-purple">{e.exam_type}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Pending Evaluations
              {pendingCount > 0 && <span className="badge badge-amber">{pendingCount}</span>}
            </span>
            <Link to="/teacher/evaluate" className="btn btn-ghost btn-sm">Evaluate</Link>
          </div>
          <div className="card-body">
            {pendingCount === 0 ? (
              <div className="empty-state" style={{ padding: '30px 20px' }}>
                <CheckCircle size={36} color="var(--success)" />
                <h3 style={{ color: 'var(--success)' }}>All caught up!</h3>
                <p>No pending evaluations</p>
              </div>
            ) : (
              pending.filter((p) => !p.is_evaluated).slice(0, 4).map((p, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                  display: 'flex', alignItems: 'flex-start', gap: 12
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--warning)', marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{p.student_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.exam_code} • {p.max_marks} marks</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Quick Actions</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/teacher/questions" className="btn btn-secondary"><FileQuestion size={16} /> Question Bank</Link>
              <Link to="/teacher/exams/create" className="btn btn-primary"><ClipboardList size={16} /> Create Exam</Link>
              <Link to="/teacher/evaluate" className="btn btn-warning"><AlertTriangle size={16} /> Evaluate Theory</Link>
              <Link to="/teacher/results" className="btn btn-ghost"><CheckCircle size={16} /> View Results</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
