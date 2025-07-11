-- Delete existing data
DELETE FROM supplements;

-- Insert sample supplements
INSERT INTO supplements (name, description, price, image_url, category, brand, usage_instructions, benefits) VALUES
('Whey Protein Isolate', 'Premium whey protein isolate for muscle recovery and growth', 49.99, 'https://images.unsplash.com/photo-1579722820308-d3c6c8e2c29c', 'Protein', 'OptimumNutrition', 'Mix one scoop with water or milk post-workout', 'Supports muscle recovery and growth'),
('BCAA Complex', 'Branch Chain Amino Acids for muscle preservation', 29.99, 'https://images.unsplash.com/photo-1579722820779-c19c981b22af', 'Amino Acids', 'Dymatize', 'Take during workouts', 'Prevents muscle breakdown during intense workouts'),
('Creatine Monohydrate', 'Pure creatine for strength and power', 19.99, 'https://images.unsplash.com/photo-1579722819451-d4c1a5307f27', 'Performance', 'MyProtein', 'Take 5g daily with water', 'Increases strength and power output'),
('Pre-Workout Energy', 'Advanced pre-workout formula', 39.99, 'https://images.unsplash.com/photo-1579722820889-5a1e2823b6b6', 'Energy', 'C4', 'Take 30 minutes before workout', 'Enhances energy and focus'),
('Omega-3 Fish Oil', 'High-quality fish oil supplement', 24.99, 'https://images.unsplash.com/photo-1579722820791-9d5b2f0f9a4a', 'Health', 'NOW Foods', 'Take 2 softgels daily with meals', 'Supports heart and joint health'),
('ZMA Complex', 'Zinc, Magnesium and B6 complex', 22.99, 'https://images.unsplash.com/photo-1579722820806-5a6b4c1b5678', 'Recovery', 'Universal', 'Take before bed', 'Supports sleep and recovery');
