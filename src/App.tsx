import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import LayoutClear from "./layouts/LayoutClear/LayoutClear";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import AuthProvider from "./context/AuthProvider";
import Checking from "./containers/checking";
import "remixicon/fonts/remixicon.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutClear />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
 
        <Route path="/app" element={<DefaultLayout />}>
          <Route index element={<Checking />} />
          <Route path="pad" element={<Home />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
