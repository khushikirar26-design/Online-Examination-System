import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, ChevronLeft, ChevronRight, AlertTriangle, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';

export default function ExamInterfacePage() {
  const { scheduleId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [examInfo, setExamInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [studentExam, setStudentExam] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: { selected_option_id: X, written_answer: Y, status: 'ANSWERED'|'MARKED' } }
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const timerRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      // Fetch schedule info to verify
      const exams = await studentService.getAvailableExams(user.user_id);
      const schedule = exams.find(e => e.schedule_id === Number(scheduleId));
      
      if (!schedule) {
        alert("Examination not found or you don't have access.");
        navigate('/student');
        return;
      }
      
      setExamInfo(schedule);
      
      // Start Exam session
      const student = await studentService.getStudentProfile(user.user_id);
      const session = await studentService.startExam(student.student_id, schedule.schedule_id);
      setStudentExam(session);
      
      // Fetch randomized questions
      const qs = await studentService.getExamQuestions(schedule.exam.exam_id);
      setQuestions(qs);
      
      // Calculate remaining time
      const end = new Date(`${schedule.exam_date}T${schedule.end_time}`).getTime();
      const now = new Date().getTime();
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      
      // Enforce duration limit if time between start and end > duration
      const durationSeconds = schedule.exam.duration * 60;
      setTimeLeft(Math.min(remaining, durationSeconds));
      
      setLoading(false);
    };
    
    if (user) init();
  }, [user, scheduleId, navigate]);

  useEffect(() => {
    if (loading || timeLeft <= 0) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinalSubmit(); // Auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, [loading, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qId, optId) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: { ...prev[qId], selected_option_id: optId, status: prev[qId]?.status === 'MARKED' ? 'MARKED' : 'ANSWERED' }
    }));
  };

  const handleTextAnswer = (qId, text) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: { ...prev[qId], written_answer: text, status: text.trim() ? (prev[qId]?.status === 'MARKED' ? 'MARKED' : 'ANSWERED') : undefined }
    }));
  };

  const handleMarkReview = (qId) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: { ...prev[qId], status: prev[qId]?.status === 'MARKED' ? (prev[qId]?.selected_option_id || prev[qId]?.written_answer ? 'ANSWERED' : undefined) : 'MARKED' }
    }));
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    
    // Format answers array for service
    const submission = questions.map(q => ({
      question_id: q.question_id,
      selected_option_id: answers[q.question_id]?.selected_option_id,
      written_answer: answers[q.question_id]?.written_answer
    }));
    
    await studentService.submitExam(studentExam.student_exam_id, submission);
    
    // Cleanup
    if (timerRef.current) clearInterval(timerRef.current);
    
    navigate('/student/results');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="spinner" style={{ width: 48, height: 48, borderWidth: 4 }} />
      <h3 style={{ marginTop: 20 }}>Setting up your examination...</h3>
      <p style={{ color: 'var(--text-muted)' }}>Please do not refresh the page.</p>
    </div>
  );

  const currentQ = questions[currentQIndex];
  const ansState = answers[currentQ.question_id] || {};

  const answeredCount = Object.values(answers).filter(a => a.status === 'ANSWERED').length;
  const markedCount = Object.values(answers).filter(a => a.status === 'MARKED').length;
  const unansweredCount = questions.length - answeredCount - markedCount;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Exam Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, background: 'var(--info)', color: 'white', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{examInfo.subject?.subject_name}</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{examInfo.exam?.exam_code} • {examInfo.exam?.exam_type}</p>
          </div>
        </div>
        
        <div className={`exam-timer ${timeLeft < 300 ? 'danger' : timeLeft < 600 ? 'warning' : ''}`}>
          <Clock size={20} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
            <span className="timer-value">{formatTime(timeLeft)}</span>
            <span className="timer-label">Time Remaining</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div className="exam-layout">
          {/* Main Question Area */}
          <div className="card" style={{ minHeight: 600, display: 'flex', flexDirection: 'column' }}>
            <div className="card-header" style={{ background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="question-number-badge" style={{ margin: 0 }}>
                Question {currentQIndex + 1} of {questions.length}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-gray">{currentQ.marks} Mark{currentQ.marks > 1 ? 's' : ''}</span>
                <span className="badge badge-purple">{currentQ.question_type}</span>
              </div>
            </div>
            <div className="card-body" style={{ flex: 1, padding: 32 }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 32 }}>
                {currentQ.question_text}
              </div>

              {currentQ.question_type === 'MCQ' ? (
                <div>
                  {currentQ.options?.map((opt, i) => (
                    <div 
                      key={opt.option_id}
                      className={`question-option ${ansState.selected_option_id === opt.option_id ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(currentQ.question_id, opt.option_id)}
                    >
                      <div className="option-indicator" />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                        {opt.option_text}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <textarea 
                    className="form-textarea" 
                    style={{ minHeight: 250, fontSize: '1rem', padding: 20 }}
                    placeholder="Type your answer here..."
                    value={ansState.written_answer || ''}
                    onChange={(e) => handleTextAnswer(currentQ.question_id, e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', background: 'white' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
              >
                <ChevronLeft size={18} /> Previous
              </button>
              
              <button 
                className={`btn ${ansState.status === 'MARKED' ? 'btn-warning' : 'btn-ghost'}`}
                style={{ border: ansState.status === 'MARKED' ? 'none' : '1px solid var(--border)' }}
                onClick={() => handleMarkReview(currentQ.question_id)}
              >
                <AlertTriangle size={16} /> {ansState.status === 'MARKED' ? 'Unmark Review' : 'Mark for Review'}
              </button>
              
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if (currentQIndex < questions.length - 1) setCurrentQIndex(prev => prev + 1);
                  else setShowSubmitConfirm(true);
                }}
              >
                {currentQIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Navigator */}
          <div className="exam-sidebar-panel">
            <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>Question Navigator</h3>
            
            <div className="question-navigator" style={{ marginBottom: 24 }}>
              {questions.map((q, i) => {
                const status = answers[q.question_id]?.status;
                let btnClass = 'q-nav-btn';
                if (i === currentQIndex) btnClass += ' current';
                else if (status === 'ANSWERED') btnClass += ' answered';
                else if (status === 'MARKED') btnClass += ' marked';
                
                return (
                  <button 
                    key={q.question_id} 
                    className={btnClass}
                    onClick={() => setCurrentQIndex(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="divider" />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--success)' }} />
                Answered ({answeredCount})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--warning)' }} />
                Marked for Review ({markedCount})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid var(--text-muted)' }} />
                Not Answered ({unansweredCount})
              </div>
            </div>
            
            <button 
              className="btn btn-success" 
              style={{ width: '100%', justifyContent: 'center', marginTop: 32 }}
              onClick={() => setShowSubmitConfirm(true)}
            >
              <Send size={16} /> Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3 className="modal-title">Submit Examination?</h3>
              <button className="modal-close" onClick={() => !submitting && setShowSubmitConfirm(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <ShieldCheck size={56} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                <h2 style={{ fontSize: '1.5rem' }}>Are you sure?</h2>
                <p style={{ color: 'var(--text-muted)' }}>You cannot change your answers after submission.</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
                <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '12px 8px', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{answeredCount}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>Answered</div>
                </div>
                <div style={{ background: 'var(--warning-light)', color: 'var(--warning)', padding: '12px 8px', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{markedCount}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>Marked</div>
                </div>
                <div style={{ background: 'var(--bg)', color: 'var(--text-muted)', padding: '12px 8px', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{unansweredCount}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }}>Unanswered</div>
                </div>
              </div>
              
              {unansweredCount > 0 && (
                <div className="alert alert-warning">
                  <AlertTriangle size={18} />
                  <div>You have <strong>{unansweredCount} unanswered</strong> questions. It is recommended to attempt all questions.</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowSubmitConfirm(false)} disabled={submitting}>Resume Exam</button>
              <button className="btn btn-success" onClick={handleFinalSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Yes, Submit Exam'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
