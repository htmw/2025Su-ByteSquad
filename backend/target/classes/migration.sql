-- Migration script to add missing age column
ALTER TABLE users ADD COLUMN age INTEGER;
