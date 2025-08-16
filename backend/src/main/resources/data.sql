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
INSERT INTO supplements (name, description, price, image_url, category, brand, usage_instructions, benefits,price_id) VALUES
('Whey Protein Isolate', 'Premium whey protein isolate for muscle recovery and growth', 49.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/Wey.png', 'Protein', 'OptimumNutrition', 'Mix one scoop with water or milk post-workout', 'Supports muscle recovery and growth', 'price_1Rws9aHQANx3BHw8wu1U2Aso'),
('BCAA Complex', 'Branch Chain Amino Acids for muscle preservation', 29.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/bca.png', 'Amino Acids', 'Dymatize', 'Take during workouts', 'Prevents muscle breakdown during intense workouts','price_1RwsAWHQANx3BHw88m4TO9N0'),
('Creatine Monohydrate', 'Pure creatine for strength and power', 19.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/creatine.png', 'Performance', 'MyProtein', 'Take 5g daily with water', 'Increases strength and power output','price_1RwsbDHQANx3BHw8NCQaEEv2'),
('Pre-Workout Energy', 'Advanced pre-workout formula', 39.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/prework.png', 'Energy', 'C4', 'Take 30 minutes before workout', 'Enhances energy and focus','price_1RwsaiHQANx3BHw85sVYUPSf'),
('Omega-3 Fish Oil', 'High-quality fish oil supplement', 24.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/fishoil.png', 'Health', 'NOW Foods', 'Take 2 softgels daily with meals', 'Supports heart and joint health','price_1RwsYuHQANx3BHw8IXU6gzRQ'),
('ZMA Complex', 'Zinc, Magnesium and B6 complex', 22.99, 'https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/ZMA.png', 'Recovery', 'Universal', 'Take before bed', 'Supports sleep and recovery','price_1RwsZeHQANx3BHw8lGpcK3dy');
