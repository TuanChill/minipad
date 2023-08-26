import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./configs/PrivateRoutes";
import PublicRoutes from "./configs/PublicRoutes";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css"

function App() {
  return (
    <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
    </Routes>
  );
}
export default App
