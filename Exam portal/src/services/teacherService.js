// ============================================================
// TEACHER SERVICE  — mocked
// ============================================================
import {
  teachers, subjects, teachingAssignments,
  questions as allQuestions, options,
  exams as allExams, examQuestions, examSchedules,
  results, scorecards, studentExams, students, users,
  pendingEvaluations,
} from '../data/mockData';

let _questions = [...allQuestions];
let _exams = [...allExams];
let _examQuestions = [...examQuestions];
let _examSchedules = [...examSchedules];
let _results = [...results];
let _pending = [...pendingEvaluations];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const teacherService = {
  // ── Profile
  getTeacherProfile: async (userId) => {
    await delay();
    const teacher = teachers.find((t) => t.user_id === userId);
    const user = users.find((u) => u.user_id === userId);
    if (!teacher) return null;
    return { ...teacher, ...user };
  },

  // ── Assigned Subjects
  getAssignedSubjects: async (teacherId) => {
    await delay();
    const assignments = teachingAssignments.filter((a) => a.teacher_id === teacherId);
    return assignments.map((a) => subjects.find((s) => s.subject_id === a.subject_id)).filter(Boolean);
  },

  // ── Question Bank
  getQuestions: async (teacherId) => {
    await delay();
    const assignedSubjectIds = teachingAssignments
      .filter((a) => a.teacher_id === teacherId)
      .map((a) => a.subject_id);
    return _questions.filter((q) => assignedSubjectIds.includes(q.subject_id));
  },

  getQuestionsBySubject: async (subjectId) => {
    await delay();
    return _questions.filter((q) => q.subject_id === subjectId);
  },

  getOptionsForQuestion: async (questionId) => {
    await delay();
    return options.filter((o) => o.question_id === questionId);
  },

  addQuestion: async (data) => {
    await delay();
    const q = { question_id: Date.now(), ...data };
    _questions.push(q);
    return q;
  },

  updateQuestion: async (id, data) => {
    await delay();
    _questions = _questions.map((q) => q.question_id === id ? { ...q, ...data } : q);
    return _questions.find((q) => q.question_id === id);
  },

  deleteQuestion: async (id) => {
    await delay();
    _questions = _questions.filter((q) => q.question_id !== id);
  },

  // ── Smart Question Selection
  generateQuestionSet: async ({ subjectId, totalQuestions, totalMarks, distribution }) => {
    await delay(800);
    const pool = _questions.filter((q) => q.subject_id === subjectId);
    const selected = [];

    // Try to satisfy type + difficulty distribution
    const { mcqPercent = 70, theoryPercent = 30, easyPercent = 30, mediumPercent = 50, hardPercent = 20 } = distribution;

    const mcqCount = Math.round((mcqPercent / 100) * totalQuestions);
    const theoryCount = totalQuestions - mcqCount;
    const easyCount = Math.round((easyPercent / 100) * totalQuestions);
    const mediumCount = Math.round((mediumPercent / 100) * totalQuestions);
    const hardCount = totalQuestions - easyCount - mediumCount;

    const pick = (type, difficulty, count) => {
      const available = pool.filter(
        (q) =>
          (!type || q.question_type === type) &&
          (!difficulty || q.difficulty === difficulty) &&
          !selected.some((s) => s.question_id === q.question_id)
      );
      const picked = available.slice(0, count);
      selected.push(...picked);
      return picked.length;
    };

    const easyMcq = Math.min(Math.round(easyCount * (mcqPercent / 100)), mcqCount);
    const mediumMcq = Math.min(Math.round(mediumCount * (mcqPercent / 100)), mcqCount - easyMcq);
    const hardMcq = mcqCount - easyMcq - mediumMcq;

    pick('MCQ', 'EASY', easyMcq);
    pick('MCQ', 'MEDIUM', mediumMcq);
    pick('MCQ', 'HARD', hardMcq);
    pick('THEORY', 'EASY', Math.round(easyCount * (theoryPercent / 100)));
    pick('THEORY', 'MEDIUM', Math.round(mediumCount * (theoryPercent / 100)));
    pick('THEORY', 'HARD', Math.max(0, theoryCount - selected.filter(q => q.question_type === 'THEORY').length));

    // Fill remaining slots
    const remaining = pool.filter((q) => !selected.some((s) => s.question_id === q.question_id));
    while (selected.length < totalQuestions && remaining.length > 0) {
      selected.push(remaining.shift());
    }

    const actual = selected.slice(0, totalQuestions);
    const actualMarks = actual.reduce((sum, q) => sum + q.marks, 0);
    const validation = {
      questionsOk: actual.length === totalQuestions,
      marksOk: actualMarks === totalMarks,
      marksActual: actualMarks,
      easyCount: actual.filter((q) => q.difficulty === 'EASY').length,
      mediumCount: actual.filter((q) => q.difficulty === 'MEDIUM').length,
      hardCount: actual.filter((q) => q.difficulty === 'HARD').length,
      mcqCount: actual.filter((q) => q.question_type === 'MCQ').length,
      theoryCount: actual.filter((q) => q.question_type === 'THEORY').length,
    };
    return { questions: actual, validation };
  },

  // ── Exams
  getExams: async (teacherId) => {
    await delay();
    const teacherExams = _exams.filter((e) => e.teacher_id === teacherId);
    return teacherExams.map((e) => {
      const schedule = _examSchedules.find((s) => s.exam_id === e.exam_id);
      const subject = subjects.find((s) => s.subject_id === e.subject_id);
      return { ...e, schedule, subject };
    });
  },

  createExam: async (examData, questionIds, scheduleData) => {
    await delay(500);
    const exam = { exam_id: Date.now(), ...examData };
    _exams.push(exam);
    questionIds.forEach((qid, idx) => {
      _examQuestions.push({ exam_id: exam.exam_id, question_id: qid, sequence_no: idx + 1 });
    });
    if (scheduleData) {
      const schedule = { schedule_id: Date.now() + 1, exam_id: exam.exam_id, ...scheduleData };
      _examSchedules.push(schedule);
    }
    return exam;
  },

  updateExamSchedule: async (scheduleId, data) => {
    await delay();
    const idx = _examSchedules.findIndex((s) => s.schedule_id === scheduleId);
    if (idx > -1) _examSchedules[idx] = { ..._examSchedules[idx], ...data };
    return _examSchedules[idx];
  },

  // ── Results & Evaluation
  getPendingEvaluations: async (teacherId) => {
    await delay();
    const mySubjects = teachingAssignments.filter(a => a.teacher_id === teacherId).map(a => a.subject_id);
    return _pending.filter(p => {
      const q = _questions.find(q => q.question_id === p.question_id);
      return q && mySubjects.includes(q.subject_id);
    });
  },

  evaluateAnswer: async (studentExamId, questionId, marks) => {
    await delay();
    const idx = _pending.findIndex(
      (p) => p.student_exam_id === studentExamId && p.question_id === questionId
    );
    if (idx > -1) {
      _pending[idx] = { ..._pending[idx], marks_awarded: marks, is_evaluated: true };
    }
    return _pending[idx];
  },

  getExamResults: async (examId) => {
    await delay();
    return _results.filter((r) => {
      const se = studentExams.find((se) => se.student_exam_id === r.student_exam_id);
      return se && _examSchedules.find((s) => s.schedule_id === se.schedule_id)?.exam_id === examId;
    });
  },

  publishResult: async (resultId) => {
    await delay();
    _results = _results.map((r) => r.result_id === resultId ? { ...r, is_published: true } : r);
    return _results.find((r) => r.result_id === resultId);
  },

  // ── Dashboard stats
  getDashboardStats: async (teacherId) => {
    await delay();
    const assignedSubjects = teachingAssignments.filter((a) => a.teacher_id === teacherId);
    const subjectIds = assignedSubjects.map((a) => a.subject_id);
    const qCount = _questions.filter((q) => subjectIds.includes(q.subject_id)).length;
    const myExams = _exams.filter((e) => e.teacher_id === teacherId);
    const pending = _pending.filter((p) => !p.is_evaluated).length;
    return {
      subjects: assignedSubjects.length,
      questionBank: qCount,
      activeExams: myExams.length,
      pendingEvaluations: pending,
    };
  },
};
