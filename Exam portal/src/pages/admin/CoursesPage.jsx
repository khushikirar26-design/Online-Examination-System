import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, School, X } from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [form, setForm] = useState({ course_name: '', department_id: '', total_semesters: 4 });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');

  const load = async () => {
    const [c, d] = await Promise.all([adminService.getCourses(), adminService.getDepartments()]);
    setCourses(c); setDepartments(d); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditCourse(null); setForm({ course_name: '', department_id: '', total_semesters: 4 }); setShowModal(true); };
  const openEdit = (c) => { setEditCourse(c); setForm({ course_name: c.course_name, department_id: c.department_id, total_semesters: c.total_semesters }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.course_name.trim() || !form.department_id) return;
    setSaving(true);
    if (editCourse) {
      await adminService.updateCourse(editCourse.course_id, form);
    } else {
      await adminService.addCourse({ ...form, department_id: Number(form.department_id), total_semesters: Number(form.total_semesters) });
    }
    await load(); setSaving(false); setShowModal(false);
  };

  const handleDelete = async (id) => { await adminService.deleteCourse(id); setDeleteConfirm(null); load(); };
  const getDeptName = (id) => departments.find((d) => d.department_id === id)?.department_name || '—';

  const filtered = courses.filter((c) =>
    c.course_name.toLowerCase().includes(search.toLowerCase()) ||
    getDeptName(c.department_id).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div><h1>Courses</h1><p>Manage academic courses and programs. Only administrators can add or delete courses.</p></div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={openAdd} id="add-course-btn"><Plus size={16} /> Add Course</button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="search-box">
            <School size={16} />
            <input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} id="course-search" />
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /><p>Loading...</p></div>
          : filtered.length === 0 ? <div className="empty-state"><School size={48} /><h3>No courses found</h3></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th><th>Course Name</th><th>Department</th><th>Total Semesters</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.course_id}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--info)' }}>
                            <School size={16} />
                          </div>
                          <span style={{ fontWeight: 600 }}>{c.course_name}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-blue">{getDeptName(c.department_id)}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 80 }}>
                            <div className="progress-fill" style={{ width: `${(c.total_semesters / 8) * 100}%` }} />
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{c.total_semesters}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}><Edit2 size={14} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(c)}><Trash2 size={14} /></button>
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
              <h3 className="modal-title">{editCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label required">Course Name</label>
                <input className="form-input" placeholder="e.g. MCA" value={form.course_name} onChange={(e) => setForm({ ...form, course_name: e.target.value })} autoFocus id="course-name-input" />
              </div>
              <div className="form-group">
                <label className="form-label required">Department</label>
                <select className="form-select" value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value })} id="course-dept-select">
                  <option value="">Select Department</option>
                  {departments.map((d) => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Total Semesters</label>
                <select className="form-select" value={form.total_semesters} onChange={(e) => setForm({ ...form, total_semesters: e.target.value })} id="course-semesters-select">
                  {[2, 4, 6, 8].map((n) => <option key={n} value={n}>{n} Semesters</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.course_name.trim() || !form.department_id} id="save-course-btn">
                {saving ? 'Saving...' : editCourse ? 'Update' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ color: 'var(--danger)' }}>Delete Course</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-error">
                <Trash2 size={18} />
                <div>Delete <strong>{deleteConfirm.course_name}</strong>? This action cannot be undone.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.course_id)} id="confirm-delete-course-btn">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
