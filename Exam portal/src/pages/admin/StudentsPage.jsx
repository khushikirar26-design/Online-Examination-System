import React, { useEffect, useState } from 'react';
import { Plus, Trash2, GraduationCap, X } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { users, courses, semesters } from '../../data/mockData';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = () => adminService.getStudents().then((s) => { setStudents(s); setLoading(false); });
  useEffect(() => { load(); }, []);

  const getUserInfo = (userId) => users.find((u) => u.user_id === userId);
  const getCourseName = (courseId) => courses.find((c) => c.course_id === courseId)?.course_name || '—';
  const getSemesterNum = (semId) => semesters.find((s) => s.semester_id === semId)?.semester_number || '—';

  const filtered = students.filter((s) => {
    const user = getUserInfo(s.user_id);
    const matches = user?.full_name?.toLowerCase().includes(search.toLowerCase()) || s.scholar_no?.toLowerCase().includes(search.toLowerCase());
    const courseMatch = filterCourse === '' || s.course_id === Number(filterCourse);
    return matches && courseMatch;
  });

  return (
    <div>
      <div className="page-header">
        <div><h1>Students</h1><p>Manage enrolled students and their academic details.</p></div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-filters">
            <div className="search-box">
              <GraduationCap size={16} />
              <input placeholder="Search by name or scholar no..." value={search} onChange={(e) => setSearch(e.target.value)} id="student-search" />
            </div>
            <select className="form-select" style={{ width: 160 }} value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} id="student-course-filter">
              <option value="">All Courses</option>
              {courses.map((c) => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
            </select>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} students</span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : filtered.length === 0 ? <div className="empty-state"><GraduationCap size={48} /><h3>No students found</h3></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>Student</th><th>Scholar No</th><th>Course</th><th>Current Semester</th><th>Batch Year</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const user = getUserInfo(s.user_id);
                    return (
                      <tr key={s.student_id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                              {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.full_name}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><code style={{ fontSize: '0.8rem', background: 'var(--primary-pale)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 6 }}>{s.scholar_no}</code></td>
                        <td><span className="badge badge-blue">{getCourseName(s.course_id)}</span></td>
                        <td><span className="badge badge-purple">Sem {getSemesterNum(s.current_semester_id)}</span></td>
                        <td>{s.batch_year}</td>
                        <td><span className="badge badge-green">Active</span></td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(s)}><Trash2 size={14} /></button>
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
            <div className="modal-header"><h3 style={{ color: 'var(--danger)' }}>Remove Student</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body"><div className="alert alert-error"><Trash2 size={18} /><div>Remove student <strong>{getUserInfo(deleteConfirm.user_id)?.full_name}</strong>? Scholar No: <strong>{deleteConfirm.scholar_no}</strong></div></div></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={async () => { await adminService.deleteStudent(deleteConfirm.student_id); setDeleteConfirm(null); load(); }} id="confirm-delete-student-btn"><Trash2 size={14} /> Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
