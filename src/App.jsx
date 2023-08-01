import Layout from "./layout";
import Toast from "./components/toast";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import { Navigate, Route, Routes } from "react-router-dom";
import Setting from "./pages/setting";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="var(--gray-1)" highlightColor="var(--gray-2)">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to={"/home/days/0"} />} />
          <Route path="home/days/:index" element={<Home />} />
          <Route
            path="/calendar"
            element={<Navigate to={"/calendar/days/0"} />}
          />
          <Route path="calendar/days/:index" element={<Calendar />} />
          <Route path="setting" element={<Navigate to={"/setting/days/0"} />} />
          <Route path="setting/days/:index" element={<Setting />} />
        </Routes>
        <Toast />
      </Layout>
    </SkeletonTheme>
  );
}

export default App;
