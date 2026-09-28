import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, X } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { teachers as teachersData, teachingAssignments, users } from '../../data/mockData';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [form, setForm] = useState({ subject_code: '', subject_name: '', course_id: '', semester_number: 1 });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const load = async () => {
    const [s, c] = await Promise.all([adminService.getSubjects(), adminService.getCourses()]);
    setSubjects(s); setCourses(c); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const getCourseName = (id) => courses.find((c) => c.course_id === id)?.course_name || '—';
  const getTeacherName = (subjectId) => {
    const assign = teachingAssignments.find((a) => a.subject_id === subjectId);
    if (!assign) return 'Not Assigned';
    const teacher = teachersData.find((t) => t.teacher_id === assign.teacher_id);
    const user = users.find((u) => u.user_id === teacher?.user_id);
    return user?.full_name || '—';
  };

  const handleSave = async () => {
    if (!form.subject_code.trim() || !form.subject_name.trim() || !form.course_id) return;
    setSaving(true);
    if (editSubject) await adminService.updateSubject(editSubject.subject_id, { ...form, course_id: Number(form.course_id), semester_number: Number(form.semester_number) });
    else await adminService.addSubject({ ...form, course_id: Number(form.course_id), semester_number: Number(form.semester_number) });
    await load(); setSaving(false); setShowModal(false);
  };
  const handleDelete = async (id) => { await adminService.deleteSubject(id); setDeleteConfirm(null); load(); };
  const openAdd = () => { setEditSubject(null); setForm({ subject_code: '', subject_name: '', course_id: '', semester_number: 1 }); setShowModal(true); };
  const openEdit = (s) => { setEditSubject(s); setForm({ subject_code: s.subject_code, subject_name: s.subject_name, course_id: s.course_id, semester_number: s.semester_number }); setShowModal(true); };

  const difficultyColors = ['#7c3aed', '#6366f1', '#8b5cf6', '#a78bfa'];

  const filtered = subjects.filter((s) =>
    (s.subject_name.toLowerCase().includes(search.toLowerCase()) || s.subject_code.toLowerCase().includes(search.toLowerCase())) &&
    (filterCourse === '' || s.course_id === Number(filterCourse))
  );

  return (
    <div>
      <div className="page-header">
        <div><h1>Subjects</h1><p>Manage subjects and their course associations.</p></div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={openAdd} id="add-subject-btn"><Plus size={16} /> Add Subject</button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-filters">
            <div className="search-box">
              <BookOpen size={16} />
              <input placeholder="Search subjects..." value={search} onChange={(e) => setSearch(e.target.value)} id="subject-search" />
            </div>
            <select className="form-select" style={{ width: 180 }} value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} id="subject-course-filter">
              <option value="">All Courses</option>
              {courses.map((c) => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
            </select>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} subject{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : filtered.length === 0 ? <div className="empty-state"><BookOpen size={48} /><h3>No subjects found</h3></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>#</th><th>Subject Code</th><th>Subject Name</th><th>Course</th><th>Semester</th><th>Teacher</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.subject_id}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td><code style={{ background: 'var(--primary-pale)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700 }}>{s.subject_code}</code></td>
                      <td><span style={{ fontWeight: 600 }}>{s.subject_name}</span></td>
                      <td><span className="badge badge-blue">{getCourseName(s.course_id)}</span></td>
                      <td><span className="badge badge-purple">Sem {s.semester_number}</span></td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{getTeacherName(s.subject_id)}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}><Edit2 size={14} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(s)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editSubject ? 'Edit Subject' : 'Add New Subject'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label required">Subject Code</label>
                  <input className="form-input" placeholder="e.g. MCA201" value={form.subject_code} onChange={(e) => setForm({ ...form, subject_code: e.target.value })} autoFocus id="subject-code-input" />
                </div>
                <div className="form-group">
                  <label className="form-label required">Semester Number</label>
                  <select className="form-select" value={form.semester_number} onChange={(e) => setForm({ ...form, semester_number: e.target.value })} id="subject-sem-select">
                    {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>Semester {n}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label required">Subject Name</label>
                <input className="form-input" placeholder="e.g. Database Management Systems" value={form.subject_name} onChange={(e) => setForm({ ...form, subject_name: e.target.value })} id="subject-name-input" />
              </div>
              <div className="form-group">
                <label className="form-label required">Course</label>
                <select className="form-select" value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} id="subject-course-select">
                  <option value="">Select Course</option>
                  {courses.map((c) => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving} id="save-subject-btn">
                {saving ? 'Saving...' : editSubject ? 'Update' : 'Add Subject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3 className="modal-title" style={{ color: 'var(--danger)' }}>Delete Subject</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body"><div className="alert alert-error"><Trash2 size={18} /><div>Delete <strong>{deleteConfirm.subject_name}</strong>? This cannot be undone.</div></div></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.subject_id)} id="confirm-delete-subject-btn"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
