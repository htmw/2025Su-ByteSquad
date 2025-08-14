-- Delete existing data
DELETE FROM supplements;
DELETE FROM users;
DELETE FROM user_roles;

-- Insert test users (password is 'password' encrypted with BCrypt)
INSERT INTO users (email, password, first_name, last_name, profile_picture, weight, height, fitness_goal, age) VALUES
('test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test', 'User', NULL, 70.0, 175.0, 'MUSCLE_GAIN', 25),
('admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', NULL, 80.0, 180.0, 'GENERAL_FITNESS', 30);

-- Insert user roles
INSERT INTO user_roles (user_id, role) VALUES
(1, 'USER'),
(2, 'ADMIN');

-- Insert sample supplements
INSERT INTO supplements (name, description, price, image_url, category, brand, usage_instructions, benefits) VALUES
('Whey Protein Isolate', 'Premium whey protein isolate for muscle recovery and growth', 49.99, 'https://images.unsplash.com/photo-1579722820308-d3c6c8e2c29c', 'Protein', 'OptimumNutrition', 'Mix one scoop with water or milk post-workout', 'Supports muscle recovery and growth'),
('BCAA Complex', 'Branch Chain Amino Acids for muscle preservation', 29.99, 'https://images.unsplash.com/photo-1579722820779-c19c981b22af', 'Amino Acids', 'Dymatize', 'Take during workouts', 'Prevents muscle breakdown during intense workouts'),
('Creatine Monohydrate', 'Pure creatine for strength and power', 19.99, 'https://images.unsplash.com/photo-1579722819451-d4c1a5307f27', 'Performance', 'MyProtein', 'Take 5g daily with water', 'Increases strength and power output'),
('Pre-Workout Energy', 'Advanced pre-workout formula', 39.99, 'https://images.unsplash.com/photo-1579722820889-5a1e2823b6b6', 'Energy', 'C4', 'Take 30 minutes before workout', 'Enhances energy and focus'),
('Omega-3 Fish Oil', 'High-quality fish oil supplement', 24.99, 'https://images.unsplash.com/photo-1579722820791-9d5b2f0f9a4a', 'Health', 'NOW Foods', 'Take 2 softgels daily with meals', 'Supports heart and joint health'),
('ZMA Complex', 'Zinc, Magnesium and B6 complex', 22.99, 'https://images.unsplash.com/photo-1579722820806-5a6b4c1b5678', 'Recovery', 'Universal', 'Take before bed', 'Supports sleep and recovery');
