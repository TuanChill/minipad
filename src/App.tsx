import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import LandingPage from "./pages/Landing";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./containers/PrivateRoute";
import Pad from "./pages/Pad";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LayoutAuth from "./layouts/LayoutAuth";

import "remixicon/fonts/remixicon.css";
import "./index.css";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="/app">
            <Route element={<DefaultLayout />}>
              <Route
                path="pad"
                element={
                  <PrivateRoute>
                    <Pad />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route index element={<NotFound />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
