import './App.scss';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/sign-in";
import SignUp from "./pages/sign-up";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
            <Route path="signin" element={<Signin />}/>
            <Route path="signup" element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
