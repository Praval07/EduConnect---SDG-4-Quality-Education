# 🎓 Rapid Revision Hub — Learn Smarter. Revise Faster.

<div align="center">

![Rapid Revision Hub Banner](screenshots/home.png)

**A premium EdTech platform empowering education through AI technology**

[![SDG 4](https://img.shields.io/badge/SDG%204-Quality%20Education-E63946?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAzTDEgOWw0IDIuMThWMTdsMSAxIDYgM2w2LTMgMS0xdi01LjgyTDIzIDlsLTExLTZ6bTAgMi40TDE5IDlsMi0uOTNMMTIgNHoiLz48L3N2Zz4=)](https://sdgs.un.org/goals/goal4)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://rapid-revision-hub.vercel.app) · [Report Bug](https://github.com/Praval07/EduConnect---SDG-4-Quality-Education/issues) · [Request Feature](https://github.com/Praval07/EduConnect---SDG-4-Quality-Education/issues)

</div>

---

## # Live Demo

Production Website: [https://rapid-revision-hub.vercel.app](https://rapid-revision-hub.vercel.app)

---

## # Deployment

Deployed using **Vercel + GitHub Integration** for the frontend, with automatic continuous deployment triggered on every push to the `main` branch.

---

## # Author

**Praval Saxena**

---

## # Contact

* 📞 **Phone:** 7533828012
* 📧 **Email:** [rapidrevisionhub@gmail.com](mailto:rapidrevisionhub@gmail.com)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [SDG 4 — Quality Education](#-sdg-4--quality-education)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation Guide](#-installation-guide)
- [API Documentation](#-api-documentation)
- [Deployment Guide](#-deployment-guide)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Project Overview

**Rapid Revision Hub** is a world-class, full-stack EdTech platform built to make quality education accessible to all students. Inspired by platforms like Coursera, Khan Academy, Notion, and ChatGPT, it combines premium design with practical features including AI-powered assistance, curated study materials, educational videos, and a personalized learning dashboard.

The platform is designed with a portfolio-quality, startup-grade aesthetic — glassmorphism UI, smooth Framer Motion animations, dark/light mode, fully responsive design, and production-ready code architecture.

### Mission
> *"Learn Smarter. Revise Faster."* — Making quality education universally accessible, aligned with the United Nations Sustainable Development Goal 4.

---

## 🎯 SDG 4 — Quality Education

This project directly supports **UN Sustainable Development Goal 4: Quality Education**, which aims to:

- ✅ Ensure inclusive and equitable quality education
- ✅ Promote lifelong learning opportunities for all by 2030
- ✅ Ensure free, equitable and quality primary and secondary education
- ✅ Substantially increase the supply of qualified teachers
- ✅ Build and upgrade education facilities that are inclusive

**Rapid Revision Hub contributes by:**
- Providing free access to curated study materials and educational videos
- Offering an AI-powered study assistant for personalized learning
- Supporting digital literacy and skill development
- Making quality education resources accessible regardless of geographic location

---

## ✨ Features

### 🏠 Landing Page
- Modern hero section with SDG 4 badge
- Animated statistics with IntersectionObserver counters
- Features grid with hover animations
- Student testimonials
- Interactive FAQ accordion
- Compelling CTA section

### 🔐 Authentication
- JWT-based user registration and login
- Bcrypt password hashing
- Protected routes with auto-redirect
- Persistent login via localStorage
- Logout functionality
- Guest mode access

### 📊 Dashboard
- SaaS-style stat cards (Resources, Saved, Videos, AI Sessions)
- Quick action buttons with icon cards
- Study goal progress bars with animated fill
- Recent activity feed
- Recommended resources widget
- Personalized greeting

### 📚 Study Materials
- 12+ categorized educational resources (DSA, DBMS, OS, CN, Python, Java, React, Node.js, MongoDB)
- Real-time search with debouncing
- Category filter chips
- Resource cards with download/save
- Download count tracking
- Pagination support
- Sort functionality

### 🎥 Educational Videos
- YouTube embed player modal
- Video thumbnail grid with category filters
- Trending toggle filter
- Watch Later bookmark functionality
- View count display
- Instructor info and duration

### 🤖 AI Study Assistant
- ChatGPT-style conversation UI with typing indicators
- Markdown rendering for rich responses
- Real-time intelligent Google Gemini API integration with conversation history and context awareness
- Copy message to clipboard
- Suggested prompts
- Session management

### 👤 Student Profile
- Avatar with initials
- Editable profile form (name, college, branch, semester)
- Skills management with suggestions
- Learning statistics display
- SDG 4 learner badge

### 📞 Contact Page
- Modern contact form with validation
- Success toast notification on submission
- Contact information display
- SDG 4 mission statement

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI Framework |
| Vite | 8 | Build Tool |
| React Router DOM | 7 | Client-side Routing |
| Tailwind CSS | 4 | Utility-first Styling |
| Framer Motion | 12 | Animations |
| Axios | 1.18 | HTTP Client |
| React Icons | 5 | Icon Library |
| React Markdown | 10 | AI Response Rendering |
| Context API | Built-in | State Management |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 24 | Runtime |
| Express.js | 5 | Web Framework |
| MongoDB | Atlas | Database |
| Mongoose | 9 | ODM |
| JWT | 9 | Authentication |
| bcryptjs | 3 | Password Hashing |
| CORS | 2.8 | Cross-Origin Requests |
| Google Generative AI | 0.21 | AI Integration (Gemini API) |

---

## 📸 Screenshots

### Landing Page
![Home](screenshots/home.png)

### Authentication
![Register](screenshots/register.png)
![Login](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Study Materials
![Study Materials](screenshots/study-materials.png)

### Educational Videos
![Videos](screenshots/videos.png)

### AI Study Assistant
![AI Assistant](screenshots/ai-assistant.png)

### Student Profile
![Profile](screenshots/profile.png)

### Contact Page
![Contact](screenshots/contact.png)

---

## 🚀 Installation Guide

### Prerequisites
- Node.js v18+ 
- npm v8+
- MongoDB Atlas account (free tier works great)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Praval07/EduConnect---SDG-4-Quality-Education.git
cd EduConnect---SDG-4-Quality-Education
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/rapidrevision?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start backend:
```bash
npm start
```

Optionally seed the database:
```bash
npm run seed
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Documentation

### Base URL
```
/api
```

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |

### Resource Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/resources` | Get all resources | No |
| POST | `/resources` | Create resource | Yes |
| PUT | `/resources/:id` | Update resource | Yes |
| DELETE | `/resources/:id` | Delete resource | Yes |
| POST | `/resources/:id/download` | Track download | No |

### Video Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/videos` | Get all videos | No |

### Profile Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update profile | Yes |
| POST | `/profile/save-resource/:id` | Toggle saved resource | Yes |

### Contact Route

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/contact` | Submit contact form | No |

### AI Assistant Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/ai/chat` | Send message to Gemini | Yes |
| GET | `/ai/history` | Get chat history | Yes |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for SDG 4 — Quality Education**

*Rapid Revision Hub — Learn Smarter. Revise Faster.*

[![GitHub Stars](https://img.shields.io/github/stars/Praval07/EduConnect---SDG-4-Quality-Education?style=social)](https://github.com/Praval07/EduConnect---SDG-4-Quality-Education)

</div>
