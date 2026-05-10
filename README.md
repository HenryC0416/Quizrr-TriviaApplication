# Quizrr-TriviaApplication
Quizrr is a browser-based trivia game built as a full-stack web application. Users can register, log in, choose a trivia category, answer timed multiple-choice questions, and save their quiz scores to their account.


https://github.com/user-attachments/assets/9085ff0c-34bd-481e-b864-a03a448a86cb



Features
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected quiz and results pages
- Trivia questions fetched from The Trivia API
- Category-based quiz selection
- Timed questions
- Immediate answer feedback
- Score tracking per quiz session
- Saved scores per user
- Recent scores dashboard
- Detailed results page with total quizzes, average score, best score, and score history



Tech Stack:

Frontend
- React
- Vite
- Tailwind CSS

Backend:
- Node.js
- Express.js
- Prisma
- PostgreSQL with Neon
- bcrypt
- JSON Web Tokens

External API -
The Trivia API: https://the-trivia-api.com/

Project Structure
```text
Quizrr-TriviaApplication/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnswerButtons.jsx
│   │   │   ├── FinishScreen.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── QuestionCard.jsx
│   │   ├── context/
│   │   │   └── authContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── questionsController.js
│   │   └── scoreController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── index.js
│   │   ├── questions.js
│   │   └── scoreRoutes.js
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```
Local Setup Instructions
1. Clone the repository
```bash
git clone <repository-url>
cd Quizrr-TriviaApplication
```
2. Install frontend dependencies
```bash
cd client
npm install
```
3. Install backend dependencies
```bash
cd ../server
npm install
```
4. Create environment files
Create `server/.env`:
```env
DATABASE\_URL="your\_neon\_postgres\_connection\_string"
JWT\_SECRET="your\_jwt\_secret"
```
Create `client/.env`:
```env
VITE\_API\_URL="http://localhost:3001"
```
5. Run Prisma migrations
From the `server` folder:
```bash
npx prisma migrate dev
npx prisma generate
```
Optional: open Prisma Studio to inspect data.
```bash
npx prisma studio
```
6. Start the backend
From the `server` folder:
```bash
npm run dev
```
The backend runs on:
```text
http://localhost:3001
```
7. Start the frontend
From the `client` folder:
```bash
npm run dev
```
The frontend runs on:
```text
http://localhost:5173
```
Current MVP Flow
```text
Register/Login → Select Category → Play Quiz → Finish Quiz → Save Score → View Results
```
What I Would Do Next: 
- Fix play again functionlity to not rerender the same quiz
- Implement leaderboard functionality
- Add profile feature, displaying user information
