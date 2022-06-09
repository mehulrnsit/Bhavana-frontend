import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './Components/Main';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from "./Components/Home";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            key={"main"}
            path={"/Bhavana-frontend"}
            element={<Main/>}
          />
          <Route
            key={"login"}
            path={"/login"}
            element={<Login/>}
          />
          <Route
            key={"signup"}
            path={"/signup"}
            element={<SignUp/>}
          />
          <Route
            key={"home"}
            path={"/home"}
            element={<Home/>}
          />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
