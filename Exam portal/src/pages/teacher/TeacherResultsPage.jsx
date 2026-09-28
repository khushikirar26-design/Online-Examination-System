import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, Eye, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { teacherService } from '../../services/teacherService';
import { teachers, exams as allExams, students, users } from '../../data/mockData';

export default function TeacherResultsPage() {
  const { user } = useAuth();
  const teacher = teachers.find(t => t.user_id === user?.user_id);
  
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (teacher) {
      teacherService.getExams(teacher.teacher_id).then(e => {
        setExams(e);
        if (e.length > 0) setSelectedExamId(String(e[0].exam_id));
        setLoading(false);
      });
    }
  }, [teacher]);

  useEffect(() => {
    if (selectedExamId) {
      setResultsLoading(true);
      teacherService.getExamResults(Number(selectedExamId)).then(r => {
        setResults(r);
        setResultsLoading(false);
      });
    }
  }, [selectedExamId]);

  const handlePublish = async (resultId) => {
    setPublishing(true);
    await teacherService.publishResult(resultId);
    // Reload results
    const updated = await teacherService.getExamResults(Number(selectedExamId));
    setResults(updated);
    setPublishing(false);
  };

  const getStudentInfo = (studentExamId) => {
    const fromMock = results.find(r => r.student_exam_id === studentExamId); // In real app, API returns student details
    // using mock mapping
    const student = students.find(s => s.student_id === (fromMock?.student_exam_id === 1 || fromMock?.student_exam_id === 2 ? 1 : 2));
    const u = users.find(u => u.user_id === student?.user_id);
    return { name: u?.full_name, scholarNo: student?.scholar_no };
  };

  const selectedExam = exams.find(e => e.exam_id === Number(selectedExamId));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Results Management</h1>
          <p>Review student performance and publish results.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="form-label">Select Examination</label>
            <select className="form-select" value={selectedExamId} onChange={e => setSelectedExamId(e.target.value)}>
              {exams.map(e => <option key={e.exam_id} value={e.exam_id}>{e.exam_code} - {e.subject?.subject_name}</option>)}
            </select>
          </div>
          {selectedExam && (
            <div style={{ display: 'flex', gap: 16, alignSelf: 'flex-end', marginBottom: 4 }}>
              <div style={{ background: 'var(--bg)', padding: '8px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL MARKS</div>
                <div style={{ fontWeight: 700 }}>{selectedExam.total_marks}</div>
              </div>
              <button className="btn btn-secondary" onClick={() => setSelectedExamId(selectedExamId)}><RefreshCw size={14} /> Refresh</button>
            </div>
          )}
        </div>
      </div>

      <div className="table-container">
        {loading || resultsLoading ? <div className="loading-state"><div className="spinner" /></div>
          : results.length === 0 ? (
            <div className="empty-state">
              <Award size={48} />
              <h3>No results yet</h3>
              <p>No students have completed this examination.</p>
            </div>
          ) : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Scholar No</th>
                    <th>Marks Obtained</th>
                    <th>Percentage</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => {
                    const student = getStudentInfo(r.student_exam_id);
                    return (
                      <tr key={r.result_id}>
                        <td><span style={{ fontWeight: 600 }}>{student.name}</span></td>
                        <td><code style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{student.scholarNo}</code></td>
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{r.obtained_marks} / {selectedExam?.total_marks}</td>
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
                          {r.is_published ? 
                            <span className="badge badge-blue"><CheckCircle size={10} style={{ marginRight: 2 }}/> Published</span> : 
                            <span className="badge badge-gray">Draft</span>
                          }
                        </td>
                        <td>
                          <div className="table-actions">
                            {!r.is_published && (
                              <button 
                                className="btn btn-success btn-sm" 
                                onClick={() => handlePublish(r.result_id)}
                                disabled={publishing}
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}
