import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Plus, Search, Calendar, Clock, BookOpen, Edit2, Play, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers } from '../../data/mockData';

export default function TeacherExamsPage() {
  const { user } = useAuth();
  const teacher = teachers.find((t) => t.user_id === user?.user_id);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (teacher) {
      teacherService.getExams(teacher.teacher_id).then((e) => {
        setExams(e);
        setLoading(false);
      });
    }
  }, [teacher]);

  const filtered = exams.filter(e => 
    e.exam_code.toLowerCase().includes(search.toLowerCase()) || 
    (e.subject?.subject_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (exam) => {
    if (!exam.schedule) return <span className="badge badge-gray">Not Scheduled</span>;
    const now = new Date();
    const examDate = new Date(`${exam.schedule.exam_date}T${exam.schedule.start_time}`);
    const endDate = new Date(`${exam.schedule.exam_date}T${exam.schedule.end_time}`);
    if (now < examDate) return <span className="badge badge-blue">Upcoming</span>;
    if (now >= examDate && now <= endDate) return <span className="badge badge-green">Live</span>;
    return <span className="badge badge-gray">Completed</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>My Examinations</h1>
          <p>View and manage all examinations you have created.</p>
        </div>
        <div className="page-header-actions">
          <Link to="/teacher/exams/create" className="btn btn-primary">
            <Plus size={16} /> Create Exam
          </Link>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="search-box" style={{ minWidth: 300 }}>
            <Search size={16} />
            <input 
              placeholder="Search by exam code or subject..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {filtered.length} exam{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : filtered.length === 0 ? (
            <div className="empty-state">
              <ClipboardList size={48} />
              <h3>No examinations found</h3>
              <p>You haven't created any examinations yet, or none match your search.</p>
              <Link to="/teacher/exams/create" className="btn btn-primary" style={{ marginTop: 16 }}>Create First Exam</Link>
            </div>
          ) : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Exam Code</th>
                    <th>Subject</th>
                    <th>Type</th>
                    <th>Schedule</th>
                    <th>Duration & Marks</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(e => (
                    <tr key={e.exam_id}>
                      <td><code style={{ background: 'var(--primary-pale)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 700 }}>{e.exam_code}</code></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                            <BookOpen size={14} />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{e.subject?.subject_name || '—'}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-purple">{e.exam_type}</span></td>
                      <td>
                        {e.schedule ? (
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                              <Calendar size={13} /> {new Date(e.schedule.exam_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                              <Clock size={13} /> {e.schedule.start_time} - {e.schedule.end_time}
                            </div>
                          </div>
                        ) : <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Unscheduled</span>}
                      </td>
                      <td>
                        <div style={{ fontSize: '0.82rem' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.total_marks} Marks</div>
                          <div style={{ color: 'var(--text-muted)' }}>{e.duration} mins</div>
                        </div>
                      </td>
                      <td>{getStatusBadge(e)}</td>
                      <td>
                        <div className="table-actions">
                          <Link to="/teacher/schedule" className="btn btn-ghost btn-sm" title="Schedule">
                            <Calendar size={14} />
                          </Link>
                          <Link to="/teacher/results" className="btn btn-ghost btn-sm" title="Results">
                            <Users size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}
