import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useGlobalState } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated, user } = useGlobalState();
  return (
    <BrowserRouter>

      {isAuthenticated && <Header />}

      <Routes>
        <Route
          exact
          path="/"
          element={<LoginPage />}
        />
        <Route
          exact
          path="/register"
          element={<RegisterPage />}
          replace
        />

        <Route element={<ProtectedRoutes />}>
          <Route
            exact
            path="/home"
            element={<ListPage />}
            replace
          />
          {user?.role == "Admin" &&
            <Route
              exact
              path="/create"
              element={<CreatePage />}
              replace
            />}
          <Route
            exact
            path="/detail/:adId"
            element={<DetailPage />}
            replace
          />

        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
