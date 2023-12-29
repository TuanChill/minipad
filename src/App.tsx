import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import LandingPage from "./pages/Landing";
import ResetPassword from "./pages/auth/ResetPassword";
import ProfileSetting from "./pages/auth/ProfileSetting";
import PadContainer from "./containers/Pads/PadContainer";
import PadEmpty from "./containers/Pads/PadEmpty";
import CustomerSp from "./pages/CustomerSupport/CustomerSp";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./containers/PrivateRoute";
import Pad from "./pages/Pad";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LayoutAuth from "./layouts/LayoutAuth";
import PadShare from "./containers/Pads/PadShare";
import ShareView from "./layouts/ShareView";

import "remixicon/fonts/remixicon.css";
import "./index.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* auth route */}
          <Route element={<LayoutAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          {/*pad route  */}
          <Route path="/app">
            {/* route to pad */}
            <Route element={<DefaultLayout />}>
              <Route
                path="pad"
                element={
                  <PrivateRoute>
                    <Pad />
                  </PrivateRoute>
                }
              >
                <Route index element={<PadEmpty />} />
                <Route path=":id" element={<PadContainer />} />
              </Route>
            </Route>
            {/* route to share */}
            <Route path="share/:uid" element={<ShareView />}>
              <Route index element={<NotFound />} />
              <Route path=":id" element={<PadShare />} />
            </Route>
            <Route index element={<NotFound />} />
          </Route>

          <Route
            path="/profile-setting"
            element={
              <PrivateRoute>
                <ProfileSetting />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<LandingPage />} />
          <Route path="/contact-us" element={<CustomerSp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
