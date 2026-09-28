import React, { useEffect, useState } from 'react';
import { ClipboardList, Calendar, Clock, BookOpen } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { subjects, semesters, teachers as teachersData, users } from '../../data/mockData';

export default function AdminExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getExams().then((e) => { setExams(e); setLoading(false); });
  }, []);

  const getTeacherName = (teacherId) => {
    const t = teachersData.find((t) => t.teacher_id === teacherId);
    const u = users.find((u) => u.user_id === t?.user_id);
    return u?.full_name || '—';
  };
  const getSemName = (semId) => {
    const s = semesters.find((s) => s.semester_id === semId);
    return s ? `Semester ${s.semester_number}` : '—';
  };
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
        <div><h1>Examinations</h1><p>Overview of all examinations across all departments.</p></div>
      </div>

      <div className="table-container">
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>Exam Code</th><th>Subject</th><th>Type</th><th>Teacher</th><th>Semester</th><th>Date</th><th>Duration</th><th>Marks</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {exams.map((e) => (
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
                      <td style={{ fontSize: '0.82rem' }}>{getTeacherName(e.teacher_id)}</td>
                      <td><span className="badge badge-blue">{getSemName(e.semester_id)}</span></td>
                      <td style={{ fontSize: '0.82rem' }}>
                        {e.schedule ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Calendar size={13} color="var(--text-muted)" />
                            {new Date(e.schedule.exam_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                        ) : '—'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem' }}>
                          <Clock size={13} color="var(--text-muted)" /> {e.duration} min
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{e.total_marks}</td>
                      <td>{getStatusBadge(e)}</td>
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
