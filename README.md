#  Sweet Shop Management System

A full-stack, test-driven Sweet Shop Management System built using **Node.js (Express), MongoDB (Mongoose), React (Vite + TypeScript), JWT Authentication, Zod Validation**, and **Jest/Supertest** for backend testing.

This project follows clean architecture, modular routing, proper error handling, authentication with roles, and fully tested backend endpoints.

---

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://sweetshop.tajinder.xyz) 
### [Sweet Shop Management](https://sweetshop.tajinder.xyz)

### ThisProject is now Live on my personal portfolio [tajinder.xyz](https://tajinder.xyz) 
---

##  Features

###  Authentication

* User and Admin registration
* Secure login with JWT
* Role-based permissions
* Admin secret key required for admin creation

###  Sweet Management (Admin)

* Add new sweets
* Update sweet details
* Delete sweets
* Restock sweets

###  User Features

* View all sweets
* Search sweets by name, category, or price
* Purchase sweets (decreases stock)## to be implemented way sooner

###  Testing (Backend)

* Automated backend API tests using:

  * Jest
  * Supertest
  * Test MongoDB database

### Responsive Frontend (React)

* Login, Register (User + Admin)
* Dashboard with all sweets
* Admin Panel for CRUD operations
* Protected routes using Redux + JWT

---

## 🗂 Project Structure

### **Backend**

```
backend/
│── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── validations/
│   ├── database.ts
│   ├── index.ts
│── tests/
│── package.json
│── tsconfig.json
│── jest.config.cjs
```

### **Frontend**

```
frontend/
│── src/
│   ├── api/
│   ├── pages/
│   ├── components/
│   ├── store/
│   ├── hooks/
│   ├── App.tsx ...
│── vite.config.ts
│── package.json
│── tsconfig.json
```

---

# Getting Started

##  Backend Setup

### Install dependencies

```
cd backend
npm install
```

### Add environment variables

Create a `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=your_secret
ADMIN_LOGIN_SECRET="your_admin_secret"
```

### Start the backend

```
npm run dev
```

### Run backend tests

```
npm test
```

---

## Frontend Setup

### Install dependencies

```
cd frontend/app
npm install
```

### Start dev server

```
npm run dev
```

---

#  Backend Testing

This project uses:

* **Jest** for unit/integration tests
* **Supertest** for HTTP API tests
* A separate `.env.test` for test isolation

Run all tests:

```
npm test
```

---

<!-- # 🖼 Screenshots

(Add your screenshots here.) -->

---

# My AI Usage

This project was developed with the active and transparent use of AI tools to enhance productivity, debugging, and learning.

##  AI Tools Used

* **ChatGPT (GPT-5.1 )**
* **GitHub Copilot**
* **BlackBox AI**

## 🛠 How I Used These Tools

### **ChatGPT**

* Helped structure backend architecture and folder organization.
* Guided me in implementing controller/service logic and TypeScript types.
* Help me refine the search functionality and gave me boilerplate for It and then I added my learned logic into it.
* Explained debugging issues (React state loops, JWT decoding problems).
* Helped me learn and refine Jest + Supertest test patterns.
* Created landing page for the project

### **GitHub Copilot**

* Suggested cleaner variable names and refactors.
* Helped me debug the issues related to Types and suggested me better practicies

### **Blackbox AI**

* I got stuck at React state loop It helped me get out of It.

---

##  Reflection: Impact of AI on Workflow

Using AI tools significantly improved:

###  Speed

Completed architecture, debugging, and refactoring faster than working manually.

### Learning

AI acted as a real-time mentor — especially for Jest patterns, real world code practicies,  and TypeScript Types defination.

### Debugging

AI helped quickly identify issues in JWT handling, React State loops(useEffect), and TypeScript types .

### Confidence

I validated decisions by comparing my logic with that of AI tools.

Despite using AI, I:

* Reviewed and rewrote code manually
* Ensured implementations fit *my* project structure
* Did **not** copy any code from external repositories
* Used AI only as an assistant, not a replacement

Overall, AI tools acted like a supportive teammate — enabling faster development while requiring my understanding and decision-making.

---

#  License

MIT License
