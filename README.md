# 💪 Gymnetics - Your Fitness & Supplement Solution

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/htmw/2025Su-ByteSquad)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React,%20Spring%20Boot,%20MySQL-orange)](https://github.com/htmw/2025Su-ByteSquad)

## 🏋️‍♂️ Project Overview

Gymnetics is a cutting-edge fitness platform that revolutionizes workout planning and supplement selection. Our mission is to empower users with personalized training programs and intelligent supplement recommendations, all wrapped in a seamless e-commerce experience.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Team](#-team)
- [Sprint Timeline](#-sprint-timeline)
- [Tech Stack](#-tech-stack)
- [Development Tools](#-development-tools)
- [Getting Started](#-getting-started)
- [Project Artifacts](#-project-artifacts)
- [Team Responsibilities](#-team-responsibilities)
- [Sprint Planning](#-sprint-planning)
- [Current Status](#-current-status)

## 💪 Core Features

- Personalized workout planning
- AI-powered supplement recommendations
- Role-based access control
- Clean e-commerce interface
- Progress tracking & analytics

## 🛠 Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI
- Redux
- Axios

### Backend
- Spring Boot
- Spring Security
- JPA/Hibernate
- RESTful API

### Database
- MySQL
- Docker
- AWS

## 🔧 Development Tools

- VScode
- GitHub
- Zoom
- YouTube
- AWS

## 📁 Project Artifacts

- [GitHub Repository](https://github.com/htmw/2025Su-ByteSquad)
- [Sprint 0 Documentation](https://github.com/htmw/2025Su-ByteSquad/wiki/Sprint-0---Gymnetics)
- [Videos](https://github.com/htmw/2025Su-ByteSquad/tree/main/videos)
- [Presentations](https://github.com/htmw/2025Su-ByteSquad/tree/main/presentations)

## 📋 Team Responsibilities

- **ST1**: Project Lead & Frontend
- **ST2**: AI & Future Planning
- **ST3**: UX & Tech Stack
- **ST4**: Backend & Planning
- **ST5**: User Analysis & Testing

## 📅 Sprint Timeline

### Sprint 0 (Completed: May 27 - June 5, 2025)
- Project Setup
- MVP Definition
- Team Roles
- Initial Planning
- Basic API

### Sprint 1 (Completed: June 6 - June 19, 2025)
- Core Features
  - ✅ Authentication System
  - ✅ Supplement Store
  - ✅ Workout Routines
  - ✅ Home Page
  - ✅ Trainer Recommendations
- Role Implementation
  - ✅ User Authentication
  - ✅ Protected Routes
  - ✅ Role-based Access
- API Endpoints
  - ✅ Authentication Endpoints
  - ✅ Supplement Management


### Sprint 2 (Planned: June 20 - July 3, 2025)
- AI Integration
- Advanced Features
- Testing
- Final MVP

## 🚀 Features Completed in Sprint 1

### User Interface
- Modern, responsive design using Material-UI
- Fixed navigation bar with proper spacing
- Workout routines section with detailed program views
- Supplement store with product cards
- Shopping cart integration
- User authentication flow
- Home page with workout and supplement sections
- Trainer recommendations section

### Features
- Authentication System
  - Login/Register functionality
  - Protected routes
  - Token-based authentication
- Supplement Store
  - Browse supplements
  - Add to cart
  - View product details
  - Shopping cart persistence
- Workout Programs
  - View available workout routines
  - Detailed program information
  - Exercise breakdowns
- Home Page
  - Welcome section with gym image
  - Quick access to workouts and supplements
  - Trainer recommendations

### Technical Implementation
- React frontend with TypeScript
- Material-UI for components
- React Router for navigation
- Context API for state management
- Responsive design implementation
- Backend API integration
- SQL database integration

## � API Endpoints

### Authentication API
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration


### Supplement API
- GET `/api/supplements` - List all supplements
- GET `/api/supplements/:id` - Get supplement details
- POST `/api/supplements` - Add new supplement


## 📊 Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supplements Table
CREATE TABLE supplements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(255),
    stock INT DEFAULT 0
);


## �📈 Sprint Status Updates

✅ **Current Sprint (June 6 - June 19, 2025)**
- ✅ Authentication System
- ✅ Supplement Store
- ✅ Workout Programs
- ✅ Home Page
- ✅ Trainer Recommendations
- ✅ API Integration
- ✅ Database Setup

🎯 **Sprint 2 (Planned: June 20 - July 3, 2025)**
- AI Integration
- Advanced Features
- Testing
- Final MVP

## 🛠️ Languages and Tools

- React with TypeScript
- Material-UI
- Node.js
- Express.js
- MySQL
- Axios
- React Router
- Context API
- JWT Authentication

## 📋 CS691 Deliverables

### Presentations (Sprint Reviews)

#### Sprint 1
- [Watch Deliverable 2 Presentation Video](#)
- [Download Deliverable 2 Presentation Video](#)
- [Deliverable 2 Presentation Slide as PowerPoint](#)
- [Deliverable 2 Presentation Slide as PDF](#)
- [2c) Prototype](#)
- [2d) Demo](#)
- [2e) Sprint 1 Source Code](https://github.com/htmw/2025Su-ByteSquad)

### Sprint Burndown Charts and Completed Tasks

- [Sprint 1 Burndown Chart](#)
- [Sprint 1 Completed Tasks](#)

### Sprint Planning

- [Sprint 1 Planning (recording)](#)
- [Sprint 2 Planning (recording)](#)

### Retrospectives

- [Sprint 1 Retrospectives (recording)](#)

### Team working agreement

- [Team working agreement as Word Document](#)
- [Team working agreement as PDF](#)

### Architecture Diagram

- [Conceptual Diagram](#)
- [Sequence Diagram](#)

### Additional Project Artifacts

#### Product Personas (at least 3)
- [Persona 1](#)
- [Persona 2](#)
- [Persona 3](#)

#### User Stories w/ Acceptance Criteria
- [View User Stories Spreadsheet as PDF](#)
- [View User Stories Spreadsheet as Excel Workbook](#)

#### Application Test Cases
- [View Test Cases Spreadsheet as PDF](#)
- [View Test Cases Spreadsheet as Excel Workbook](#)

## 🔗 Links

- [GitHub Repository](https://github.com/htmw/2025Su-ByteSquad)
- [Sprint 0 Documentation](https://github.com/htmw/2025Su-ByteSquad/wiki/Sprint-0---Gymnetics)
- [Videos](https://github.com/htmw/2025Su-ByteSquad/tree/main/videos)
- [Presentations](https://github.com/htmw/2025Su-ByteSquad/tree/main/presentations)

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose

### Installation

1. Clone the repository:
```bash
git clone https://github.com/htmw/2025Su-ByteSquad.git
```

2. Start the application:
```bash
./start.sh
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with passion by Ninja Squad | CS691 | Summer 2025
