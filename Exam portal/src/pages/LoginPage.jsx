import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ShieldCheck, BookOpen, BarChart2, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const quickLogins = [
  { role: 'ADMIN', label: 'Admin', email: 'admin@university.edu', password: 'admin123', name: 'Dr. Rajesh Sharma' },
  { role: 'TEACHER', label: 'Teacher', email: 'mehta@university.edu', password: 'teacher123', name: 'Prof. Anil Mehta' },
  { role: 'STUDENT', label: 'Student', email: 'abhay@student.university.edu', password: 'student123', name: 'Abhay Patel' },
];

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!identifier || !password) { setError('Please enter your credentials.'); return; }
    setLoading(true);
    try {
      const user = await login(identifier, password);
      redirectUser(user.role);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (ql) => {
    setLoading(true);
    setError('');
    try {
      const user = await login(ql.email, ql.password);
      redirectUser(user.role);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectUser = (role) => {
    if (role === 'ADMIN') navigate('/admin');
    else if (role === 'TEACHER') navigate('/teacher');
    else navigate('/student');
  };

  return (
    <div className="login-page">
      {/* Left decorative panel */}
      <div className="login-left">
        <div style={{ maxWidth: 380 }}>
          <div className="login-brand">
            <div className="brand-icon">
              <GraduationCap size={28} />
            </div>
            <h1>ExamPortal</h1>
          </div>
          <p className="login-tagline">
            University Examination System — Smart, Secure, Scalable
          </p>

          <div style={{ marginTop: 40 }}>
            <div className="login-feature">
              <ShieldCheck size={20} />
              <span>Role-based access for Admins, Teachers & Students</span>
            </div>
            <div className="login-feature">
              <BookOpen size={20} />
              <span>Comprehensive question bank with smart exam generation</span>
            </div>
            <div className="login-feature">
              <BarChart2 size={20} />
              <span>Detailed performance analytics and insights</span>
            </div>
            <div className="login-feature">
              <Clock size={20} />
              <span>Real-time exam timer with auto-submit</span>
            </div>
          </div>

          <div style={{
            marginTop: 48, padding: '16px 20px',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 12, backdropFilter: 'blur(8px)',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', marginBottom: 6 }}>
              Trusted by leading universities
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['50+ Students', '10+ Teachers', '100+ Exams'].map((t) => (
                <div key={t} style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="login-right">
        <div className="login-card">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 56, height: 56,
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              borderRadius: 14, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 14px',
              boxShadow: 'var(--shadow-primary)'
            }}>
              <GraduationCap size={28} color="white" />
            </div>
            <h2 className="login-title">Welcome back</h2>
            <p className="login-subtitle">Sign in to access your examination portal</p>
          </div>

          {/* Quick Login Buttons */}
          <div style={{ marginBottom: 6 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Demo Login
            </p>
            <div className="quick-login-grid">
              {quickLogins.map((ql) => (
                <button key={ql.role} className="quick-login-btn" onClick={() => handleQuickLogin(ql)} disabled={loading}>
                  <div className="ql-role">{ql.label}</div>
                  <div className="ql-name">{ql.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>or sign in manually</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 16 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label required">Email / Username</label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                id="login-identifier"
              />
            </div>
            <div className="form-group">
              <label className="form-label required">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: 44 }}
                  autoComplete="current-password"
                  id="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', padding: 2,
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              disabled={loading}
              id="login-submit"
            >
              {loading ? (
                <><div className="spinner" style={{ width: 18, height: 18, marginBottom: 0, borderWidth: 2 }} /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 20 }}>
            For demo: Admin — <code style={{ background:'#f3f4f6', padding:'1px 6px', borderRadius:4 }}>admin / admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
