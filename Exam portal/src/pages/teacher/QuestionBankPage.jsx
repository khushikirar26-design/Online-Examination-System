import React, { useEffect, useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Eye, FileQuestion, X,
  ChevronDown, ChevronUp, Filter
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers, subjects, options as allOptions } from '../../data/mockData';

const DIFFICULTY_COLORS = { EASY: 'diff-easy', MEDIUM: 'diff-medium', HARD: 'diff-hard' };
const TYPE_COLORS = { MCQ: 'badge-blue', THEORY: 'badge-purple' };

export default function QuestionBankPage() {
  const { user } = useAuth();
  const teacher = teachers.find((t) => t.user_id === user?.user_id);

  const [questions, setQuestions] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDiff, setFilterDiff] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editQ, setEditQ] = useState(null);
  const [viewQ, setViewQ] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ question_text: '', subject_id: '', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' });
  const [mcqOptions, setMcqOptions] = useState([
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false },
  ]);

  const load = async () => {
    const [qs, subs] = await Promise.all([
      teacherService.getQuestions(teacher.teacher_id),
      teacherService.getAssignedSubjects(teacher.teacher_id),
    ]);
    setQuestions(qs); setAssignedSubjects(subs); setLoading(false);
  };
  useEffect(() => { if (teacher) load(); }, [teacher?.teacher_id]);

  const getSubjectName = (id) => assignedSubjects.find((s) => s.subject_id === id)?.subject_name || subjects.find((s) => s.subject_id === id)?.subject_name || '—';

  const filtered = questions.filter((q) =>
    q.question_text.toLowerCase().includes(search.toLowerCase()) &&
    (filterSubject === '' || q.subject_id === Number(filterSubject)) &&
    (filterType === '' || q.question_type === filterType) &&
    (filterDiff === '' || q.difficulty === filterDiff)
  );

  const openAdd = () => {
    setEditQ(null);
    setForm({ question_text: '', subject_id: '', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' });
    setMcqOptions([{ option_text: '', is_correct: false }, { option_text: '', is_correct: false }, { option_text: '', is_correct: false }, { option_text: '', is_correct: false }]);
    setShowModal(true);
  };
  const openEdit = (q) => {
    setEditQ(q);
    setForm({ question_text: q.question_text, subject_id: q.subject_id, marks: q.marks, question_type: q.question_type, difficulty: q.difficulty });
    const opts = allOptions.filter((o) => o.question_id === q.question_id);
    setMcqOptions(opts.length > 0 ? opts.map((o) => ({ option_text: o.option_text, is_correct: o.is_correct })) : [{ option_text: '', is_correct: false }, { option_text: '', is_correct: false }, { option_text: '', is_correct: false }, { option_text: '', is_correct: false }]);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.question_text.trim() || !form.subject_id) return;
    setSaving(true);
    const data = { ...form, subject_id: Number(form.subject_id), marks: Number(form.marks) };
    if (editQ) await teacherService.updateQuestion(editQ.question_id, data);
    else await teacherService.addQuestion(data);
    await load(); setSaving(false); setShowModal(false);
  };
  const handleDelete = async (id) => { await teacherService.deleteQuestion(id); setDeleteConfirm(null); load(); };

  const mcqStats = questions.filter((q) => q.question_type === 'MCQ').length;
  const theoryStats = questions.filter((q) => q.question_type === 'THEORY').length;
  const easyStats = questions.filter((q) => q.difficulty === 'EASY').length;
  const medStats = questions.filter((q) => q.difficulty === 'MEDIUM').length;
  const hardStats = questions.filter((q) => q.difficulty === 'HARD').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Question Bank</h1>
          <p>Manage questions for your assigned subjects. Questions can be reused across multiple exams.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={openAdd} id="add-question-btn"><Plus size={16} /> Add Question</button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: questions.length, color: 'var(--primary)' },
          { label: 'MCQ', value: mcqStats, color: 'var(--info)' },
          { label: 'Theory', value: theoryStats, color: '#8b5cf6' },
          { label: 'Easy', value: easyStats, color: 'var(--success)' },
          { label: 'Medium', value: medStats, color: 'var(--warning)' },
          { label: 'Hard', value: hardStats, color: 'var(--danger)' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-filters">
            <div className="search-box" style={{ minWidth: 280 }}>
              <Search size={16} />
              <input placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} id="q-search" />
            </div>
            <select className="form-select" style={{ width: 160 }} value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} id="q-subject-filter">
              <option value="">All Subjects</option>
              {assignedSubjects.map((s) => <option key={s.subject_id} value={s.subject_id}>{s.subject_name}</option>)}
            </select>
            <select className="form-select" style={{ width: 120 }} value={filterType} onChange={(e) => setFilterType(e.target.value)} id="q-type-filter">
              <option value="">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="THEORY">Theory</option>
            </select>
            <select className="form-select" style={{ width: 130 }} value={filterDiff} onChange={(e) => setFilterDiff(e.target.value)} id="q-diff-filter">
              <option value="">All Difficulty</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} question{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : filtered.length === 0 ? <div className="empty-state"><FileQuestion size={48} /><h3>No questions found</h3><p>Try adjusting filters or add a new question.</p></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th style={{ width: 40 }}>#</th><th>Question</th><th>Subject</th><th>Type</th><th>Marks</th><th>Difficulty</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <tr key={q.question_id}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{i + 1}</td>
                      <td style={{ maxWidth: 360 }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {q.question_text}
                        </p>
                      </td>
                      <td><span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{getSubjectName(q.subject_id)}</span></td>
                      <td><span className={`badge ${TYPE_COLORS[q.question_type]}`}>{q.question_type}</span></td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{q.marks}</td>
                      <td><span className={`badge ${DIFFICULTY_COLORS[q.difficulty]}`}>{q.difficulty}</span></td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => setViewQ(q)} title="View"><Eye size={14} /></button>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(q)} title="Edit"><Edit2 size={14} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(q)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editQ ? 'Edit Question' : 'Add New Question'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label required">Question Text</label>
                <textarea className="form-textarea" rows={3} placeholder="Enter the question..." value={form.question_text} onChange={(e) => setForm({ ...form, question_text: e.target.value })} autoFocus id="q-text-input" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label required">Subject</label>
                  <select className="form-select" value={form.subject_id} onChange={(e) => setForm({ ...form, subject_id: e.target.value })} id="q-subject-select">
                    <option value="">Select Subject</option>
                    {assignedSubjects.map((s) => <option key={s.subject_id} value={s.subject_id}>{s.subject_name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">Question Type</label>
                  <select className="form-select" value={form.question_type} onChange={(e) => setForm({ ...form, question_type: e.target.value })} id="q-type-select">
                    <option value="MCQ">MCQ</option>
                    <option value="THEORY">Theory</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label required">Marks</label>
                  <input className="form-input" type="number" min={1} max={20} value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} id="q-marks-input" />
                </div>
                <div className="form-group">
                  <label className="form-label required">Difficulty</label>
                  <select className="form-select" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} id="q-diff-select">
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              {form.question_type === 'MCQ' && (
                <div>
                  <div className="divider" />
                  <label className="form-label">MCQ Options <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(mark correct answer)</span></label>
                  {mcqOptions.map((opt, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                      <input type="radio" name="correct-opt" checked={opt.is_correct} onChange={() => setMcqOptions(mcqOptions.map((o, j) => ({ ...o, is_correct: i === j })))} style={{ accentColor: 'var(--primary)', width: 16, height: 16, flexShrink: 0 }} id={`opt-radio-${i}`} />
                      <input className="form-input" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={opt.option_text} onChange={(e) => setMcqOptions(mcqOptions.map((o, j) => j === i ? { ...o, option_text: e.target.value } : o))} id={`opt-text-${i}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving} id="save-question-btn">{saving ? 'Saving...' : editQ ? 'Update' : 'Add Question'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewQ && (
        <div className="modal-overlay" onClick={() => setViewQ(null)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Question Details</h3>
              <button className="modal-close" onClick={() => setViewQ(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className={`badge ${TYPE_COLORS[viewQ.question_type]}`}>{viewQ.question_type}</span>
                <span className={`badge ${DIFFICULTY_COLORS[viewQ.difficulty]}`}>{viewQ.difficulty}</span>
                <span className="badge badge-purple">{viewQ.marks} mark{viewQ.marks > 1 ? 's' : ''}</span>
                <span className="badge badge-blue">{getSubjectName(viewQ.subject_id)}</span>
              </div>
              <div className="question-text-content">{viewQ.question_text}</div>
              {viewQ.question_type === 'MCQ' && (
                <div>
                  <label className="form-label" style={{ marginBottom: 10 }}>Options:</label>
                  {allOptions.filter((o) => o.question_id === viewQ.question_id).map((opt, i) => (
                    <div key={opt.option_id} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 8, marginBottom: 8,
                      background: opt.is_correct ? 'var(--success-light)' : 'var(--bg)',
                      border: `1.5px solid ${opt.is_correct ? 'var(--success)' : 'var(--border)'}`,
                    }}>
                      <span style={{ fontWeight: 700, color: opt.is_correct ? 'var(--success)' : 'var(--text-muted)', minWidth: 20 }}>{String.fromCharCode(65 + i)}.</span>
                      <span style={{ flex: 1, fontSize: '0.875rem' }}>{opt.option_text}</span>
                      {opt.is_correct && <span className="badge badge-green">Correct</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setViewQ(null)}>Close</button>
              <button className="btn btn-secondary" onClick={() => { setViewQ(null); openEdit(viewQ); }}>Edit Question</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ color: 'var(--danger)' }}>Delete Question</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body"><div className="alert alert-error"><Trash2 size={18} /><div>Delete this question? It will be removed from all exams it is used in.</div></div></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.question_id)} id="confirm-delete-q-btn"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
