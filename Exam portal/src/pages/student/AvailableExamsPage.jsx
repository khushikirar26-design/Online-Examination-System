import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Clock, Calendar, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';

export default function AvailableExamsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      studentService.getAvailableExams(user.user_id).then(e => {
        setExams(e);
        setLoading(false);
      });
    }
  }, [user]);

  const handleStartExam = (scheduleId) => {
    navigate(`/student/exam/${scheduleId}`);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Available Examinations</h1>
          <p>View and start your scheduled examinations.</p>
        </div>
      </div>

      {loading ? <div className="loading-state"><div className="spinner" /></div>
        : exams.length === 0 ? (
          <div className="empty-state" style={{ background: 'white', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)', padding: '80px 20px' }}>
            <ClipboardList size={56} style={{ color: 'var(--success)' }} />
            <h2 style={{ marginTop: 16 }}>No upcoming examinations</h2>
            <p>You have completed all scheduled exams for now. Check back later!</p>
          </div>
        ) : (
          <div className="grid-3">
            {exams.map(e => {
              const now = new Date();
              const examDate = new Date(`${e.exam_date}T${e.start_time}`);
              const endDate = new Date(`${e.exam_date}T${e.end_time}`);
              const isLive = now >= examDate && now <= endDate;
              const isPast = now > endDate;

              if (isPast) return null; // Shouldn't happen based on service, but safe guard

              return (
                <div key={e.schedule_id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="card-header" style={{ background: isLive ? 'var(--success-light)' : 'var(--bg)', borderBottomColor: isLive ? 'var(--success)' : 'var(--border)' }}>
                    <span className="card-title" style={{ color: isLive ? 'var(--success)' : 'var(--text-primary)' }}>
                      {e.exam?.exam_code}
                    </span>
                    {isLive && <span className="badge badge-green" style={{ animation: 'pulse 2s infinite' }}>LIVE NOW</span>}
                  </div>
                  <div className="card-body" style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>{e.subject?.subject_name}</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Calendar size={16} color="var(--primary)" />
                        {new Date(e.exam_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Clock size={16} color="var(--primary)" />
                        {e.start_time} - {e.end_time} ({e.exam?.duration} minutes)
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ClipboardList size={16} color="var(--primary)" />
                        {e.exam?.exam_type} • {e.exam?.total_marks} Marks
                      </div>
                    </div>
                  </div>
                  <div className="card-footer" style={{ background: 'white' }}>
                    {isLive ? (
                      <button className="btn btn-success" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleStartExam(e.schedule_id)}>
                        <ShieldAlert size={16} /> Start Examination
                      </button>
                    ) : (
                      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} disabled>
                        Starts at {e.start_time}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
