import React, { useEffect, useState } from 'react';
import { FileText, CheckCircle, Check, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers } from '../../data/mockData';

export default function TeacherEvaluatePage() {
  const { user } = useAuth();
  const teacher = teachers.find(t => t.user_id === user?.user_id);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeEval, setActiveEval] = useState(null);
  const [marks, setMarks] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (teacher) {
      const p = await teacherService.getPendingEvaluations(teacher.teacher_id);
      setPending(p.filter(evalItem => !evalItem.is_evaluated));
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [teacher]);

  const handleEvaluate = async () => {
    if (marks === '' || Number(marks) < 0 || Number(marks) > activeEval.max_marks) return;
    setSaving(true);
    await teacherService.evaluateAnswer(activeEval.student_exam_id, activeEval.question_id, Number(marks));
    setActiveEval(null);
    setMarks('');
    await load();
    setSaving(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Theory Evaluation</h1>
          <p>Review and grade pending descriptive answers.</p>
        </div>
      </div>

      {loading ? <div className="loading-state"><div className="spinner" /></div>
        : pending.length === 0 ? (
          <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <CheckCircle size={56} color="var(--success)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <h2>All Caught Up!</h2>
            <p style={{ color: 'var(--text-muted)' }}>You have no pending theory evaluations to grade.</p>
          </div>
        ) : (
          <div className="grid-2">
            {/* List of pending evaluations */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Pending ({pending.length})</span>
              </div>
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {pending.map((p, idx) => (
                  <div key={idx} 
                    onClick={() => { setActiveEval(p); setMarks(''); }}
                    style={{ 
                      padding: '16px', borderBottom: '1px solid var(--border)',
                      cursor: 'pointer', transition: 'all 0.2s',
                      background: activeEval?.student_exam_id === p.student_exam_id && activeEval?.question_id === p.question_id ? 'var(--primary-pale)' : 'white',
                      borderLeft: activeEval?.student_exam_id === p.student_exam_id && activeEval?.question_id === p.question_id ? '3px solid var(--primary)' : '3px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="badge badge-gray">{p.exam_code}</span>
                      <span className="badge badge-purple">{p.max_marks} Marks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <User size={14} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.student_name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({p.scholar_no})</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.question_text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Form */}
            <div>
              {activeEval ? (
                <div className="card" style={{ position: 'sticky', top: 80 }}>
                  <div className="card-header">
                    <span className="card-title">Evaluate Answer</span>
                    <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setActiveEval(null)}><X size={16}/></button>
                  </div>
                  <div className="card-body">
                    <div style={{ marginBottom: 20 }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--text-secondary)' }}>Question</h4>
                      <div className="question-text-content" style={{ margin: 0 }}>
                        {activeEval.question_text}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 24 }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--text-secondary)' }}>Student's Answer</h4>
                      <div style={{ 
                        padding: 16, background: '#f9fafb', border: '1px solid var(--border)', 
                        borderRadius: 'var(--border-radius-sm)', fontSize: '0.9rem', lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                      }}>
                        {activeEval.written_answer || <span style={{ color: 'var(--text-muted)' }}>[No answer provided]</span>}
                      </div>
                    </div>

                    <div className="divider" />
                    
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                      <div className="form-group" style={{ margin: 0, flex: 1 }}>
                        <label className="form-label required">Marks Awarded (Out of {activeEval.max_marks})</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          min={0} 
                          max={activeEval.max_marks}
                          step={0.5}
                          value={marks} 
                          onChange={(e) => setMarks(e.target.value)} 
                          style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                        />
                      </div>
                      <button 
                        className="btn btn-primary btn-lg" 
                        onClick={handleEvaluate}
                        disabled={saving || marks === '' || Number(marks) < 0 || Number(marks) > activeEval.max_marks}
                        style={{ height: 48 }}
                      >
                        {saving ? 'Saving...' : <><Check size={18} /> Save Marks</>}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state" style={{ height: '100%', minHeight: 400, background: 'var(--bg-card)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border)' }}>
                  <FileText size={48} />
                  <h3>Select an answer</h3>
                  <p>Click on an item from the list to view and evaluate the answer.</p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
