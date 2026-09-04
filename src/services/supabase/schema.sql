-- ==============================================================================
-- GEOMETRY LAB - SUPABASE POSTGRESQL SCHEMA FOR TEACHER DASHBOARD & STUDENT APP
-- Program: Grade 9 Spatial Geometry (Hình học Không gian 9: Trụ - Nón - Cầu)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Classes Table (Lớp học)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    grade INT NOT NULL DEFAULT 9,
    school_year VARCHAR(50) NOT NULL DEFAULT '2025 - 2026',
    class_code VARCHAR(50) UNIQUE NOT NULL,
    teacher_id UUID NOT NULL,
    teacher_name VARCHAR(150) NOT NULL,
    schedule VARCHAR(150),
    room VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Students Profiles (Hồ sơ học sinh)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    streak_days INT DEFAULT 1,
    accuracy_rate NUMERIC(5,2) DEFAULT 100.0,
    target_score NUMERIC(3,1) DEFAULT 9.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Question Bank (Ngân hàng câu hỏi)
CREATE TABLE IF NOT EXISTS public.question_bank (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shape_id VARCHAR(20) NOT NULL, -- cylinder, cone, sphere
    lesson_id VARCHAR(50),
    type VARCHAR(30) NOT NULL, -- multiple_choice, true_false, numeric, fill_blank, drag_drop, challenge
    difficulty VARCHAR(20) NOT NULL, -- easy, medium, hard
    title VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    latex_equation TEXT,
    options JSONB,
    correct_answer JSONB NOT NULL,
    hint TEXT,
    explanation TEXT NOT NULL,
    points_xp INT DEFAULT 40,
    real_world_context TEXT,
    tags TEXT[],
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Assignments (Nhiệm vụ & Bài tập về nhà được giao)
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    shape_id VARCHAR(20) NOT NULL DEFAULT 'all',
    target_class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL,
    teacher_name VARCHAR(150) NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    reward_xp INT DEFAULT 100,
    exercise_ids TEXT[] NOT NULL,
    total_questions INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'published', -- published, draft, closed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Assignment Submissions (Bài nộp & Kết quả)
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(150) NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    score NUMERIC(4,2) NOT NULL, -- Scale 0.0 to 10.0
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    time_spent_minutes INT DEFAULT 10,
    answers JSONB NOT NULL,
    teacher_feedback TEXT,
    status VARCHAR(20) DEFAULT 'graded' -- graded, pending
);

-- 6. Student Errors & Misconceptions Log (Chẩn đoán lỗi sai)
CREATE TABLE IF NOT EXISTS public.student_errors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    exercise_id VARCHAR(100),
    shape_id VARCHAR(20) NOT NULL,
    error_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    wrong_answer TEXT,
    correct_answer TEXT,
    remedial_explanation TEXT,
    remedial_formula_latex TEXT,
    occurred_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_assignments_class_id ON public.assignments(target_class_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment_id ON public.assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student_id ON public.assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_errors_student_id ON public.student_errors(student_id);
CREATE INDEX IF NOT EXISTS idx_questions_shape ON public.question_bank(shape_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_errors ENABLE ROW LEVEL SECURITY;

-- Base Public Policies for development/demo
CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON public.assignment_submissions FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON public.question_bank FOR SELECT USING (true);
