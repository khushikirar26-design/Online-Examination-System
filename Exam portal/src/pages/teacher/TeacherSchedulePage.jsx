import React, { useEffect, useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle, Edit2, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers } from '../../data/mockData';

export default function TeacherSchedulePage() {
  const { user } = useAuth();
  const teacher = teachers.find(t => t.user_id === user?.user_id);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);
  const [form, setForm] = useState({ exam_date: '', start_time: '', end_time: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (teacher) {
      const e = await teacherService.getExams(teacher.teacher_id);
      setExams(e);
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [teacher]);

  const openEdit = (exam) => {
    setEditSchedule(exam);
    if (exam.schedule) {
      setForm({
        exam_date: exam.schedule.exam_date,
        start_time: exam.schedule.start_time,
        end_time: exam.schedule.end_time
      });
    } else {
      setForm({ exam_date: '', start_time: '', end_time: '' });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.exam_date || !form.start_time || !form.end_time) return;
    setSaving(true);
    await teacherService.updateExamSchedule(editSchedule.schedule?.schedule_id, form);
    await load();
    setSaving(false);
    setShowModal(false);
  };

  // Only show exams that have a schedule or need one (all exams actually)
  const sortedExams = [...exams].sort((a, b) => {
    if (!a.schedule && !b.schedule) return 0;
    if (!a.schedule) return 1;
    if (!b.schedule) return -1;
    return new Date(a.schedule.exam_date) - new Date(b.schedule.exam_date);
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Exam Schedule</h1>
          <p>Manage timings and dates for your examinations.</p>
        </div>
      </div>

      <div className="table-container">
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : sortedExams.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <h3>No Exams Found</h3>
              <p>Create exams first before scheduling them.</p>
            </div>
          ) : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Exam Details</th>
                    <th>Date</th>
                    <th>Timing</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedExams.map(e => {
                    const isUnscheduled = !e.schedule;
                    const now = new Date();
                    const examDate = e.schedule ? new Date(`${e.schedule.exam_date}T${e.schedule.start_time}`) : null;
                    const endDate = e.schedule ? new Date(`${e.schedule.exam_date}T${e.schedule.end_time}`) : null;
                    
                    let statusClass = 'badge-gray';
                    let statusText = 'Not Scheduled';
                    if (!isUnscheduled) {
                      if (now < examDate) { statusClass = 'badge-blue'; statusText = 'Upcoming'; }
                      else if (now >= examDate && now <= endDate) { statusClass = 'badge-green'; statusText = 'Live'; }
                      else { statusClass = 'badge-gray'; statusText = 'Completed'; }
                    }

                    return (
                      <tr key={e.exam_id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{e.exam_code}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.subject?.subject_name}</div>
                        </td>
                        <td>
                          {isUnscheduled ? '—' : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                              <Calendar size={14} color="var(--primary)" /> 
                              {new Date(e.schedule.exam_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                          )}
                        </td>
                        <td>
                          {isUnscheduled ? '—' : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                              <Clock size={14} color="var(--primary)" />
                              {e.schedule.start_time} to {e.schedule.end_time}
                            </div>
                          )}
                        </td>
                        <td><span className={`badge ${statusClass}`}>{statusText}</span></td>
                        <td>
                          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(e)} disabled={statusText === 'Live' || statusText === 'Completed'}>
                            <Edit2 size={14} /> {isUnscheduled ? 'Set Schedule' : 'Edit'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Schedule Exam: {editSchedule?.exam_code}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label required">Exam Date</label>
                <input type="date" className="form-input" value={form.exam_date} onChange={(e) => setForm({...form, exam_date: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label required">Start Time</label>
                  <input type="time" className="form-input" value={form.start_time} onChange={(e) => setForm({...form, start_time: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label required">End Time</label>
                  <input type="time" className="form-input" value={form.end_time} onChange={(e) => setForm({...form, end_time: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.exam_date || !form.start_time || !form.end_time}>
                {saving ? 'Saving...' : 'Save Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
