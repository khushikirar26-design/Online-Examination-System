import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Zap, List, Shuffle, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers, semesters } from '../../data/mockData';

const STEPS = ['Basic Info', 'Questions', 'Schedule', 'Review'];

export default function CreateExamPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const teacher = teachers.find((t) => t.user_id === user?.user_id);
  const [step, setStep] = useState(0);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Step 1: Basic Info
  const [form, setForm] = useState({ exam_name: '', exam_code: '', subject_id: '', semester_id: '', exam_type: 'MID SEMESTER' });
  // Step 2: Questions
  const [selectionMode, setSelectionMode] = useState('smart');
  const [smartConfig, setSmartConfig] = useState({ totalQuestions: 10, totalMarks: 20, mcqPercent: 70, easyPercent: 30, mediumPercent: 50, hardPercent: 20 });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [validation, setValidation] = useState(null);
  const [allSubjectQuestions, setAllSubjectQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  // Step 3: Schedule
  const [schedule, setSchedule] = useState({ exam_date: '', start_time: '', end_time: '' });
  // Step 4: Saving
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (teacher) teacherService.getAssignedSubjects(teacher.teacher_id).then((s) => { setAssignedSubjects(s); setLoading(false); });
  }, [teacher?.teacher_id]);

  const loadQuestionsForSubject = async (subjectId) => {
    if (!subjectId) return;
    const qs = await teacherService.getQuestionsBySubject(Number(subjectId));
    setAllSubjectQuestions(qs);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const result = await teacherService.generateQuestionSet({
      subjectId: Number(form.subject_id),
      totalQuestions: smartConfig.totalQuestions,
      totalMarks: smartConfig.totalMarks,
      distribution: {
        mcqPercent: smartConfig.mcqPercent,
        theoryPercent: 100 - smartConfig.mcqPercent,
        easyPercent: smartConfig.easyPercent,
        mediumPercent: smartConfig.mediumPercent,
        hardPercent: smartConfig.hardPercent,
      },
    });
    setGeneratedQuestions(result.questions);
    setValidation(result.validation);
    setGenerating(false);
  };

  const handleCreate = async () => {
    setSaving(true);
    const finalQids = selectionMode === 'smart' ? generatedQuestions.map((q) => q.question_id) : selectedQuestionIds;
    const selectedSub = assignedSubjects.find((s) => s.subject_id === Number(form.subject_id));
    const totalMarks = selectionMode === 'smart' ? smartConfig.totalMarks : allSubjectQuestions.filter((q) => selectedQuestionIds.includes(q.question_id)).reduce((s, q) => s + q.marks, 0);
    const examData = {
      exam_code: form.exam_code || `${selectedSub?.subject_code}-${Date.now()}`,
      subject_id: Number(form.subject_id),
      teacher_id: teacher.teacher_id,
      semester_id: Number(form.semester_id),
      exam_type: form.exam_type,
      duration: schedule.start_time && schedule.end_time ? Math.round((new Date(`2000-01-01T${schedule.end_time}`) - new Date(`2000-01-01T${schedule.start_time}`)) / 60000) : 90,
      total_marks: totalMarks,
      total_questions_to_display: finalQids.length,
    };
    await teacherService.createExam(examData, finalQids, schedule.exam_date ? schedule : null);
    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate('/teacher/exams'), 1800);
  };

  const canNextStep1 = form.subject_id && form.semester_id && form.exam_type;
  const canNextStep2 = selectionMode === 'smart' ? generatedQuestions.length > 0 : selectedQuestionIds.length > 0;
  const canCreate = canNextStep2 && schedule.exam_date && schedule.start_time && schedule.end_time;

  const theoryPercent = 100 - smartConfig.mcqPercent;

  if (loading) return <div className="loading-state"><div className="spinner" /></div>;

  if (saved) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, gap: 16 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle size={32} color="var(--success)" />
      </div>
      <h2>Examination Created!</h2>
      <p style={{ color: 'var(--text-muted)' }}>Redirecting to your exams list...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Wizard Steps */}
      <div className="wizard-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`wizard-step ${i < step ? 'completed' : i === step ? 'active' : ''}`}>
            <div className="step-circle">
              {i < step ? <Check size={16} /> : i + 1}
            </div>
            <span className="step-label">{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 0 && (
        <div className="card">
          <div className="card-header"><span className="card-title">Step 1 — Basic Information</span></div>
          <div className="card-body">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label required">Exam Name / Title</label>
                <input className="form-input" placeholder="e.g. DBMS Mid Semester Examination" value={form.exam_name} onChange={(e) => setForm({ ...form, exam_name: e.target.value })} id="exam-name-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Exam Code</label>
                <input className="form-input" placeholder="Auto-generated if blank" value={form.exam_code} onChange={(e) => setForm({ ...form, exam_code: e.target.value })} id="exam-code-input" />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label required">Subject</label>
                <select className="form-select" value={form.subject_id} onChange={(e) => { setForm({ ...form, subject_id: e.target.value }); loadQuestionsForSubject(e.target.value); }} id="exam-subject-select">
                  <option value="">Select Subject</option>
                  {assignedSubjects.map((s) => <option key={s.subject_id} value={s.subject_id}>{s.subject_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Semester</label>
                <select className="form-select" value={form.semester_id} onChange={(e) => setForm({ ...form, semester_id: e.target.value })} id="exam-sem-select">
                  <option value="">Select Semester</option>
                  {semesters.map((s) => <option key={s.semester_id} value={s.semester_id}>Sem {s.semester_number} ({s.term_type})</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label required">Exam Type</label>
              <select className="form-select" value={form.exam_type} onChange={(e) => setForm({ ...form, exam_type: e.target.value })} id="exam-type-select">
                {['MID SEMESTER', 'END SEMESTER', 'UNIT TEST', 'ASSIGNMENT', 'QUIZ'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" disabled={!canNextStep1} onClick={() => setStep(1)} id="next-step1-btn">
              Next: Select Questions <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Question Selection */}
      {step === 1 && (
        <div>
          <div className="tabs">
            <button className={`tab-btn ${selectionMode === 'smart' ? 'active' : ''}`} onClick={() => setSelectionMode('smart')} id="smart-mode-tab">
              <Zap size={15} /> Smart Selection
            </button>
            <button className={`tab-btn ${selectionMode === 'manual' ? 'active' : ''}`} onClick={() => setSelectionMode('manual')} id="manual-mode-tab">
              <List size={15} /> Manual Selection
            </button>
          </div>

          {selectionMode === 'smart' ? (
            <div className="grid-2">
              <div className="card">
                <div className="smart-panel-header">
                  <Zap size={18} color="var(--primary)" />
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Smart Configuration</span>
                </div>
                <div className="card-body">
                  <div className="grid-2" style={{ marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label required">Total Questions</label>
                      <input className="form-input" type="number" min={1} max={50} value={smartConfig.totalQuestions} onChange={(e) => setSmartConfig({ ...smartConfig, totalQuestions: Number(e.target.value) })} id="smart-total-q" />
                    </div>
                    <div className="form-group">
                      <label className="form-label required">Total Marks</label>
                      <input className="form-input" type="number" min={1} value={smartConfig.totalMarks} onChange={(e) => setSmartConfig({ ...smartConfig, totalMarks: Number(e.target.value) })} id="smart-total-marks" />
                    </div>
                  </div>

                  <div className="distribution-slider">
                    <div className="slider-row">
                      <label>
                        <span>MCQ Questions</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{smartConfig.mcqPercent}%</span>
                      </label>
                      <input type="range" min={0} max={100} value={smartConfig.mcqPercent} onChange={(e) => setSmartConfig({ ...smartConfig, mcqPercent: Number(e.target.value) })} id="smart-mcq-slider" />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <span>MCQ: {smartConfig.mcqPercent}%</span>
                        <span>Theory: {theoryPercent}%</span>
                      </div>
                    </div>
                    <div className="slider-row">
                      <label><span>Easy</span><span style={{ color: 'var(--success)', fontWeight: 700 }}>{smartConfig.easyPercent}%</span></label>
                      <input type="range" min={0} max={100} value={smartConfig.easyPercent} onChange={(e) => setSmartConfig({ ...smartConfig, easyPercent: Number(e.target.value) })} id="smart-easy-slider" />
                    </div>
                    <div className="slider-row">
                      <label><span>Medium</span><span style={{ color: 'var(--warning)', fontWeight: 700 }}>{smartConfig.mediumPercent}%</span></label>
                      <input type="range" min={0} max={100} value={smartConfig.mediumPercent} onChange={(e) => setSmartConfig({ ...smartConfig, mediumPercent: Number(e.target.value) })} id="smart-medium-slider" />
                    </div>
                    <div className="slider-row">
                      <label><span>Hard</span><span style={{ color: 'var(--danger)', fontWeight: 700 }}>{smartConfig.hardPercent}%</span></label>
                      <input type="range" min={0} max={100} value={smartConfig.hardPercent} onChange={(e) => setSmartConfig({ ...smartConfig, hardPercent: Number(e.target.value) })} id="smart-hard-slider" />
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={handleGenerate} disabled={generating || !form.subject_id} id="generate-q-btn">
                    {generating ? <><Loader size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> Generating...</> : <><Shuffle size={16} /> Generate Question Set</>}
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-title">Generated Set</span>
                  {generatedQuestions.length > 0 && <span className="badge badge-green">{generatedQuestions.length} questions</span>}
                </div>
                <div className="card-body">
                  {generatedQuestions.length === 0 ? (
                    <div className="empty-state" style={{ padding: '30px 0' }}>
                      <Shuffle size={36} />
                      <h3>No set generated yet</h3>
                      <p>Configure and click Generate</p>
                    </div>
                  ) : (
                    <>
                      {validation && (
                        <div className="validation-checklist" style={{ marginBottom: 14 }}>
                          <div className={`check-item ${validation.questionsOk ? 'ok' : 'err'}`}>
                            {validation.questionsOk ? <Check size={14} /> : <AlertTriangle size={14} />}
                            {validation.questionsOk ? `✓ ${generatedQuestions.length} questions selected` : `⚠ Only ${generatedQuestions.length} of ${smartConfig.totalQuestions} available`}
                          </div>
                          <div className={`check-item ${validation.marksOk ? 'ok' : 'warn'}`}>
                            {validation.marksOk ? <Check size={14} /> : <AlertTriangle size={14} />}
                            {validation.marksOk ? `✓ Total marks = ${validation.marksActual}` : `⚠ Marks: ${validation.marksActual} (target: ${smartConfig.totalMarks})`}
                          </div>
                          <div className="check-item ok"><Check size={14} />Easy: {validation.easyCount} | Medium: {validation.mediumCount} | Hard: {validation.hardCount}</div>
                          <div className="check-item ok"><Check size={14} />MCQ: {validation.mcqCount} | Theory: {validation.theoryCount}</div>
                        </div>
                      )}
                      <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                        {generatedQuestions.map((q, i) => (
                          <div key={q.question_id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, minWidth: 22 }}>Q{i + 1}</span>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-primary)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>{q.question_text}</p>
                              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                                <span className={`badge ${q.question_type === 'MCQ' ? 'badge-blue' : 'badge-purple'}`} style={{ fontSize: '0.65rem' }}>{q.question_type}</span>
                                <span className={`badge diff-${q.difficulty.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>{q.difficulty}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{q.marks}m</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Manual Selection */
            <div className="card">
              <div className="card-header">
                <span className="card-title">Select Questions Manually</span>
                <span className="badge badge-purple">{selectedQuestionIds.length} selected</span>
              </div>
              <div className="card-body">
                {allSubjectQuestions.length === 0 ? (
                  <div className="empty-state"><List size={36} /><h3>No questions for selected subject</h3></div>
                ) : (
                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {allSubjectQuestions.map((q) => (
                      <div key={q.question_id}
                        onClick={() => setSelectedQuestionIds((prev) => prev.includes(q.question_id) ? prev.filter((id) => id !== q.question_id) : [...prev, q.question_id])}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                          borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                          border: `1.5px solid ${selectedQuestionIds.includes(q.question_id) ? 'var(--primary)' : 'var(--border)'}`,
                          background: selectedQuestionIds.includes(q.question_id) ? 'var(--primary-pale)' : 'white',
                          transition: 'all 0.15s',
                        }}
                      >
                        <input type="checkbox" checked={selectedQuestionIds.includes(q.question_id)} readOnly style={{ accentColor: 'var(--primary)', marginTop: 2 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{q.question_text}</p>
                          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                            <span className={`badge ${q.question_type === 'MCQ' ? 'badge-blue' : 'badge-purple'}`} style={{ fontSize: '0.68rem' }}>{q.question_type}</span>
                            <span className={`badge diff-${q.difficulty.toLowerCase()}`} style={{ fontSize: '0.68rem' }}>{q.difficulty}</span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{q.marks} marks</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)} id="back-step2-btn"><ChevronLeft size={16} /> Back</button>
            <button className="btn btn-primary" disabled={!canNextStep2} onClick={() => setStep(2)} id="next-step2-btn">Next: Schedule <ChevronRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 2 && (
        <div className="card">
          <div className="card-header"><span className="card-title">Step 3 — Exam Schedule</span></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label required">Exam Date</label>
              <input className="form-input" type="date" value={schedule.exam_date} onChange={(e) => setSchedule({ ...schedule, exam_date: e.target.value })} id="schedule-date-input" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label required">Start Time</label>
                <input className="form-input" type="time" value={schedule.start_time} onChange={(e) => setSchedule({ ...schedule, start_time: e.target.value })} id="schedule-start-input" />
              </div>
              <div className="form-group">
                <label className="form-label required">End Time</label>
                <input className="form-input" type="time" value={schedule.end_time} onChange={(e) => setSchedule({ ...schedule, end_time: e.target.value })} id="schedule-end-input" />
              </div>
            </div>
            {schedule.start_time && schedule.end_time && (
              <div className="alert alert-info">
                Duration: {Math.round((new Date(`2000-01-01T${schedule.end_time}`) - new Date(`2000-01-01T${schedule.start_time}`)) / 60000)} minutes
              </div>
            )}
          </div>
          <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)} id="back-step3-btn"><ChevronLeft size={16} /> Back</button>
            <button className="btn btn-primary" disabled={!schedule.exam_date || !schedule.start_time || !schedule.end_time} onClick={() => setStep(3)} id="next-step3-btn">Next: Review <ChevronRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 3 && (
        <div className="card">
          <div className="card-header"><span className="card-title">Step 4 — Review & Confirm</span></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Subject', value: assignedSubjects.find((s) => s.subject_id === Number(form.subject_id))?.subject_name },
                { label: 'Exam Type', value: form.exam_type },
                { label: 'Exam Code', value: form.exam_code || 'Auto-generated' },
                { label: 'Semester', value: `Semester ${semesters.find((s) => s.semester_id === Number(form.semester_id))?.semester_number}` },
                { label: 'Questions', value: selectionMode === 'smart' ? generatedQuestions.length : selectedQuestionIds.length },
                { label: 'Total Marks', value: selectionMode === 'smart' ? smartConfig.totalMarks : allSubjectQuestions.filter((q) => selectedQuestionIds.includes(q.question_id)).reduce((s, q) => s + q.marks, 0) },
                { label: 'Exam Date', value: schedule.exam_date },
                { label: 'Duration', value: `${Math.round((new Date(`2000-01-01T${schedule.end_time}`) - new Date(`2000-01-01T${schedule.start_time}`)) / 60000)} minutes` },
                { label: 'Start Time', value: schedule.start_time },
                { label: 'End Time', value: schedule.end_time },
              ].map((item) => (
                <div key={item.label} style={{ padding: '12px 16px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.value || '—'}</div>
                </div>
              ))}
            </div>
            <div className="alert alert-success" style={{ marginTop: 20 }}>
              <CheckCircle size={18} />
              <div>Ready to create! This examination will be visible to students after you schedule and publish it.</div>
            </div>
          </div>
          <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-ghost" onClick={() => setStep(2)} id="back-step4-btn"><ChevronLeft size={16} /> Back</button>
            <button className="btn btn-primary btn-lg" onClick={handleCreate} disabled={saving} id="create-exam-btn">
              {saving ? <><Loader size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> Creating...</> : <><Check size={16} /> Create Examination</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
