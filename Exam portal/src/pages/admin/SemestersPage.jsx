import React, { useEffect, useState } from 'react';
import { Plus, Trash2, CalendarDays, X } from 'lucide-react';
import { adminService } from '../../services/adminService';

export default function SemestersPage() {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ course_id: '', academic_year_id: '', semester_number: 1, term_type: 'ODD' });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    const [s, c, y] = await Promise.all([adminService.getSemesters(), adminService.getCourses(), adminService.getAcademicYears()]);
    setSemesters(s); setCourses(c); setAcademicYears(y); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const getCourseName = (id) => courses.find((c) => c.course_id === Number(id))?.course_name || '—';
  const getYearLabel = (id) => {
    const y = academicYears.find((a) => a.academic_year_id === Number(id));
    return y ? `${y.year_start}–${y.year_end}` : '—';
  };

  const handleSave = async () => {
    if (!form.course_id || !form.academic_year_id) return;
    setSaving(true);
    await adminService.addSemester({ ...form, course_id: Number(form.course_id), academic_year_id: Number(form.academic_year_id), semester_number: Number(form.semester_number) });
    await load(); setSaving(false); setShowModal(false);
  };
  const handleDelete = async (id) => { await adminService.deleteSemester(id); setDeleteConfirm(null); load(); };

  return (
    <div>
      <div className="page-header">
        <div><h1>Semesters</h1><p>Manage semesters linked to courses and academic years.</p></div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => { setForm({ course_id: '', academic_year_id: '', semester_number: 1, term_type: 'ODD' }); setShowModal(true); }} id="add-semester-btn">
            <Plus size={16} /> Add Semester
          </button>
        </div>
      </div>

      <div className="table-container">
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : semesters.length === 0 ? <div className="empty-state"><CalendarDays size={48} /><h3>No semesters found</h3></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>#</th><th>Course</th><th>Semester</th><th>Academic Year</th><th>Term Type</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {semesters.map((s, i) => (
                    <tr key={s.semester_id}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td><span style={{ fontWeight: 600 }}>{getCourseName(s.course_id)}</span></td>
                      <td><span className="badge badge-purple">Semester {s.semester_number}</span></td>
                      <td><span style={{ fontSize: '0.82rem' }}>{getYearLabel(s.academic_year_id)}</span></td>
                      <td>
                        <span className={`badge ${s.term_type === 'ODD' ? 'badge-amber' : 'badge-blue'}`}>{s.term_type}</span>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(s)} title="Delete">
                          <Trash2 size={14} />
                        </button>
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
              <h3 className="modal-title">Add Semester</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label required">Course</label>
                <select className="form-select" value={form.course_id} onChange={(e) => setForm({ ...form, course_id: e.target.value })} id="sem-course-select">
                  <option value="">Select Course</option>
                  {courses.map((c) => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Academic Year</label>
                <select className="form-select" value={form.academic_year_id} onChange={(e) => setForm({ ...form, academic_year_id: e.target.value })} id="sem-year-select">
                  <option value="">Select Year</option>
                  {academicYears.map((y) => <option key={y.academic_year_id} value={y.academic_year_id}>{y.year_start}–{y.year_end}</option>)}
                </select>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label required">Semester Number</label>
                  <select className="form-select" value={form.semester_number} onChange={(e) => setForm({ ...form, semester_number: e.target.value })} id="sem-number-select">
                    {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">Term Type</label>
                  <select className="form-select" value={form.term_type} onChange={(e) => setForm({ ...form, term_type: e.target.value })} id="sem-term-select">
                    <option value="ODD">ODD</option>
                    <option value="EVEN">EVEN</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.course_id || !form.academic_year_id} id="save-semester-btn">
                {saving ? 'Saving...' : 'Add Semester'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ color: 'var(--danger)' }}>Delete Semester</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body"><div className="alert alert-error"><Trash2 size={18} /><div>Delete <strong>Semester {deleteConfirm.semester_number}</strong> of {getCourseName(deleteConfirm.course_id)}? This cannot be undone.</div></div></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.semester_id)} id="confirm-delete-sem-btn"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
