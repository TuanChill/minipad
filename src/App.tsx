import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./configs/PrivateRoutes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import 'remixicon/fonts/remixicon.css'
import "./index.css"

function App() {
  return (
    <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
        {/* <Route element={<PublicRoutes />}> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        {/* </Route> */}
    </Routes>
  );
}


export default App
