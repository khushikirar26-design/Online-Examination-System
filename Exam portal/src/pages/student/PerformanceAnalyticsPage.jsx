import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, Target, ShieldAlert, Award, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

export default function PerformanceAnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      studentService.getPerformanceAnalytics(user.user_id).then(a => {
        setAnalytics(a);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Analyzing your performance...</p></div>;

  if (!analytics) return (
    <div className="empty-state">
      <BarChart2 size={48} />
      <h3>No Analytics Available</h3>
      <p>Complete some exams to generate your performance analytics.</p>
    </div>
  );

  const { overall, trend, subject_performance, strong_areas, weak_areas, summary } = analytics;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Performance Analytics</h1>
          <p>Detailed insights into your academic progress.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-icon purple"><Award size={22} /></div>
          <div className="stat-content">
            <div className="stat-value">{overall.average_score}%</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><TrendingUp size={22} /></div>
          <div className="stat-content">
            <div className="stat-value">{overall.highest_score}%</div>
            <div className="stat-label">Highest Score</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Target size={22} /></div>
          <div className="stat-content">
            <div className="stat-value">{overall.pass_rate}%</div>
            <div className="stat-label">Pass Rate</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><ShieldAlert size={22} /></div>
          <div className="stat-content">
            <div className="stat-value">{overall.exams_attempted}</div>
            <div className="stat-label">Exams Attempted</div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Performance Trend */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Performance Trend</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="exam" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Subject-wise Performance</span>
          </div>
          <div className="card-body" style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {subject_performance.map((sub, i) => (
                <div key={i} className="subject-bar">
                  <div className="subject-name">{sub.subject}</div>
                  <div className="bar-wrapper">
                    <div className={`bar-fill ${sub.score >= 75 ? 'green' : sub.score >= 50 ? 'purple' : 'red'}`} style={{ width: `${sub.score}%` }} />
                  </div>
                  <div className="score-pct">{sub.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        {/* Accuracy */}
        <div className="card">
          <div className="card-header"><span className="card-title">Accuracy</span></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Correct Answers</span>
              <span style={{ fontWeight: 700, color: 'var(--success)' }}>{((overall.correct_answers / overall.total_questions_answered) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Incorrect Answers</span>
              <span style={{ fontWeight: 700, color: 'var(--danger)' }}>{((overall.incorrect_answers / overall.total_questions_answered) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Unanswered</span>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{((overall.unanswered / overall.total_questions_answered) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Strong Areas */}
        <div className="card">
          <div className="card-header"><span className="card-title">Strong Areas</span></div>
          <div className="card-body">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {strong_areas.map((area, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                  <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: 4, borderRadius: '50%', display: 'flex' }}>
                    <CheckCircle size={14} />
                  </div>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Weak Areas */}
        <div className="card">
          <div className="card-header"><span className="card-title">Areas for Improvement</span></div>
          <div className="card-body">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {weak_areas.map((area, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                  <div style={{ background: 'var(--warning-light)', color: 'var(--warning)', padding: 4, borderRadius: '50%', display: 'flex' }}>
                    <AlertTriangle size={14} />
                  </div>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Summary Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-pale), white)', border: '1px solid var(--primary-lighter)', borderRadius: 'var(--border-radius-lg)', padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, background: 'var(--primary)', color: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--primary)' }}>Performance Summary</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{summary}</p>
        </div>
      </div>
    </div>
  );
}
