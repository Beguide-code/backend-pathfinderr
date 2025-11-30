
INSERT INTO opportunities (title, description_opportunity, organization, deadline, min_gpa, eligible_majors,type_opportunity, link) VALUES
('Computer Science Scholarship', 'Scholarship for outstanding CS students', 'Tech Education Foundation', '2024-03-31', 3.5, '{"Computer Science", "Software Engineering"}', 'scholarship', 'https://example.com/cs-scholarship'),
('Summer Software Engineering Intern', 'Paid internship for software development', 'Google', '2024-02-15', 3.0, '{"Computer Science", "Computer Engineering", "Electrical Engineering"}', 'internship', 'https://careers.google.com'),
('Women in STEM Fellowship', 'Fellowship supporting women in STEM fields', 'Women Tech Council', '2024-04-30', 3.2, '{"Computer Science", "Biology", "Chemistry", "Physics", "Mathematics"}', 'fellowship', 'https://example.com/stem-fellowship'),
('Data Science Research Grant', 'Research grant for data science projects', 'Data Institute', '2024-03-15', 3.4, '{"Computer Science", "Statistics", "Mathematics"}', 'grant', 'https://example.com/ds-grant');

INSERT INTO students (email, first_name, surname,country,password_hash,date_of_birth) VALUES
('student1@university.edu', 'John', 'Doe','Ghana', 'xxxxxxxx', '2024-03-31' );
 

INSERT INTO mentors (mentor_name, expertise, bio, availability_hours) VALUES
('Dr. Sarah Chen', '{"career_advice", "resume_review", "interview_prep"}', 'Career counselor with 10+ years experience helping students land dream jobs', '{"monday": ["09:00-12:00", "14:00-17:00"], "wednesday": ["10:00-13:00"], "friday": ["09:00-11:00"]}'),
('Prof. James Wilson', '{"scholarship_applications", "research_opportunities", "graduate_school"}', 'Professor and scholarship committee member', '{"tuesday": ["13:00-16:00"], "thursday": ["10:00-12:00", "14:00-18:00"]}'),
('Alex Rodriguez', '{"tech_interviews", "portfolio_building", "internship_search"}', 'Senior software engineer and former internship recruiter', '{"monday": ["17:00-20:00"], "saturday": ["10:00-14:00"]}');
 
 