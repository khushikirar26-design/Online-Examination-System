// ============================================================
// MOCK DATA Ã¢â‚¬â€ University Online Examination System
// Mirrors the database schema exactly.
// Replace service calls later with real REST API endpoints.
// ============================================================

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ USERS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const users = [
  {
    user_id: 1,
    username: 'admin',
    email: 'admin@university.edu',
    password_hash: 'admin123',
    role: 'ADMIN',
    status: 'ACTIVE',
    full_name: 'Dr. Rajesh Sharma',
    avatar: null,
  },
  {
    user_id: 2,
    username: 'prof.mehta',
    email: 'mehta@university.edu',
    password_hash: 'teacher123',
    role: 'TEACHER',
    status: 'ACTIVE',
    full_name: 'Prof. Anil Mehta',
    avatar: null,
  },
  {
    user_id: 3,
    username: 'prof.singh',
    email: 'singh@university.edu',
    password_hash: 'teacher123',
    role: 'TEACHER',
    status: 'ACTIVE',
    full_name: 'Prof. Priya Singh',
    avatar: null,
  },
  {
    user_id: 4,
    username: 'prof.kumar',
    email: 'kumar@university.edu',
    password_hash: 'teacher123',
    role: 'TEACHER',
    status: 'ACTIVE',
    full_name: 'Dr. Vijay Kumar',
    avatar: null,
  },
  {
    user_id: 5,
    username: 'abhay.patel',
    email: 'abhay@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Abhay Patel',
    avatar: null,
  },
  {
    user_id: 6,
    username: 'sneha.sharma',
    email: 'sneha@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Sneha Sharma',
    avatar: null,
  },
  {
    user_id: 7,
    username: 'ravi.verma',
    email: 'ravi@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Ravi Verma',
    avatar: null,
  },
  {
    user_id: 8,
    username: 'nisha.yadav',
    email: 'nisha@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Nisha Yadav',
    avatar: null,
  },
  {
    user_id: 9,
    username: 'arun.mishra',
    email: 'arun@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Arun Mishra',
    avatar: null,
  },
  {
    user_id: 10,
    username: 'pooja.gupta',
    email: 'pooja@student.university.edu',
    password_hash: 'student123',
    role: 'STUDENT',
    status: 'ACTIVE',
    full_name: 'Pooja Gupta',
    avatar: null,
  },
  {
    user_id: 11,
    username: 'prof.joshi',
    email: 'joshi@university.edu',
    password_hash: 'teacher123',
    role: 'TEACHER',
    status: 'ACTIVE',
    full_name: 'Dr. Anita Joshi',
    avatar: null,
  },
  {
    user_id: 12,
    username: 'prof.tiwari',
    email: 'tiwari@university.edu',
    password_hash: 'teacher123',
    role: 'TEACHER',
    status: 'ACTIVE',
    full_name: 'Prof. Rahul Tiwari',
    avatar: null,
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ DEPARTMENTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const departments = [
  { department_id: 1, department_name: 'Mathematics & Computing' },
  { department_id: 2, department_name: 'Computer Science & Engineering' },
  { department_id: 3, department_name: 'Information Technology' },
  { department_id: 4, department_name: 'Electronics & Communication' },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ COURSES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const courses = [
  { course_id: 1, department_id: 1, course_name: 'MCA', total_semesters: 4 },
  { course_id: 2, department_id: 2, course_name: 'M.Tech (CSE)', total_semesters: 4 },
  { course_id: 3, department_id: 3, course_name: 'B.Tech (IT)', total_semesters: 8 },
  { course_id: 4, department_id: 1, course_name: 'MBA (Business Analytics)', total_semesters: 4 },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ACADEMIC YEARS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const academicYears = [
  { academic_year_id: 1, year_start: 2024, year_end: 2025 },
  { academic_year_id: 2, year_start: 2025, year_end: 2026 },
  { academic_year_id: 3, year_start: 2026, year_end: 2027 },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SEMESTERS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const semesters = [
  { semester_id: 1, course_id: 1, academic_year_id: 2, semester_number: 1, term_type: 'ODD' },
  { semester_id: 2, course_id: 1, academic_year_id: 2, semester_number: 2, term_type: 'EVEN' },
  { semester_id: 3, course_id: 1, academic_year_id: 3, semester_number: 3, term_type: 'ODD' },
  { semester_id: 4, course_id: 1, academic_year_id: 3, semester_number: 4, term_type: 'EVEN' },
  { semester_id: 5, course_id: 2, academic_year_id: 2, semester_number: 1, term_type: 'ODD' },
  { semester_id: 6, course_id: 2, academic_year_id: 2, semester_number: 2, term_type: 'EVEN' },
  { semester_id: 7, course_id: 3, academic_year_id: 2, semester_number: 1, term_type: 'ODD' },
  { semester_id: 8, course_id: 3, academic_year_id: 2, semester_number: 2, term_type: 'EVEN' },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ TEACHERS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const teachers = [
  { teacher_id: 1, user_id: 2, department_id: 1, designation: 'Associate Professor' },
  { teacher_id: 2, user_id: 3, department_id: 2, designation: 'Assistant Professor' },
  { teacher_id: 3, user_id: 4, department_id: 1, designation: 'Professor' },
  { teacher_id: 4, user_id: 11, department_id: 3, designation: 'Assistant Professor' },
  { teacher_id: 5, user_id: 12, department_id: 2, designation: 'Lecturer' },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ STUDENTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const students = [
  { student_id: 1, user_id: 5, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025001' },
  { student_id: 2, user_id: 6, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025002' },
  { student_id: 3, user_id: 7, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025003' },
  { student_id: 4, user_id: 8, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025004' },
  { student_id: 5, user_id: 9, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025005' },
  { student_id: 6, user_id: 10, course_id: 1, current_semester_id: 2, batch_year: 2025, scholar_no: 'MCA2025006' },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SUBJECTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const subjects = [
  { subject_id: 1, course_id: 1, subject_code: 'MCA101', subject_name: 'Data Structures & Algorithms', semester_number: 1 },
  { subject_id: 2, course_id: 1, subject_code: 'MCA102', subject_name: 'Database Management Systems', semester_number: 1 },
  { subject_id: 3, course_id: 1, subject_code: 'MCA103', subject_name: 'Object Oriented Programming (Java)', semester_number: 1 },
  { subject_id: 4, course_id: 1, subject_code: 'MCA201', subject_name: 'Computer Networks', semester_number: 2 },
  { subject_id: 5, course_id: 1, subject_code: 'MCA202', subject_name: 'Software Engineering', semester_number: 2 },
  { subject_id: 6, course_id: 1, subject_code: 'MCA203', subject_name: 'Web Technologies', semester_number: 2 },
  { subject_id: 7, course_id: 1, subject_code: 'MCA301', subject_name: 'Operating Systems', semester_number: 3 },
  { subject_id: 8, course_id: 1, subject_code: 'MCA302', subject_name: 'Artificial Intelligence', semester_number: 3 },
  { subject_id: 9, course_id: 2, subject_code: 'MTE101', subject_name: 'Advanced Algorithms', semester_number: 1 },
  { subject_id: 10, course_id: 2, subject_code: 'MTE102', subject_name: 'Machine Learning', semester_number: 1 },
  { subject_id: 11, course_id: 3, subject_code: 'BIT101', subject_name: 'Programming in C', semester_number: 1 },
  { subject_id: 12, course_id: 3, subject_code: 'BIT102', subject_name: 'Digital Electronics', semester_number: 1 },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ TEACHING ASSIGNMENTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const teachingAssignments = [
  { teacher_id: 1, subject_id: 1 }, // Dept 1, Course 1
  { teacher_id: 1, subject_id: 2 },
  { teacher_id: 1, subject_id: 4 },
  { teacher_id: 2, subject_id: 9 }, // Dept 2, Course 2
  { teacher_id: 2, subject_id: 10 },
  { teacher_id: 3, subject_id: 3 }, // Dept 1, Course 1
  { teacher_id: 3, subject_id: 5 },
  { teacher_id: 3, subject_id: 7 },
  { teacher_id: 4, subject_id: 11 }, // Dept 3, Course 3
  { teacher_id: 4, subject_id: 12 },
  { teacher_id: 5, subject_id: 10 }, // Dept 2, Course 2
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ QUESTIONS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const questions = [
  // DBMS (subject_id: 2)
  { question_id: 1, subject_id: 2, question_text: 'What does ACID stand for in database transactions?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 2, subject_id: 2, question_text: 'Which normal form eliminates partial dependencies?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 3, subject_id: 2, question_text: 'What is a foreign key?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 4, subject_id: 2, question_text: 'Which SQL command is used to retrieve data from a database?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 5, subject_id: 2, question_text: 'What is the purpose of an index in a database?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 6, subject_id: 2, question_text: 'Which join returns only matching rows from both tables?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 7, subject_id: 2, question_text: 'What is a deadlock in database management?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 8, subject_id: 2, question_text: 'Which isolation level prevents dirty reads?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 9, subject_id: 2, question_text: 'What is BCNF (Boyce-Codd Normal Form)?', marks: 2, question_type: 'MCQ', difficulty: 'HARD' },
  { question_id: 10, subject_id: 2, question_text: 'Which concurrency control mechanism uses timestamps?', marks: 2, question_type: 'MCQ', difficulty: 'HARD' },
  { question_id: 11, subject_id: 2, question_text: 'Explain the concept of database normalization with examples. Describe up to 3NF.', marks: 5, question_type: 'THEORY', difficulty: 'MEDIUM' },
  { question_id: 12, subject_id: 2, question_text: 'What are the different types of SQL joins? Explain each with an example.', marks: 5, question_type: 'THEORY', difficulty: 'MEDIUM' },
  { question_id: 13, subject_id: 2, question_text: 'Describe the ACID properties of database transactions with real-world examples.', marks: 5, question_type: 'THEORY', difficulty: 'HARD' },
  { question_id: 14, subject_id: 2, question_text: 'What is ER modeling? Explain its components and how it is converted to relational schema.', marks: 5, question_type: 'THEORY', difficulty: 'EASY' },
  // Computer Networks (subject_id: 4)
  { question_id: 15, subject_id: 4, question_text: 'What does OSI stand for?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 16, subject_id: 4, question_text: 'How many layers are in the OSI model?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 17, subject_id: 4, question_text: 'Which protocol is used for IP address assignment?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 18, subject_id: 4, question_text: 'What is the function of the Transport layer in the OSI model?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 19, subject_id: 4, question_text: 'What is subnetting?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 20, subject_id: 4, question_text: 'Which protocol provides reliable, connection-oriented communication?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 21, subject_id: 4, question_text: 'Explain the three-way handshake in TCP.', marks: 5, question_type: 'THEORY', difficulty: 'MEDIUM' },
  { question_id: 22, subject_id: 4, question_text: 'What is the difference between TCP and UDP? When would you use each?', marks: 5, question_type: 'THEORY', difficulty: 'EASY' },
  // DSA (subject_id: 1)
  { question_id: 23, subject_id: 1, question_text: 'What is the time complexity of binary search?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 24, subject_id: 1, question_text: 'Which data structure uses LIFO principle?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 25, subject_id: 1, question_text: 'What is the worst case time complexity of Quick Sort?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 26, subject_id: 1, question_text: 'Which traversal visits root between left and right subtrees?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 27, subject_id: 1, question_text: 'What is a balanced binary search tree?', marks: 2, question_type: 'MCQ', difficulty: 'HARD' },
  { question_id: 28, subject_id: 1, question_text: 'Explain Dijkstra\'s algorithm with example.', marks: 5, question_type: 'THEORY', difficulty: 'HARD' },
  // Java (subject_id: 3)
  { question_id: 29, subject_id: 3, question_text: 'What is the difference between abstract class and interface?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 30, subject_id: 3, question_text: 'Which keyword is used to inherit a class in Java?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 31, subject_id: 3, question_text: 'What is polymorphism in Java?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 32, subject_id: 3, question_text: 'What is the purpose of the "finally" block in Java?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 33, subject_id: 3, question_text: 'Explain the concept of multithreading in Java.', marks: 5, question_type: 'THEORY', difficulty: 'HARD' },
  // Software Engineering (subject_id: 5)
  { question_id: 34, subject_id: 5, question_text: 'What is SDLC?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 35, subject_id: 5, question_text: 'Which SDLC model is used for iterative development?', marks: 2, question_type: 'MCQ', difficulty: 'MEDIUM' },
  { question_id: 36, subject_id: 5, question_text: 'What does UML stand for?', marks: 2, question_type: 'MCQ', difficulty: 'EASY' },
  { question_id: 37, subject_id: 5, question_text: 'Explain the Agile methodology and its key principles.', marks: 5, question_type: 'THEORY', difficulty: 'MEDIUM' },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ OPTIONS (MCQ) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const options = [
  // Q1: ACID
  { option_id: 1, question_id: 1, option_text: 'Atomicity, Consistency, Isolation, Durability', is_correct: true },
  { option_id: 2, question_id: 1, option_text: 'Atomicity, Concurrency, Isolation, Durability', is_correct: false },
  { option_id: 3, question_id: 1, option_text: 'Accuracy, Consistency, Integrity, Durability', is_correct: false },
  { option_id: 4, question_id: 1, option_text: 'Atomicity, Consistency, Integrity, Database', is_correct: false },
  // Q2: 2NF
  { option_id: 5, question_id: 2, option_text: '2NF', is_correct: true },
  { option_id: 6, question_id: 2, option_text: '1NF', is_correct: false },
  { option_id: 7, question_id: 2, option_text: '3NF', is_correct: false },
  { option_id: 8, question_id: 2, option_text: 'BCNF', is_correct: false },
  // Q3: Foreign Key
  { option_id: 9, question_id: 3, option_text: 'A key that uniquely identifies each row in a table', is_correct: false },
  { option_id: 10, question_id: 3, option_text: 'A key that references the primary key of another table', is_correct: true },
  { option_id: 11, question_id: 3, option_text: 'A key that can have NULL values only', is_correct: false },
  { option_id: 12, question_id: 3, option_text: 'A key used for indexing purposes only', is_correct: false },
  // Q4: SQL retrieve
  { option_id: 13, question_id: 4, option_text: 'INSERT', is_correct: false },
  { option_id: 14, question_id: 4, option_text: 'UPDATE', is_correct: false },
  { option_id: 15, question_id: 4, option_text: 'SELECT', is_correct: true },
  { option_id: 16, question_id: 4, option_text: 'DELETE', is_correct: false },
  // Q5: Index
  { option_id: 17, question_id: 5, option_text: 'To store backup copies of data', is_correct: false },
  { option_id: 18, question_id: 5, option_text: 'To speed up query retrieval operations', is_correct: true },
  { option_id: 19, question_id: 5, option_text: 'To enforce referential integrity', is_correct: false },
  { option_id: 20, question_id: 5, option_text: 'To normalize database tables', is_correct: false },
  // Q6: Join
  { option_id: 21, question_id: 6, option_text: 'LEFT JOIN', is_correct: false },
  { option_id: 22, question_id: 6, option_text: 'RIGHT JOIN', is_correct: false },
  { option_id: 23, question_id: 6, option_text: 'INNER JOIN', is_correct: true },
  { option_id: 24, question_id: 6, option_text: 'FULL OUTER JOIN', is_correct: false },
  // Q7: Deadlock
  { option_id: 25, question_id: 7, option_text: 'A state where database server crashes', is_correct: false },
  { option_id: 26, question_id: 7, option_text: 'A situation where two transactions wait for each other indefinitely', is_correct: true },
  { option_id: 27, question_id: 7, option_text: 'A corrupted database record', is_correct: false },
  { option_id: 28, question_id: 7, option_text: 'A type of SQL query error', is_correct: false },
  // Q8: Isolation
  { option_id: 29, question_id: 8, option_text: 'READ UNCOMMITTED', is_correct: false },
  { option_id: 30, question_id: 8, option_text: 'READ COMMITTED', is_correct: true },
  { option_id: 31, question_id: 8, option_text: 'REPEATABLE READ', is_correct: false },
  { option_id: 32, question_id: 8, option_text: 'SERIALIZABLE', is_correct: false },
  // Q9: BCNF
  { option_id: 33, question_id: 9, option_text: 'A normal form where every non-trivial dependency is determined by a superkey', is_correct: true },
  { option_id: 34, question_id: 9, option_text: 'A form eliminating all transitive dependencies', is_correct: false },
  { option_id: 35, question_id: 9, option_text: 'A form with no partial dependencies', is_correct: false },
  { option_id: 36, question_id: 9, option_text: 'A form that allows NULL values in primary key', is_correct: false },
  // Q10: Timestamp
  { option_id: 37, question_id: 10, option_text: 'Two-phase locking', is_correct: false },
  { option_id: 38, question_id: 10, option_text: 'Timestamp ordering', is_correct: true },
  { option_id: 39, question_id: 10, option_text: 'Optimistic concurrency control', is_correct: false },
  { option_id: 40, question_id: 10, option_text: 'Pessimistic concurrency control', is_correct: false },
  // CN Q15
  { option_id: 41, question_id: 15, option_text: 'Open Systems Interconnection', is_correct: true },
  { option_id: 42, question_id: 15, option_text: 'Open Source Integration', is_correct: false },
  { option_id: 43, question_id: 15, option_text: 'Operational System Interface', is_correct: false },
  { option_id: 44, question_id: 15, option_text: 'Online Security Infrastructure', is_correct: false },
  // CN Q16
  { option_id: 45, question_id: 16, option_text: '5', is_correct: false },
  { option_id: 46, question_id: 16, option_text: '6', is_correct: false },
  { option_id: 47, question_id: 16, option_text: '7', is_correct: true },
  { option_id: 48, question_id: 16, option_text: '8', is_correct: false },
  // CN Q17
  { option_id: 49, question_id: 17, option_text: 'DNS', is_correct: false },
  { option_id: 50, question_id: 17, option_text: 'DHCP', is_correct: true },
  { option_id: 51, question_id: 17, option_text: 'FTP', is_correct: false },
  { option_id: 52, question_id: 17, option_text: 'HTTP', is_correct: false },
  // CN Q18
  { option_id: 53, question_id: 18, option_text: 'Physical addressing', is_correct: false },
  { option_id: 54, question_id: 18, option_text: 'Routing packets across networks', is_correct: false },
  { option_id: 55, question_id: 18, option_text: 'End-to-end communication and error control', is_correct: true },
  { option_id: 56, question_id: 18, option_text: 'Encryption of data', is_correct: false },
  // CN Q19
  { option_id: 57, question_id: 19, option_text: 'Dividing a network into smaller logical sub-networks', is_correct: true },
  { option_id: 58, question_id: 19, option_text: 'Connecting two different networks', is_correct: false },
  { option_id: 59, question_id: 19, option_text: 'Assigning MAC addresses', is_correct: false },
  { option_id: 60, question_id: 19, option_text: 'Encrypting network traffic', is_correct: false },
  // CN Q20
  { option_id: 61, question_id: 20, option_text: 'UDP', is_correct: false },
  { option_id: 62, question_id: 20, option_text: 'TCP', is_correct: true },
  { option_id: 63, question_id: 20, option_text: 'ICMP', is_correct: false },
  { option_id: 64, question_id: 20, option_text: 'ARP', is_correct: false },
  // DSA Q23
  { option_id: 65, question_id: 23, option_text: 'O(n)', is_correct: false },
  { option_id: 66, question_id: 23, option_text: 'O(log n)', is_correct: true },
  { option_id: 67, question_id: 23, option_text: 'O(n log n)', is_correct: false },
  { option_id: 68, question_id: 23, option_text: 'O(1)', is_correct: false },
  // DSA Q24
  { option_id: 69, question_id: 24, option_text: 'Queue', is_correct: false },
  { option_id: 70, question_id: 24, option_text: 'Stack', is_correct: true },
  { option_id: 71, question_id: 24, option_text: 'Array', is_correct: false },
  { option_id: 72, question_id: 24, option_text: 'Linked List', is_correct: false },
  // DSA Q25
  { option_id: 73, question_id: 25, option_text: 'O(n log n)', is_correct: false },
  { option_id: 74, question_id: 25, option_text: 'O(n)', is_correct: false },
  { option_id: 75, question_id: 25, option_text: 'O(nÃ‚Â²)', is_correct: true },
  { option_id: 76, question_id: 25, option_text: 'O(log n)', is_correct: false },
  // DSA Q26
  { option_id: 77, question_id: 26, option_text: 'Pre-order', is_correct: false },
  { option_id: 78, question_id: 26, option_text: 'In-order', is_correct: true },
  { option_id: 79, question_id: 26, option_text: 'Post-order', is_correct: false },
  { option_id: 80, question_id: 26, option_text: 'Level-order', is_correct: false },
  // DSA Q27
  { option_id: 81, question_id: 27, option_text: 'A tree where all leaves are at the same level', is_correct: false },
  { option_id: 82, question_id: 27, option_text: 'A BST where the height difference between subtrees is at most 1', is_correct: true },
  { option_id: 83, question_id: 27, option_text: 'A tree with exactly two children for every node', is_correct: false },
  { option_id: 84, question_id: 27, option_text: 'A tree with no duplicate keys', is_correct: false },
  // Java Q29
  { option_id: 85, question_id: 29, option_text: 'Abstract class can have constructors; interface cannot', is_correct: false },
  { option_id: 86, question_id: 29, option_text: 'Abstract class can have concrete methods; interface (before Java 8) cannot', is_correct: true },
  { option_id: 87, question_id: 29, option_text: 'Interface supports multiple inheritance; abstract class does not', is_correct: false },
  { option_id: 88, question_id: 29, option_text: 'All of the above', is_correct: false },
  // Java Q30
  { option_id: 89, question_id: 30, option_text: 'implements', is_correct: false },
  { option_id: 90, question_id: 30, option_text: 'extends', is_correct: true },
  { option_id: 91, question_id: 30, option_text: 'inherits', is_correct: false },
  { option_id: 92, question_id: 30, option_text: 'super', is_correct: false },
  // Java Q31
  { option_id: 93, question_id: 31, option_text: 'The ability to have multiple constructors', is_correct: false },
  { option_id: 94, question_id: 31, option_text: 'The ability of an object to take many forms', is_correct: true },
  { option_id: 95, question_id: 31, option_text: 'Hiding class implementation details', is_correct: false },
  { option_id: 96, question_id: 31, option_text: 'Creating instances of a class', is_correct: false },
  // Java Q32
  { option_id: 97, question_id: 32, option_text: 'To catch exceptions', is_correct: false },
  { option_id: 98, question_id: 32, option_text: 'To execute code always, regardless of exception', is_correct: true },
  { option_id: 99, question_id: 32, option_text: 'To re-throw exceptions', is_correct: false },
  { option_id: 100, question_id: 32, option_text: 'To define exception types', is_correct: false },
  // SE Q34
  { option_id: 101, question_id: 34, option_text: 'Software Development Life Cycle', is_correct: true },
  { option_id: 102, question_id: 34, option_text: 'System Design Language Cycle', is_correct: false },
  { option_id: 103, question_id: 34, option_text: 'Software Design and Logic Concept', is_correct: false },
  { option_id: 104, question_id: 34, option_text: 'Standard Development Language Code', is_correct: false },
  // SE Q35
  { option_id: 105, question_id: 35, option_text: 'Waterfall', is_correct: false },
  { option_id: 106, question_id: 35, option_text: 'Spiral', is_correct: true },
  { option_id: 107, question_id: 35, option_text: 'V-Model', is_correct: false },
  { option_id: 108, question_id: 35, option_text: 'Big Bang', is_correct: false },
  // SE Q36
  { option_id: 109, question_id: 36, option_text: 'Unified Modeling Language', is_correct: true },
  { option_id: 110, question_id: 36, option_text: 'Universal Method Language', is_correct: false },
  { option_id: 111, question_id: 36, option_text: 'Unique Model Logic', is_correct: false },
  { option_id: 112, question_id: 36, option_text: 'Unified Method Logic', is_correct: false },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ EXAMS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const exams = [
  {
    exam_id: 1,
    exam_code: 'DBMS-MID-2026',
    subject_id: 2,
    teacher_id: 1,
    semester_id: 2,
    exam_type: 'MID SEMESTER',
    duration: 90,
    total_marks: 40,
    total_questions_to_display: 14,
  },
  {
    exam_id: 2,
    exam_code: 'CN-MID-2026',
    subject_id: 4,
    teacher_id: 1,
    semester_id: 2,
    exam_type: 'MID SEMESTER',
    duration: 60,
    total_marks: 30,
    total_questions_to_display: 10,
  },
  {
    exam_id: 3,
    exam_code: 'SE-UNIT1-2026',
    subject_id: 5,
    teacher_id: 2,
    semester_id: 2,
    exam_type: 'UNIT TEST',
    duration: 45,
    total_marks: 20,
    total_questions_to_display: 8,
  },
  {
    exam_id: 4,
    exam_code: 'DSA-END-2026',
    subject_id: 1,
    teacher_id: 1,
    semester_id: 1,
    exam_type: 'END SEMESTER',
    duration: 120,
    total_marks: 50,
    total_questions_to_display: 16,
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ EXAM QUESTIONS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const examQuestions = [
  // DBMS Exam (exam_id: 1)
  { exam_id: 1, question_id: 1, sequence_no: 1 },
  { exam_id: 1, question_id: 2, sequence_no: 2 },
  { exam_id: 1, question_id: 3, sequence_no: 3 },
  { exam_id: 1, question_id: 4, sequence_no: 4 },
  { exam_id: 1, question_id: 5, sequence_no: 5 },
  { exam_id: 1, question_id: 6, sequence_no: 6 },
  { exam_id: 1, question_id: 7, sequence_no: 7 },
  { exam_id: 1, question_id: 8, sequence_no: 8 },
  { exam_id: 1, question_id: 9, sequence_no: 9 },
  { exam_id: 1, question_id: 10, sequence_no: 10 },
  { exam_id: 1, question_id: 11, sequence_no: 11 },
  { exam_id: 1, question_id: 12, sequence_no: 12 },
  { exam_id: 1, question_id: 13, sequence_no: 13 },
  { exam_id: 1, question_id: 14, sequence_no: 14 },
  // CN Exam (exam_id: 2)
  { exam_id: 2, question_id: 15, sequence_no: 1 },
  { exam_id: 2, question_id: 16, sequence_no: 2 },
  { exam_id: 2, question_id: 17, sequence_no: 3 },
  { exam_id: 2, question_id: 18, sequence_no: 4 },
  { exam_id: 2, question_id: 19, sequence_no: 5 },
  { exam_id: 2, question_id: 20, sequence_no: 6 },
  { exam_id: 2, question_id: 21, sequence_no: 7 },
  { exam_id: 2, question_id: 22, sequence_no: 8 },
  // SE Exam (exam_id: 3)
  { exam_id: 3, question_id: 34, sequence_no: 1 },
  { exam_id: 3, question_id: 35, sequence_no: 2 },
  { exam_id: 3, question_id: 36, sequence_no: 3 },
  { exam_id: 3, question_id: 37, sequence_no: 4 },
  // DSA Exam (exam_id: 4)
  { exam_id: 4, question_id: 23, sequence_no: 1 },
  { exam_id: 4, question_id: 24, sequence_no: 2 },
  { exam_id: 4, question_id: 25, sequence_no: 3 },
  { exam_id: 4, question_id: 26, sequence_no: 4 },
  { exam_id: 4, question_id: 27, sequence_no: 5 },
  { exam_id: 4, question_id: 28, sequence_no: 6 },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ EXAM SCHEDULES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const examSchedules = [
  {
    schedule_id: 1,
    exam_id: 1,
    exam_date: '2026-09-30',
    start_time: '10:00',
    end_time: '11:30',
  },
  {
    schedule_id: 2,
    exam_id: 2,
    exam_date: '2026-10-02',
    start_time: '14:00',
    end_time: '15:00',
  },
  {
    schedule_id: 3,
    exam_id: 3,
    exam_date: '2026-10-05',
    start_time: '09:00',
    end_time: '09:45',
  },
  {
    schedule_id: 4,
    exam_id: 4,
    exam_date: '2026-10-10',
    start_time: '10:00',
    end_time: '12:00',
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ STUDENT EXAMS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const studentExams = [
  // Student 1 (Abhay) completed DBMS
  {
    student_exam_id: 1,
    student_id: 1,
    schedule_id: 1,
    attempt_number: 1,
    attempt_status: 'COMPLETED',
    attempt_start: '2026-09-15T10:00:00',
    attempt_end: '2026-09-15T11:28:00',
  },
  // Student 1 completed CN (past schedule for demo)
  {
    student_exam_id: 2,
    student_id: 1,
    schedule_id: 2,
    attempt_number: 1,
    attempt_status: 'COMPLETED',
    attempt_start: '2026-09-18T14:00:00',
    attempt_end: '2026-09-18T14:55:00',
  },
  // Student 2 completed DBMS
  {
    student_exam_id: 3,
    student_id: 2,
    schedule_id: 1,
    attempt_number: 1,
    attempt_status: 'COMPLETED',
    attempt_start: '2026-09-15T10:00:00',
    attempt_end: '2026-09-15T11:25:00',
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ RESULTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const results = [
  {
    result_id: 1,
    student_exam_id: 1,
    obtained_marks: 33,
    percentage: 82.5,
    result_status: 'PASS',
    is_published: true,
  },
  {
    result_id: 2,
    student_exam_id: 2,
    obtained_marks: 26,
    percentage: 86.7,
    result_status: 'PASS',
    is_published: true,
  },
  {
    result_id: 3,
    student_exam_id: 3,
    obtained_marks: 28,
    percentage: 70.0,
    result_status: 'PASS',
    is_published: true,
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SCORECARDS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const scorecards = [
  // Student 1, DBMS Exam
  { scorecard_id: 1, result_id: 1, question_id: 1, question_order: 1, selected_option_id: 1, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 2, result_id: 1, question_id: 2, question_order: 2, selected_option_id: 5, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 3, result_id: 1, question_id: 3, question_order: 3, selected_option_id: 11, written_answer: null, marks_obtained: 0 },
  { scorecard_id: 4, result_id: 1, question_id: 4, question_order: 4, selected_option_id: 15, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 5, result_id: 1, question_id: 5, question_order: 5, selected_option_id: 18, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 6, result_id: 1, question_id: 6, question_order: 6, selected_option_id: 21, written_answer: null, marks_obtained: 0 },
  { scorecard_id: 7, result_id: 1, question_id: 7, question_order: 7, selected_option_id: 26, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 8, result_id: 1, question_id: 8, question_order: 8, selected_option_id: 30, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 9, result_id: 1, question_id: 9, question_order: 9, selected_option_id: 33, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 10, result_id: 1, question_id: 10, question_order: 10, selected_option_id: 38, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 11, result_id: 1, question_id: 11, question_order: 11, selected_option_id: null, written_answer: 'Normalization is the process of organizing a database to reduce redundancy and improve data integrity. 1NF requires atomic values, 2NF removes partial dependencies, 3NF removes transitive dependencies.', marks_obtained: 4 },
  { scorecard_id: 12, result_id: 1, question_id: 12, question_order: 12, selected_option_id: null, written_answer: 'SQL joins combine rows from two or more tables. INNER JOIN returns matching rows, LEFT JOIN returns all from left table, RIGHT JOIN from right table, FULL OUTER JOIN returns all rows.', marks_obtained: 5 },
  { scorecard_id: 13, result_id: 1, question_id: 13, question_order: 13, selected_option_id: null, written_answer: 'ACID properties: Atomicity ensures all operations complete or none do. Consistency maintains database rules. Isolation prevents concurrent transactions interfering.', marks_obtained: 4 },
  { scorecard_id: 14, result_id: 1, question_id: 14, question_order: 14, selected_option_id: null, written_answer: 'ER model represents entities, attributes and relationships. Entities map to tables, attributes to columns, relationships to foreign keys or junction tables.', marks_obtained: 4 },
  // Student 1, CN Exam
  { scorecard_id: 15, result_id: 2, question_id: 15, question_order: 1, selected_option_id: 41, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 16, result_id: 2, question_id: 16, question_order: 2, selected_option_id: 47, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 17, result_id: 2, question_id: 17, question_order: 3, selected_option_id: 50, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 18, result_id: 2, question_id: 18, question_order: 4, selected_option_id: 55, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 19, result_id: 2, question_id: 19, question_order: 5, selected_option_id: 57, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 20, result_id: 2, question_id: 20, question_order: 6, selected_option_id: 62, written_answer: null, marks_obtained: 2 },
  { scorecard_id: 21, result_id: 2, question_id: 21, question_order: 7, selected_option_id: null, written_answer: 'The TCP three-way handshake: Step 1 - Client sends SYN. Step 2 - Server responds with SYN-ACK. Step 3 - Client sends ACK to establish connection.', marks_obtained: 5 },
  { scorecard_id: 22, result_id: 2, question_id: 22, question_order: 8, selected_option_id: null, written_answer: 'TCP is connection-oriented and reliable; UDP is connectionless and faster. TCP is used for file transfer, web browsing. UDP is used for video streaming, gaming.', marks_obtained: 9 },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ANALYTICS (pre-computed for mock) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const studentAnalytics = {
  student_id: 1,
  overall: {
    average_score: 84.6,
    highest_score: 92,
    lowest_score: 76,
    exams_attempted: 8,
    exams_passed: 7,
    pass_rate: 87.5,
    total_questions_answered: 68,
    correct_answers: 54,
    incorrect_answers: 9,
    unanswered: 5,
  },
  trend: [
    { exam: 'DSA Unit 1', score: 72, date: '2025-10-10' },
    { exam: 'DBMS Unit 1', score: 76, date: '2025-11-15' },
    { exam: 'Java Mid', score: 80, date: '2026-01-20' },
    { exam: 'DSA Mid', score: 84, date: '2026-02-18' },
    { exam: 'CN Unit 1', score: 82, date: '2026-03-10' },
    { exam: 'DBMS Mid', score: 82.5, date: '2026-04-05' },
    { exam: 'SE Unit 1', score: 88, date: '2026-05-20' },
    { exam: 'CN Mid', score: 86.7, date: '2026-06-15' },
  ],
  subject_performance: [
    { subject: 'DBMS', score: 82.5, exams: 2 },
    { subject: 'Computer Networks', score: 86.7, exams: 2 },
    { subject: 'Java', score: 80, exams: 1 },
    { subject: 'Software Engineering', score: 88, exams: 1 },
    { subject: 'DSA', score: 78, exams: 2 },
  ],
  strong_areas: ['Normalization', 'ER Modeling', 'SQL Basics', 'OSI Model', 'TCP/IP'],
  weak_areas: ['SQL Joins', 'Deadlock Resolution', 'Subnetting', 'Concurrency Control'],
  summary: 'Your performance has improved consistently over the past 6 months. You excel in conceptual topics like Normalization and OSI Model. Focus on practical topics like SQL Joins and Subnetting to further boost your scores.',
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ THEORY PENDING EVALUATIONS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const pendingEvaluations = [
  {
    student_exam_id: 1,
    student_id: 1,
    student_name: 'Abhay Patel',
    scholar_no: 'MCA2025001',
    exam_code: 'DBMS-MID-2026',
    question_id: 11,
    question_text: 'Explain the concept of database normalization with examples. Describe up to 3NF.',
    written_answer: 'Normalization is the process of organizing a database to reduce redundancy and improve data integrity...',
    max_marks: 5,
    marks_awarded: null,
    is_evaluated: false,
  },
  {
    student_exam_id: 3,
    student_id: 2,
    student_name: 'Sneha Sharma',
    scholar_no: 'MCA2025002',
    exam_code: 'DBMS-MID-2026',
    question_id: 12,
    question_text: 'What are the different types of SQL joins? Explain each with an example.',
    written_answer: 'SQL joins are used to combine rows from two or more tables based on a related column...',
    max_marks: 5,
    marks_awarded: null,
    is_evaluated: false,
  },
  {
    student_exam_id: 3,
    student_id: 2,
    student_name: 'Sneha Sharma',
    scholar_no: 'MCA2025002',
    exam_code: 'DBMS-MID-2026',
    question_id: 13,
    question_text: 'Describe the ACID properties of database transactions with real-world examples.',
    written_answer: 'ACID stands for Atomicity, Consistency, Isolation, and Durability...',
    max_marks: 5,
    marks_awarded: null,
    is_evaluated: false,
  },
];
// End of mock data
