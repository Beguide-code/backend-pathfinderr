CREATE TABLE IF NOT EXISTS opportunities(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description_opportunity TEXT,
    organization VARCHAR(255),
    deadline DATE,
    min_gpa DECIMAL(3,2),
    eligible_majors TEXT[],
    type_opportunity VARCHAR(255) CHECK (type_opportunity IN ('scholarship','internship','fellowship','grant')),
    link VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    major VARCHAR(100),
    gpa DECIMAL(3,2),
    graduation_year INTEGER,
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications(
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    opportunity_id INTEGER REFERENCES opportunities(id),
    status_application VARCHAR(50) DEFAULT 'interested' CHECK(status_application IN ('interested','applied','interview','rejected','accepted')),
    application_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id,opportunity_id)
);

CREATE TABLE IF NOT EXISTS mentors(
    id SERIAL PRIMARY KEY,
    
     VARCHAR(255) NOT NULL,
    expertise TEXT[],
    bio TEXT,
    availability_hours JSONB,
    communication_preferences TEXT[] DEFAULT '{"chat","email"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mentorship_sessions(
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    mentor_id INTEGER REFERENCES mentors(id),
    session_date TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER DEFAULT 30,
    topic VARCHAR(255),
    notes TEXT,
    status_session VARCHAR(50) DEFAULT 'scheduled' CHECK(status_session IN ('scheduled','completed','cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);