import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import LayoutClear from "./layouts/LayoutClear/LayoutClear";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./containers/PrivateRoute";
import NotFound from "./pages/NotFound";

import "remixicon/fonts/remixicon.css";
import "./index.css";
import Pad from "./pages/Pad";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutClear />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
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
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
