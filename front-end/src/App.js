import './App.scss';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
            <Route index element={<Home />}/>
            <Route path="signin" element={<Signin />}/>
            <Route path="signup" element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
