//HOOKS
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ACTIONS
import { login } from "./redux/actions.js";
// UTILS
import PATHROUTES from "./utils/PathRoutes";
//COMPONENTS
import Navbar from "./components/Navbar/Navbar.component";
import ProtectedRoutes from "./components/Utils/ProtectedRoutes.component";
// VIEWS
import About from "./views/About/About.view";
import Create from "./views/Create/Create.view";
import Detail from "./views/Detail/Detail.view";
import Home from "./views/Home/Home.view";
import Login from "./views/Login/Login.view";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      dispatch(login(parsedUserData));
    }
  }, [dispatch]);

  return (
    <>
      <div>
        {user && <Navbar />}
        <Routes>
          <Route path={PATHROUTES.LOGIN} element={<Login />} />
            <Route element={<ProtectedRoutes />} >
              <Route path={PATHROUTES.HOME} element={<Home />} />
              <Route path={PATHROUTES.CREATE} element={<Create />} />
              <Route path={PATHROUTES.DETAIL} element={<Detail />} />
              <Route path={PATHROUTES.ABOUT} element={<About />} />
            </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
