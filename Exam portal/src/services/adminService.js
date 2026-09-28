// ============================================================
// ADMIN SERVICE  — GET /api/*  (mocked)
// ============================================================
import {
  departments, courses, subjects, semesters, academicYears,
  users, students, teachers, teachingAssignments, exams,
  examSchedules, studentExams, results,
} from '../data/mockData';

let _departments = [...departments];
let _courses = [...courses];
let _subjects = [...subjects];
let _semesters = [...semesters];
let _users = [...users];
let _teachers = [...teachers];
let _students = [...students];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const adminService = {
  // ── Departments
  getDepartments: async () => { await delay(); return [..._departments]; },
  addDepartment: async (name) => {
    await delay();
    const dept = { department_id: Date.now(), department_name: name };
    _departments.push(dept);
    return dept;
  },
  updateDepartment: async (id, name) => {
    await delay();
    _departments = _departments.map((d) => d.department_id === id ? { ...d, department_name: name } : d);
    return _departments.find((d) => d.department_id === id);
  },
  deleteDepartment: async (id) => {
    await delay();
    _departments = _departments.filter((d) => d.department_id !== id);
  },

  // ── Courses
  getCourses: async () => { await delay(); return [..._courses]; },
  addCourse: async (data) => {
    await delay();
    const course = { course_id: Date.now(), ...data };
    _courses.push(course);
    return course;
  },
  updateCourse: async (id, data) => {
    await delay();
    _courses = _courses.map((c) => c.course_id === id ? { ...c, ...data } : c);
    return _courses.find((c) => c.course_id === id);
  },
  deleteCourse: async (id) => {
    await delay();
    _courses = _courses.filter((c) => c.course_id !== id);
  },

  // ── Subjects
  getSubjects: async () => { await delay(); return [..._subjects]; },
  addSubject: async (data) => {
    await delay();
    const subject = { subject_id: Date.now(), ...data };
    _subjects.push(subject);
    return subject;
  },
  updateSubject: async (id, data) => {
    await delay();
    _subjects = _subjects.map((s) => s.subject_id === id ? { ...s, ...data } : s);
    return _subjects.find((s) => s.subject_id === id);
  },
  deleteSubject: async (id) => {
    await delay();
    _subjects = _subjects.filter((s) => s.subject_id !== id);
  },

  // ── Semesters
  getSemesters: async () => { await delay(); return [..._semesters]; },
  addSemester: async (data) => {
    await delay();
    const sem = { semester_id: Date.now(), ...data };
    _semesters.push(sem);
    return sem;
  },
  deleteSemester: async (id) => {
    await delay();
    _semesters = _semesters.filter((s) => s.semester_id !== id);
  },

  // ── Academic Years
  getAcademicYears: async () => { await delay(); return [...academicYears]; },

  // ── Users
  getUsers: async () => { await delay(); return _users.map(({ password_hash, ...u }) => u); },
  addUser: async (data) => {
    await delay();
    const user = { user_id: Date.now(), status: 'ACTIVE', ...data };
    _users.push(user);
    const { password_hash, ...safe } = user;
    return safe;
  },
  updateUserStatus: async (id, status) => {
    await delay();
    _users = _users.map((u) => u.user_id === id ? { ...u, status } : u);
    return _users.find((u) => u.user_id === id);
  },
  deleteUser: async (id) => {
    await delay();
    _users = _users.filter((u) => u.user_id !== id);
  },

  // ── Students
  getStudents: async () => { await delay(); return [..._students]; },
  addStudent: async (data) => {
    await delay();
    const student = { student_id: Date.now(), ...data };
    _students.push(student);
    return student;
  },
  deleteStudent: async (id) => {
    await delay();
    _students = _students.filter((s) => s.student_id !== id);
  },

  // ── Teachers
  getTeachers: async () => { await delay(); return [..._teachers]; },
  addTeacher: async (data) => {
    await delay();
    const teacher = { teacher_id: Date.now(), ...data };
    _teachers.push(teacher);
    return teacher;
  },
  deleteTeacher: async (id) => {
    await delay();
    _teachers = _teachers.filter((t) => t.teacher_id !== id);
  },

  // ── Dashboard stats
  getDashboardStats: async () => {
    await delay();
    return {
      students: _students.length,
      teachers: _teachers.length,
      departments: _departments.length,
      courses: _courses.length,
      subjects: _subjects.length,
      active_exams: exams.length,
    };
  },

  // ── Exams list for admin
  getExams: async () => {
    await delay();
    return exams.map((e) => {
      const schedule = examSchedules.find((s) => s.exam_id === e.exam_id);
      const subject = subjects.find((s) => s.subject_id === e.subject_id);
      return { ...e, schedule, subject };
    });
  },
};
