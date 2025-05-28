
# 🚤 EasyCrew – Telegram Mini App Recruitment MVP

**EasyCrew** is a Telegram Mini App MVP designed for yacht crew recruitment. It offers basic Create, Read, Update, and Delete (CRUD) functionalities, allowing employers to post jobs and browse crew, and crew members to create profiles and explore job listings—all seamlessly within Telegram. Built with **React (Vite)** and **TypeScript** on the frontend and **Strapi** on the backend, EasyCrew delivers a smooth, integrated experience.

---

## ✨ Features

- **Telegram Mini App**: Optimized for Telegram’s embedded web app environment.  
- **Role Selection**: Users choose between Employer or Crew roles on first launch.  
- **Employer Dashboard**: Post, edit, delete, and manage job listings.  
- **Crew Dashboard**: Create/edit profiles, set availability, and browse available jobs.  
- **Crew Browsing**: Employers can search and filter available crew members.  
- **Strapi Backend**: Manages all job listings and user profiles via a user-friendly admin panel.  
- **Telegram UI Integration**: Leverages native Telegram components like `MainButton`, `BackButton`, and alert/confirm dialogs for a native experience.

---

## 🚀 Getting Started

Follow these steps to get the project up and running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/easycrew-telegram-miniapp.git
cd easycrew-telegram-miniapp
````

### 2. Install Dependencies

Install dependencies for both the frontend and backend:

```bash
# Frontend
cd crew-telegram-jobs
npm install

# Backend
cd ../backend
npm install
```

### 3. Configure Environment Variables

#### Backend:

* Inside the `backend/` directory, create a `.env` file (or copy from `.env.example`) and populate it with your Strapi settings.
* Create an API token from Strapi admin under **Settings > API Tokens**.

#### Frontend:

* In the `crew-telegram-jobs/` directory, create a `.env` file with the following:

```env
VITE_STRAPI_API_KEY=your_strapi_api_key
VITE_STRAPI_API_URL=http://localhost:1337/api
```

> You can find the API token used in `src/lib/api.ts`.

### 4. Run the Backend (Strapi)

```bash
cd backend
npm run develop
# or
yarn develop
```

This will launch the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin).

### 5. Run the Frontend

```bash
cd ../crew-telegram-jobs
npm run dev
```

The frontend should be available at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use).

---

## 🛠️ Project Structure

```
easycrew-telegram-miniapp/
├── backend/             # Strapi backend (API, DB, admin panel)
└── crew-telegram-jobs/  # React frontend (Telegram Mini App)
```

---

## 📝 Usage

* Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.
* To test within Telegram, follow the guide at [Telegram Web Apps - Testing and Debug](https://core.telegram.org/bots/webapps#testing-and-debug).
* On first launch, select your role (Employer or Crew) and start exploring features.

---

## 🧑‍💻 Tech Stack

* **Frontend**: React, TypeScript, Vite, Tailwind CSS
* **Backend**: Strapi (Node.js Headless CMS)
* **Telegram Mini App API**: For user authentication and native UI elements

---

## 🚢 Project Deployment

🔧 Deployment instructions coming soon...
