# Redux Toolkit Demo – Task Management Dashboard

This project is a comprehensive demonstration of Redux Toolkit in a modern Next.js + Tailwind CSS application. It simulates a professional task management and project tracking platform, perfect for explaining Redux Toolkit concepts to your boss or team.

## Features

- **Redux Toolkit**: Uses `createSlice`, `createAsyncThunk`, and `configureStore` for state management
- **TypeScript**: Full type safety throughout the app
- **Next.js App Router**: Modern file-based routing and layouts
- **Tailwind CSS**: Clean, responsive UI with modern design
- **Task Management Dashboard**:
  - User authentication (mocked)
  - Project overview with statistics and progress tracking
  - Task board with filtering, search, and status updates
  - Real-time state monitoring and DevTools integration
  - Responsive design for all devices

## Redux Toolkit Concepts Demonstrated

- **createSlice**: Simplifies reducer and action creation
- **createAsyncThunk**: Handles async logic with loading/error states
- **Immer**: Write "mutative" logic that is actually immutable
- **Typed Hooks**: Type-safe `useAppDispatch` and `useAppSelector`
- **DevTools**: Debug state and actions with Redux DevTools

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Demo Credentials

- **Email:** `demo@example.com`
- **Password:** `password`

## App Structure

- `src/lib/` – Redux store, slices, and typed hooks
- `src/components/` – UI components (Header, LoginForm, TaskBoard, ProjectDashboard, StateMonitor, ReduxDevTools)
- `src/app/` – Next.js app directory (layout, main page, providers)

## Explaining to Your Boss

- **Login** with the demo credentials to see user authentication and async thunk in action
- **Project Dashboard** shows statistics cards and project management features
- **Task Board** demonstrates filtering, search, and real-time status updates
- **State Monitor** displays live Redux state for transparency
- **Open Redux DevTools** in your browser to inspect actions and state changes
- **Responsive Design** works perfectly on desktop, tablet, and mobile devices

## Key Business Benefits Demonstrated

- **Project Management**: Track project progress, budgets, and team assignments
- **Task Organization**: Filter tasks by status, priority, assignee, and search terms
- **Real-time Updates**: See state changes instantly as you interact with the app
- **Professional UI**: Modern, responsive design suitable for business presentations
- **Scalable Architecture**: Redux Toolkit patterns that scale with your application

## Useful Links

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux DevTools Extension (Chrome)](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

This project is ideal for learning, demos, and onboarding new developers to Redux Toolkit in a real-world business context.
