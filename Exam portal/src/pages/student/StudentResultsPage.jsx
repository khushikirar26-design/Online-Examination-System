import React, { useEffect, useState } from 'react';
import { Award, Eye, FileText, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { studentService } from '../../services/studentService';

export default function StudentResultsPage() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedResult, setSelectedResult] = useState(null);
  const [scorecard, setScorecard] = useState([]);
  const [scorecardLoading, setScorecardLoading] = useState(false);

  useEffect(() => {
    if (user) {
      studentService.getStudentResults(user.user_id).then(r => {
        // Sort by most recent
        setResults(r.sort((a, b) => new Date(b.attempt_end) - new Date(a.attempt_end)));
        setLoading(false);
      });
    }
  }, [user]);

  const handleViewScorecard = async (result) => {
    setScorecardLoading(true);
    setSelectedResult(result);
    const details = await studentService.getScorecard(result.result_id);
    setScorecard(details);
    setScorecardLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>My Results</h1>
          <p>View your performance in published examinations.</p>
        </div>
      </div>

      <div className="table-container">
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : results.length === 0 ? (
            <div className="empty-state">
              <Award size={48} />
              <h3>No results available</h3>
              <p>Your examination results will appear here once published by the teacher.</p>
            </div>
          ) : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Examination</th>
                    <th>Date Attempted</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.result_id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.subject?.subject_name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.exam?.exam_code}</div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {new Date(r.attempt_end).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>
                          {r.obtained_marks} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ {r.exam?.total_marks}</span>
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 60 }}>
                            <div className={`progress-fill ${r.percentage >= 75 ? 'green' : r.percentage >= 40 ? 'amber' : 'red'}`} style={{ width: `${r.percentage}%` }} />
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{r.percentage}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${r.result_status === 'PASS' ? 'badge-green' : 'badge-red'}`}>{r.result_status}</span>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleViewScorecard(r)}>
                          <Eye size={14} /> View Scorecard
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {/* Scorecard Modal */}
      {selectedResult && (
        <div className="modal-overlay" onClick={() => setSelectedResult(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)' }}>
            <div className="modal-header" style={{ background: 'white' }}>
              <div>
                <h3 className="modal-title">Scorecard: {selectedResult.subject?.subject_name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{selectedResult.exam?.exam_code}</p>
              </div>
              <button className="modal-close" onClick={() => setSelectedResult(null)}><X size={18}/></button>
            </div>
            
            <div className="modal-body" style={{ padding: 0 }}>
              <div style={{ background: 'white', padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Marks</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{selectedResult.obtained_marks} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {selectedResult.exam?.total_marks}</span></div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Percentage</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: selectedResult.percentage >= 40 ? 'var(--success)' : 'var(--danger)' }}>{selectedResult.percentage}%</div>
                  </div>
                </div>
                <div>
                  <span className={`badge ${selectedResult.result_status === 'PASS' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '1rem', padding: '6px 16px' }}>{selectedResult.result_status}</span>
                </div>
              </div>
              
              <div style={{ padding: 24 }}>
                <h4 style={{ marginBottom: 16, fontSize: '1rem' }}>Question-wise Analysis</h4>
                
                {scorecardLoading ? <div style={{ padding: 40, textAlign: 'center' }}><div className="spinner" style={{ margin: '0 auto' }}/></div>
                  : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {scorecard.map(sc => {
                        const isMCQ = sc.question?.question_type === 'MCQ';
                        const isCorrect = isMCQ && sc.selected_option_id === sc.correct_option?.option_id;
                        let rowClass = 'scorecard-row ';
                        
                        if (isMCQ) {
                          if (!sc.selected_option_id) rowClass += 'unanswered';
                          else if (isCorrect) rowClass += 'correct';
                          else rowClass += 'incorrect';
                        } else {
                          rowClass += 'theory';
                        }
                        
                        return (
                          <div key={sc.scorecard_id} className={rowClass} style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: 12 }}>
                              <div style={{ display: 'flex', gap: 12 }}>
                                <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>Q{sc.question_order}.</span>
                                <div>
                                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: 4 }}>{sc.question?.question_text}</div>
                                  <span className={`badge ${isMCQ ? 'badge-blue' : 'badge-purple'}`} style={{ fontSize: '0.65rem' }}>{sc.question?.question_type}</span>
                                </div>
                              </div>
                              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{sc.marks_obtained} / {sc.question?.marks}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Marks</div>
                              </div>
                            </div>
                            
                            {/* Detailed response display */}
                            <div style={{ paddingLeft: 30 }}>
                              {isMCQ ? (
                                <div style={{ fontSize: '0.85rem' }}>
                                  {!sc.selected_option_id ? (
                                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Not answered</span>
                                  ) : (
                                    <>
                                      <div style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)', marginBottom: 4 }}>
                                        <strong>Your Answer:</strong> {sc.selected_option?.option_text}
                                      </div>
                                      {!isCorrect && (
                                        <div style={{ color: 'var(--success)' }}>
                                          <strong>Correct Answer:</strong> {sc.correct_option?.option_text}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              ) : (
                                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 6, fontSize: '0.85rem', border: '1px solid var(--border)' }}>
                                  <strong>Your Answer:</strong><br/>
                                  <div style={{ whiteSpace: 'pre-wrap', marginTop: 4, color: 'var(--text-secondary)' }}>
                                    {sc.written_answer || <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Not answered</span>}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
