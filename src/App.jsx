//HOOKS
import { Route, Routes } from "react-router-dom";
// UTILS
import PATHROUTES from "./utils/PathRoutes";
//COMPONENTS
import Navbar from "./components/Navbar/Navbar.component";
// VIEWS
import About from "./views/About/About.view";
import Create from "./views/Create/Create.view";
import Detail from "./views/Detail/Detail.view";
import Home from "./views/Home/Home.view";
import Login from "./views/Login/Login.view.jsx";

const App = () => {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path={PATHROUTES.LOGIN} element={<Login />} />
          <Route path={PATHROUTES.HOME} element={<Home />} />
          <Route path={PATHROUTES.CREATE} element={<Create />} />
          <Route path={PATHROUTES.DETAIL} element={<Detail />} />
          <Route path={PATHROUTES.ABOUT} element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
