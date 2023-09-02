import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./configs/PrivateRoutes";
import PublicRoutes from "./configs/PublicRoutes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css"
import 'remixicon/fonts/remixicon.css'

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
