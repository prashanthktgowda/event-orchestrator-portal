# 🍽️ CaterFlow - Catering Event Management App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT) <!-- Choose your license -->
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
<!-- Add other relevant badges like Tailwind, Material UI, Zustand, etc. if used -->
<!-- [![Live Site](https://img.shields.io/badge/View%20Live-Site-brightgreen?style=for-the-badge)]([Your Live Site URL (Optional)]) -->

---

## ✨ Overview

**CaterFlow** is a modern web application designed to streamline daily operations for catering contractors. It specifically addresses the challenge of managing multiple, distinct client events scheduled for the same day. The application provides tools for detailed itemization, checklist management, location tracking, and staff coordination, all backed by a real-time Firebase database.

The goal is to offer a clean, intuitive interface that helps contractors stay organized, track preparation progress, and ensure all requirements for each event are met efficiently.

---

## 🚀 Key Features

*   **📅 Multi-Event Dashboard:** View and manage all scheduled events for the current day at a glance.
*   **👥 Client & Location Management:** Assign events to specific clients and easily add/view delivery locations.
*   **📝 Master Item List:** Define reusable catering items (food, beverages, equipment) centrally.
*   **✔️ Event-Specific Checklists:** Create detailed checklists for each event, pulling from the master list.
*   **ιε Nested Sub-Items:** Add detailed sub-items to main checklist items (e.g., "Coffee Station" requiring "Cups", "Sugar", "Stirrers", "Milk Jugs").
*   **➕ Dynamic Item Management:** Easily add or remove items/sub-items from an event's checklist as needs change.
*   **✅ Progress Tracking:** Mark items and sub-items as prepared, packed, or completed using interactive checkboxes/status indicators.
*   **👨‍🍳 Staff Assignment:** Assign servers or other staff members to specific events.
*   **🖼️ Visual Integration:** Display relevant imagery (e.g., food items, setup examples) to enhance clarity.
*   **🗑️ Automatic Data Cleanup:** Event data and associated checklists are automatically removed after a defined period (e.g., one week) to keep the system clean (handled via Firebase Cloud Functions).
*   **📱 Responsive Design:** Modern UI built to adapt to various screen sizes for accessibility on desktops, tablets, or phones.
*   **⚡ Dynamic Content:** Real-time updates powered by Firebase for seamless collaboration and status tracking.

---

## 🛠️ Technology Stack

*   **Frontend:**
    *   [React](https://reactjs.org/) (using `.tsx` - TypeScript)
    *   HTML5
    *   CSS3 (Potentially with CSS Modules, Tailwind CSS, Styled Components, or a UI library like Material UI / Ant Design - *Specify if decided*)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   (*Optional: Add State Management library like Zustand, Redux, Context API if used*)
*   **Backend & Database:**
    *   [Firebase](https://firebase.google.com/)
        *   **Firestore:** NoSQL database for real-time data storage.
        *   **Firebase Authentication:** (Optional) For user login if needed.
        *   **Cloud Functions for Firebase:** To handle background tasks like automatic data deletion.
        *   **Firebase Hosting:** (Optional) For deployment.
*   **Development Tools:**
    *   [Node.js](https://nodejs.org/)
    *   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
    *   [Vite](https://vitejs.dev/) or [Create React App](https://create-react-app.dev/) (Specify build tool)

---

## 💡 Core Concepts

*   **Real-time Synchronization:** Leverages Firebase Firestore to ensure data (event status, checklist progress) is updated across the application in real-time for all users viewing the same information.
*   **Component-Based Architecture:** Built with React, allowing for modular, reusable UI components that enhance maintainability and scalability.
*   **Efficient Same-Day Logistics:** Focused design to help caterers manage the complexities of simultaneous event preparations and deliveries.
*   **Automated Data Lifecycle:** Implements automatic data cleanup via Cloud Functions to manage storage and keep the focus on current/recent events.

---

## ⚙️ Running Locally

To set up and run the project on your local machine for development or testing:

### Prerequisites

*   [Node.js](https://nodejs.org/) (includes npm) - Ensure you have a recent LTS version installed.
*   [Git](https://git-scm.com/)
*   A code editor like [VS Code](https://code.visualstudio.com/)
*   A Firebase project set up (see Firebase Setup section below).

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository Link]
    cd [Your-Repository-Folder-Name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up Firebase Configuration:**
    *   You will need to get your Firebase project configuration keys.
    *   Create a `.env` file in the root of the project (ensure `.env` is listed in your `.gitignore` file!).
    *   Add your Firebase configuration variables to the `.env` file. Typically looks like this (using Vite's convention, adjust prefix if using CRA):
        ```dotenv
        VITE_FIREBASE_API_KEY=YOUR_API_KEY
        VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        VITE_FIREBASE_APP_ID=YOUR_APP_ID
        VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID # Optional
        ```
    *   Refer to your Firebase project settings (`Project settings > General > Your apps > Web app > SDK setup and configuration`) to get these values.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will typically start the application locally, often at `http://localhost:5173` (for Vite) or `http://localhost:3000` (for CRA). Check your terminal output for the exact address.

---

## 🔥 Firebase Setup

This project relies heavily on Firebase. You need to set up your own Firebase project:

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new Firebase project.
3.  Enable **Firestore Database**. Create it in **Test mode** for easy initial development (remember to set up proper security rules before production!).
4.  Enable **Cloud Functions** if you plan to implement the automatic data deletion feature. You'll need to deploy functions for this.
5.  (Optional) Enable **Firebase Authentication** if you need user logins.
6.  (Optional) Enable **Firebase Hosting** if you plan to deploy the app there.
7.  Register a **Web app** within your Firebase project settings to get the configuration keys needed for the `.env` file mentioned in the "Running Locally" section.

---

## ☁️ Deployment

*(Choose and describe your deployment strategy)*

**Option 1: Firebase Hosting**
This project can be easily deployed using Firebase Hosting.
1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Login: `firebase login`
3.  Initialize Firebase in your project: `firebase init hosting` (select your project, configure build directory - often `dist` or `build`).
4.  Build the project: `npm run build` (or `yarn build`)
5.  Deploy: `firebase deploy --only hosting`

**Option 2: Vercel / Netlify**
Alternatively, deploy via platforms like Vercel or Netlify:
1.  Connect your Git repository (GitHub, GitLab, Bitbucket) to Vercel/Netlify.
2.  Configure the build command (e.g., `npm run build` or `yarn build`) and the output directory (e.g., `dist` or `build`).
3.  Set up the environment variables (your `VITE_FIREBASE_...` keys) in the Vercel/Netlify project settings.
4.  Deploy! Changes pushed to your main branch will trigger automatic redeployments.

---

## ⏳ Data Management & Auto-Deletion

*   Event data, checklists, and potentially related items stored in Firestore are intended for short-term operational use.
*   A **Firebase Cloud Function** is designed (or needs to be implemented) to run on a schedule (e.g., daily).
*   This function queries for events older than one week and deletes the corresponding documents from Firestore to prevent data bloat and maintain relevance.
*   *(You may want to add details or a link to the specific Cloud Function code once implemented)*.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page]([Link to your repository's issues page]). If you'd like to contribute:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information. *(Make sure you have a LICENSE file in your repo)*.

---

## 📧 Contact

[Prashanth K T - [prashanthktgowda123@gmail.com]

Project Link: [(https://github.com/prashanthktgowda/event-orchestrator-portal)]

---
