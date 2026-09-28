// ============================================================
// STUDENT SERVICE  — mocked
// ============================================================
import {
  students, users, courses, semesters,
  examSchedules, exams, subjects, questions, options,
  examQuestions, studentExams as allStudentExams,
  results as allResults, scorecards, studentAnalytics,
} from '../data/mockData';

let _studentExams = [...allStudentExams];
let _results = [...allResults];
let _scorecards = [...scorecards];
let _nextStudentExamId = 100;
let _nextResultId = 100;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const studentService = {
  // ── Profile
  getStudentProfile: async (userId) => {
    await delay();
    const student = students.find((s) => s.user_id === userId);
    const user = users.find((u) => u.user_id === userId);
    if (!student) return null;
    const course = courses.find((c) => c.course_id === student.course_id);
    const semester = semesters.find((s) => s.semester_id === student.current_semester_id);
    return { ...student, ...user, course, semester };
  },

  // ── Available Exams (scheduled, not yet attempted)
  getAvailableExams: async (userId) => {
    await delay();
    const student = students.find((s) => s.user_id === userId);
    if (!student) return [];
    const attempted = _studentExams
      .filter((se) => se.student_id === student.student_id)
      .map((se) => se.schedule_id);
    return examSchedules
      .filter((sch) => !attempted.includes(sch.schedule_id))
      .map((sch) => {
        const exam = exams.find((e) => e.exam_id === sch.exam_id);
        const subject = subjects.find((s) => s.subject_id === exam?.subject_id);
        return { ...sch, exam, subject };
      })
      .filter((s) => s.exam && s.subject);
  },

  // ── Exam questions (randomized order)
  getExamQuestions: async (examId) => {
    await delay(400);
    const eq = examQuestions.filter((eq) => eq.exam_id === examId);
    const qs = eq.map((eq) => {
      const q = questions.find((q) => q.question_id === eq.question_id);
      const opts = options.filter((o) => o.question_id === eq.question_id);
      // Randomize option order for MCQ
      const shuffledOpts = [...opts].sort(() => Math.random() - 0.5);
      return { ...q, options: shuffledOpts, sequence_no: eq.sequence_no };
    });
    // Randomize question order
    return qs.sort(() => Math.random() - 0.5).map((q, i) => ({ ...q, display_order: i + 1 }));
  },

  // ── Start exam (create student_exam record)
  startExam: async (studentId, scheduleId) => {
    await delay();
    const existing = _studentExams.find(
      (se) => se.student_id === studentId && se.schedule_id === scheduleId
    );
    if (existing) return existing;
    const studentExam = {
      student_exam_id: _nextStudentExamId++,
      student_id: studentId,
      schedule_id: scheduleId,
      attempt_number: 1,
      attempt_status: 'IN_PROGRESS',
      attempt_start: new Date().toISOString(),
      attempt_end: null,
    };
    _studentExams.push(studentExam);
    return studentExam;
  },

  // ── Submit exam (evaluate MCQs, create result)
  submitExam: async (studentExamId, answers) => {
    await delay(800);
    // Update studentExam status
    const seIdx = _studentExams.findIndex((se) => se.student_exam_id === studentExamId);
    if (seIdx > -1) {
      _studentExams[seIdx].attempt_status = 'COMPLETED';
      _studentExams[seIdx].attempt_end = new Date().toISOString();
    }
    const se = _studentExams[seIdx];
    const schedule = examSchedules.find((s) => s.schedule_id === se.schedule_id);
    const exam = exams.find((e) => e.exam_id === schedule?.exam_id);

    // Auto-evaluate MCQs
    let obtainedMarks = 0;
    const newScorecards = [];
    answers.forEach((ans, idx) => {
      const q = questions.find((q) => q.question_id === ans.question_id);
      let marksObtained = 0;
      if (q?.question_type === 'MCQ' && ans.selected_option_id) {
        const correctOpt = options.find((o) => o.question_id === q.question_id && o.is_correct);
        if (correctOpt && correctOpt.option_id === ans.selected_option_id) {
          marksObtained = q.marks;
        }
      }
      obtainedMarks += marksObtained;
      newScorecards.push({
        scorecard_id: Date.now() + idx,
        result_id: _nextResultId,
        question_id: ans.question_id,
        question_order: idx + 1,
        selected_option_id: ans.selected_option_id || null,
        written_answer: ans.written_answer || null,
        marks_obtained: marksObtained,
      });
    });

    const totalMarks = exam?.total_marks || 100;
    const percentage = (obtainedMarks / totalMarks) * 100;
    const result = {
      result_id: _nextResultId++,
      student_exam_id: studentExamId,
      obtained_marks: obtainedMarks,
      percentage: parseFloat(percentage.toFixed(2)),
      result_status: percentage >= 40 ? 'PASS' : 'FAIL',
      is_published: false,
    };
    _results.push(result);
    _scorecards.push(...newScorecards);
    return result;
  },

  // ── Results
  getStudentResults: async (userId) => {
    await delay();
    const student = students.find((s) => s.user_id === userId);
    if (!student) return [];
    const myExams = _studentExams.filter((se) => se.student_id === student.student_id);
    return myExams
      .map((se) => {
        const result = _results.find((r) => r.student_exam_id === se.student_exam_id);
        if (!result || !result.is_published) return null;
        const schedule = examSchedules.find((s) => s.schedule_id === se.schedule_id);
        const exam = exams.find((e) => e.exam_id === schedule?.exam_id);
        const subject = subjects.find((s) => s.subject_id === exam?.subject_id);
        return { ...result, ...se, exam, subject, schedule };
      })
      .filter(Boolean);
  },

  // ── Scorecard
  getScorecard: async (resultId) => {
    await delay();
    const cards = _scorecards.filter((sc) => sc.result_id === resultId);
    return cards.map((sc) => {
      const q = questions.find((q) => q.question_id === sc.question_id);
      const selectedOpt = options.find((o) => o.option_id === sc.selected_option_id);
      const correctOpt = options.find((o) => o.question_id === sc.question_id && o.is_correct);
      return { ...sc, question: q, selected_option: selectedOpt, correct_option: correctOpt };
    });
  },

  // ── Analytics
  getPerformanceAnalytics: async (userId) => {
    await delay(500);
    return studentAnalytics; // pre-computed mock analytics
  },

  // ── Dashboard stats
  getDashboardStats: async (userId) => {
    await delay();
    const student = students.find((s) => s.user_id === userId);
    if (!student) return {};
    const attempted = _studentExams.filter((se) => se.student_id === student.student_id);
    const completed = attempted.filter((se) => se.attempt_status === 'COMPLETED');
    const publishedResults = _results.filter(
      (r) => completed.some((se) => se.student_exam_id === r.student_exam_id) && r.is_published
    );
    const avgScore = publishedResults.length
      ? publishedResults.reduce((s, r) => s + r.percentage, 0) / publishedResults.length
      : 0;
    const upcoming = (await studentService.getAvailableExams(userId)).length;
    return {
      upcoming_exams: upcoming,
      completed_exams: completed.length,
      average_score: parseFloat(avgScore.toFixed(1)),
      current_semester: semesters.find((s) => s.semester_id === student.current_semester_id)?.semester_number || 1,
    };
  },
};
