import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, Clock, CalendarDays, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        studentService.getDashboardStats(user.user_id),
        studentService.getAvailableExams(user.user_id),
        studentService.getStudentResults(user.user_id)
      ]).then(([s, u, r]) => {
        setStats(s);
        setUpcoming(u);
        setResults(r.filter(res => res.is_published).slice(0, 3)); // top 3 recent
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Loading your dashboard...</p></div>;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Chart data formatting
  const chartData = results.map(r => ({
    name: r.subject?.subject_code,
    score: r.percentage
  })).reverse();

  return (
    <div>
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, var(--info) 0%, #0369a1 100%)' }}>
        <h1>{greeting}, {user?.full_name?.split(' ')[0]}!</h1>
        <p>Ready for your upcoming examinations?</p>
        <div className="welcome-stats">
          <div className="welcome-stat">
            <div className="ws-value">{stats?.upcoming_exams || 0}</div>
            <div className="ws-label">Upcoming Exams</div>
          </div>
          <div className="welcome-stat">
            <div className="ws-value">{stats?.completed_exams || 0}</div>
            <div className="ws-label">Completed Exams</div>
          </div>
          <div className="welcome-stat">
            <div className="ws-value">{stats?.average_score || 0}%</div>
            <div className="ws-label">Average Score</div>
          </div>
          <div className="welcome-stat">
            <div className="ws-value">Sem {stats?.current_semester || 1}</div>
            <div className="ws-label">Current Semester</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Upcoming Exams */}
        <div className="card">
          <div className="card-header">
            <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Upcoming Examinations
              {upcoming.length > 0 && <span className="badge badge-blue">{upcoming.length}</span>}
            </span>
            <Link to="/student/exams" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div className="card-body">
            {upcoming.length === 0 ? (
              <div className="empty-state" style={{ padding: '30px 20px' }}>
                <CheckCircle size={36} color="var(--success)" />
                <h3 style={{ color: 'var(--success)', marginTop: 10 }}>All clear!</h3>
                <p>You have no pending examinations at the moment.</p>
              </div>
            ) : (
              upcoming.slice(0, 3).map((u) => {
                const examDate = new Date(`${u.exam_date}T${u.start_time}`);
                const isLive = new Date() >= examDate && new Date() <= new Date(`${u.exam_date}T${u.end_time}`);
                return (
                  <div key={u.schedule_id} className="exam-card" style={{ marginBottom: 12 }}>
                    <div className="exam-card-icon" style={{ background: isLive ? 'var(--success-light)' : 'var(--info-light)', color: isLive ? 'var(--success)' : 'var(--info)' }}>
                      {isLive ? <Zap size={20} /> : <CalendarDays size={20} />}
                    </div>
                    <div className="exam-card-content">
                      <div className="exam-card-title">{u.subject?.subject_name}</div>
                      <div className="exam-card-meta">
                        <span>{new Date(u.exam_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span>•</span>
                        <span>{u.start_time} - {u.end_time}</span>
                        <span>•</span>
                        <span>{u.exam?.duration} mins</span>
                      </div>
                    </div>
                    {isLive ? (
                      <Link to={`/student/exam/${u.schedule_id}`} className="btn btn-success btn-sm">Start Exam</Link>
                    ) : (
                      <span className="badge badge-gray">Upcoming</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Performance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Performance</span>
            <Link to="/student/results" className="btn btn-ghost btn-sm">All Results</Link>
          </div>
          <div className="card-body">
            {results.length === 0 ? (
              <div className="empty-state" style={{ padding: '30px 20px' }}>
                <Award size={36} />
                <h3 style={{ marginTop: 10 }}>No results yet</h3>
                <p>Complete exams to see your performance.</p>
              </div>
            ) : (
              <>
                <div style={{ height: 180, width: '100%', marginBottom: 16 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                      <Line type="monotone" dataKey="score" stroke="var(--info)" strokeWidth={3} dot={{ r: 4, fill: 'var(--info)', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  {results.map((r, i) => (
                    <div key={r.result_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.result_status === 'PASS' ? 'var(--success)' : 'var(--danger)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{r.subject?.subject_name}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.percentage}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
