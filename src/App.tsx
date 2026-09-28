import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { AppDataProvider } from "./store/AppDataContext";
import { useThemeController } from "./hooks/useTheme";

const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Today = lazy(() => import("./pages/Today"));
const TimeView = lazy(() => import("./pages/TimeView"));
const WeeklyView = lazy(() => import("./pages/WeeklyView"));
const CalendarPage = lazy(() => import("./pages/Calendar"));
const NewPage = lazy(() => import("./pages/NewPage"));
const Settings = lazy(() => import("./pages/Settings"));

function ThemedApp() {
  useThemeController();

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="today" element={<Today />} />
            <Route path="time-view" element={<TimeView />} />
            <Route path="weekly" element={<WeeklyView />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="new-page" element={<NewPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppDataProvider>
      <ThemedApp />
    </AppDataProvider>
  );
}
