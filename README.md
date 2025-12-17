# MyPay

MyPay is a comprehensive full-stack mobile application designed to help users track their personal finances. Built with **React Native (Expo)** for the frontend and **Node.js/Express** for the backend, it offers a seamless experience for managing transactions across Android and iOS devices.

## 🚀 Project Overview

MyPay solves the problem of personal expense tracking by providing a clean, responsive interface where users can log income and expenses, view their balance, and analyze their spending habits.

**Key Goals:**
*   Provide a cross-platform mobile experience (iOS & Android).
*   Ensure secure user authentication and data storage.
*   Offer a responsive and visually appealing UI.

**Tech Stack:**
*   **Frontend:** React Native, Expo, Expo Router, Clerk (Auth)
*   **Backend:** Node.js, Express.js
*   **Database:** Neon (Serverless Postgres)
*   **Caching/Rate Limiting:** Upstash Redis
*   **Styling:** Custom responsive styling system

---

## ✨ Features

*   **📱 Responsive UI:** Optimized for all screen sizes using a custom responsive utility library.
*   **🧱 Masonry-Style Layout:** Efficient presentation of transaction items and dashboard elements.
*   **🔔 Custom Alert System:** A bespoke, animated alert component for user confirmations (e.g., deleting transactions).
*   **🔄 Auto-Refresh:** Smart state management ensures the Home screen updates automatically after adding a new transaction.
*   **🎨 Reusable Styles:** Centralized `COLORS` constants and modular style files for consistent theming.
*   **🔒 Secure Authentication:** Integrated with Clerk for robust user management.

---

## 📂 Project Structure

The project is organized into two main directories: `backend` and `mobile`.

```
MyPay/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/          # DB (Neon), Redis (Upstash), Cron jobs
│   │   ├── controllers/     # Request handlers (Transaction logic)
│   │   ├── middleware/      # Rate limiting, etc.
│   │   ├── routes/          # API route definitions
│   │   └── server.js        # Entry point
│   └── package.json
│
├── mobile/                  # React Native Expo App
│   ├── app/                 # Expo Router screens
│   │   ├── (auth)/          # Authentication screens (Sign In/Up)
│   │   └── (root)/          # Main app screens (Home, Create)
│   ├── assets/              # Images and Style definitions
│   ├── components/          # Reusable UI components (Alerts, Cards)
│   ├── constants/           # App-wide constants (Colors, API URLs)
│   ├── hooks/               # Custom hooks (useTransaction)
│   ├── lib/                 # Utilities (Responsive scaling)
│   └── package.json
```

---

## 🛠 Installation and Setup

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn
*   Expo Go app on your mobile device (or Android Studio/Xcode for simulation)

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables (you will need credentials from Neon and Upstash):

```env
PORT=8000
DATABASE_URL=your_neon_db_url
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Run the backend server:

```bash
npm run dev
```

### 2. Mobile App Setup

Navigate to the mobile directory and install dependencies:

```bash
cd ../mobile
npm install
```

Create a `.env` file in `mobile/` with your Clerk publishable key and Backend URL:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:8000/api
```
*Note: Replace `<YOUR_LOCAL_IP>` with your machine's local IP address to allow the mobile device to connect to the backend.*

Run the app:

```bash
npx expo start
```
Scan the QR code with the Expo Go app on your phone.

---

## 🎨 Styling Approach

MyPay uses a **JS-in-CSS** approach with `StyleSheet.create`, enhanced by a custom responsive library.

*   **Responsive Utilities:** Located in `mobile/lib/responsive.js`, functions like `scale`, `verticalScale`, and `moderateScale` ensure elements look great on different screen densities.
*   **Shared Constants:** All colors are defined in `mobile/constants/colors.js` to maintain theme consistency.
*   **Modular Styles:** Styles are separated from logic. For example, `home.style.js` contains all styles for the Home screen, keeping the component code clean.

---

## ↔️ Navigation and State Flow

*   **Navigation:** The app uses **Expo Router** for file-based routing.
    *   `app/(auth)`: Handles the authentication flow.
    *   `app/(root)`: Contains the main application logic.
*   **Data Flow:**
    *   **Hooks:** `useTransaction.js` encapsulates data fetching logic (GET, POST, DELETE).
    *   **Auto-Refresh:** When a user creates a transaction in `create.jsx`, the app navigates back to `index.jsx` (Home) with a refresh parameter, triggering a data reload to show the latest balance immediately.

---

## 🧩 Custom Components

### CustomAlert
A reusable modal component (`mobile/components/CustomAlert.jsx`) that replaces the native OS alert. It features:
*   Smooth fade-in/scale animations.
*   Customizable title, message, and button actions.
*   Consistent styling with the app's theme.

### Masonry/Grid Layout
The Home screen utilizes a layout strategy to display transaction items and balance cards effectively, ensuring efficient use of screen real estate.

---

## ✅ Best Practices

*   **Code Organization:** Clear separation of concerns (Controllers vs Routes in Backend; Components vs Screens in Mobile).
*   **Reusability:** Common UI elements (Buttons, Alerts, Loaders) are extracted into the `components/` directory.
*   **Performance:**
    *   **Rate Limiting:** Implemented on the backend using Upstash to prevent API abuse.
    *   **Optimized Lists:** Uses `FlatList` for efficient rendering of transaction lists.

---

## 🔮 Future Improvements

*   **Charts & Analytics:** Add visual graphs to show spending trends over time.
*   **Category Management:** Allow users to create custom transaction categories.
*   **Offline Mode:** Implement local caching to allow viewing data without an internet connection.
*   **Push Notifications:** Alert users about daily spending limits or bill reminders.

---

## 📄 License

This project is licensed under the ISC License.

---

*Developed by Vaibhav Pandey*