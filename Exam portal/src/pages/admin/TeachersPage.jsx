import React, { useEffect, useState } from 'react';
import { Users, Trash2, X } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { users, departments, teachingAssignments, subjects } from '../../data/mockData';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = () => adminService.getTeachers().then((t) => { setTeachers(t); setLoading(false); });
  useEffect(() => { load(); }, []);

  const getUserInfo = (userId) => users.find((u) => u.user_id === userId);
  const getDeptName = (deptId) => departments.find((d) => d.department_id === deptId)?.department_name || '—';
  const getAssignedSubjects = (teacherId) => {
    const ids = teachingAssignments.filter((a) => a.teacher_id === teacherId).map((a) => a.subject_id);
    return subjects.filter((s) => ids.includes(s.subject_id));
  };

  const filtered = teachers.filter((t) => {
    const user = getUserInfo(t.user_id);
    return user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      getDeptName(t.department_id).toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="page-header">
        <div><h1>Teachers</h1><p>View and manage teaching staff profiles.</p></div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="search-box">
            <Users size={16} />
            <input placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} id="teacher-search" />
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} teachers</span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>Teacher</th><th>Designation</th><th>Department</th><th>Subjects</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((t) => {
                    const user = getUserInfo(t.user_id);
                    const assignedSubjects = getAssignedSubjects(t.teacher_id);
                    return (
                      <tr key={t.teacher_id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                              {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600 }}>{user?.full_name}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-blue">{t.designation}</span></td>
                        <td style={{ fontSize: '0.82rem' }}>{getDeptName(t.department_id)}</td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {assignedSubjects.slice(0, 2).map((s) => (
                              <span key={s.subject_id} className="badge badge-purple">{s.subject_code}</span>
                            ))}
                            {assignedSubjects.length > 2 && <span className="badge badge-gray">+{assignedSubjects.length - 2} more</span>}
                            {assignedSubjects.length === 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None assigned</span>}
                          </div>
                        </td>
                        <td><span className="badge badge-green">Active</span></td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(t)}><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ color: 'var(--danger)' }}>Remove Teacher</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body">
              <div className="alert alert-error">
                <Trash2 size={18} />
                <div>Remove <strong>{getUserInfo(deleteConfirm.user_id)?.full_name}</strong>? Their subject assignments will also be removed.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={async () => { await adminService.deleteTeacher(deleteConfirm.teacher_id); setDeleteConfirm(null); load(); }} id="confirm-delete-teacher-btn"><Trash2 size={14} /> Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
