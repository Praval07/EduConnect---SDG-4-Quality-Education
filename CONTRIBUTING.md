# Contributing to EduConnect AI

Thank you for your interest in contributing to EduConnect AI! 🎓

This project is aligned with **UN SDG 4 — Quality Education**, and every contribution helps democratize learning for students worldwide.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/EduConnect---SDG-4-Quality-Education.git
   cd EduConnect---SDG-4-Quality-Education
   ```
3. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. **Set up environment variables** by copying `.env.example` to `.env` in the `backend/` folder
5. **Start the development servers:**
   ```bash
   # Terminal 1 — backend
   cd backend && npm start

   # Terminal 2 — frontend
   cd frontend && npm run dev
   ```

---

## Project Structure

```
EduConnect/
├── frontend/src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context (Auth, Theme)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Route-level page components
│   ├── services/       # Axios API service
│   ├── utils/          # Helper functions
│   └── constants/      # App-wide constants
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, error handler
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── seed/           # Database seeder
│   └── utils/          # Backend helpers
└── screenshots/        # Project screenshots for README
```

---

## How to Contribute

### 🐛 Reporting Bugs
- Open an [issue](https://github.com/Praval07/EduConnect---SDG-4-Quality-Education/issues)
- Include steps to reproduce, expected behavior, and screenshots

### 💡 Suggesting Features
- Open an issue with the `enhancement` label
- Describe the feature and why it would be useful for students

### 🔧 Submitting a Pull Request
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes following the code style
3. Write a clear commit message: `git commit -m "Add: feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request targeting the `master` branch

---

## Code Style Guidelines

### Frontend (React)
- Use functional components with hooks
- Prefer Tailwind utility classes (no inline styles)
- Use Framer Motion for all animations
- All interactive elements must have a unique `id` attribute
- Keep components focused — one responsibility per component

### Backend (Node.js)
- Use async/await with try/catch
- Use the `successResponse` / `errorResponse` helpers from `utils/helpers.js`
- Validate all inputs in controllers
- Document routes in the README API section

---

## Commit Message Format

```
Add: new feature or file
Fix: bug fix
Update: change to existing functionality
Remove: deleted code or files
Docs: documentation changes
Style: formatting/UI-only changes
Refactor: code restructure without behavior change
```

---

## SDG 4 Alignment

When contributing content (resources, videos, subjects), please ensure it aligns with SDG 4 goals:
- ✅ Educational value to students
- ✅ Inclusive and accessible to all
- ✅ Accurate and up-to-date information
- ✅ Free and openly available

---

Thank you for helping make quality education accessible to everyone! 🌍
