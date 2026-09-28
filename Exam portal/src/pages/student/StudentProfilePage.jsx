import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, BookOpen, Calendar, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      studentService.getStudentProfile(user.user_id).then(p => {
        setProfile(p);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="loading-state"><div className="spinner" /></div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>View your personal and academic information.</p>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Cover & Avatar */}
        <div style={{ height: 120, background: 'linear-gradient(135deg, var(--primary), var(--accent))' }} />
        <div style={{ padding: '0 32px 32px', position: 'relative' }}>
          <div style={{ 
            width: 100, height: 100, borderRadius: '50%', background: 'white',
            padding: 4, position: 'absolute', top: -50,
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ 
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--info), var(--primary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '2rem', fontWeight: 700
            }}>
              {profile?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          </div>
          
          <div style={{ paddingTop: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: 4 }}>{profile?.full_name}</h2>
              <div style={{ display: 'flex', gap: 12, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {profile?.email}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><User size={14} /> {profile?.username}</span>
              </div>
            </div>
            <span className="badge badge-green" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Active Student</span>
          </div>
        </div>

        <div className="divider" style={{ margin: 0 }} />

        {/* Academic Details */}
        <div style={{ padding: 32 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="var(--primary)" /> Academic Details
          </h3>
          
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>Scholar Number</label>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', padding: '10px 14px', background: 'var(--bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border)' }}>
                {profile?.scholar_no}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>Batch Year</label>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', padding: '10px 14px', background: 'var(--bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border)' }}>
                {profile?.batch_year}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>Enrolled Course</label>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', padding: '10px 14px', background: 'var(--bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border)' }}>
                {profile?.course?.course_name}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-muted)' }}>Current Semester</label>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', padding: '10px 14px', background: 'var(--bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border)' }}>
                Semester {profile?.semester?.semester_number} ({profile?.semester?.term_type})
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ margin: 0 }} />

        {/* Security Notice */}
        <div style={{ padding: 32, background: 'var(--bg)' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
              <Shield size={20} color="var(--primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: 4 }}>Account Security</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Your account is managed by the university administrator. If you need to update your email or change your password, please contact the IT Helpdesk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
