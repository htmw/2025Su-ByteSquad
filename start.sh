#!/bin/bash

# Start the Spring Boot backend
cd backend
mvn spring-boot:run &

# Wait for backend to start
sleep 10

# Start the React frontend
cd ../frontend
npm run dev
