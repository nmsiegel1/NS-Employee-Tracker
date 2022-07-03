INSERT INTO department (department_name)
VALUES
('Sales'),
('Engineering'),
('Product'),
('Design');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Director of Product Management', 160000, 3),
('Product Manager', 125000, 3),
('Director of Design', 150000, 4),
('UX/UI Designer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Carolyn', 'Morris', 1, NULL),
('Lisa', 'Alberts', 2, 1),
('Josh', 'Siegel', 3, NULL),
('Nina', 'Siegel', 4, 3),
('Christine', 'Itwaru', 5, NULL),
('Adam', 'Siegel', 6, 5),
('Cameron', 'Burke', 7, NULL),
('Janice', 'Allen', 8, 7);