import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Wrapper from "./components/layouts/WrapperRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import NotFoundPage from "./pages/Errors/NotFound";
import WrapperCustom from "./components/layouts/WrapperCustom";
import CreatePage from "./pages/Create";

function App() {
  const RequiredLogin = ({children}) => {
    if (!localStorage.access_token) {
      return <Navigate to="/login" />;
    } else return children;
  };
  const ForbiddenLoggedIn = ({children}) => {
    if (localStorage.access_token) {
      return <Navigate to="/" />;
    } else return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredLogin>
              <Wrapper />
            </RequiredLogin>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
        <Route
          path="/login"
          element={
            <ForbiddenLoggedIn>
              <WrapperCustom>
                <LoginPage />
              </WrapperCustom>
            </ForbiddenLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <ForbiddenLoggedIn>
              <WrapperCustom>
                <RegisterPage />
              </WrapperCustom>
            </ForbiddenLoggedIn>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
