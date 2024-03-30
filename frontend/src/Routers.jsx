import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { Signin } from "./components/Signin";

export function Routers (){
    return <div>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signin' element={<Signin/>} />
      </Routes>
      </BrowserRouter>
    </div>
}