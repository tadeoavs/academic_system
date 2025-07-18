import { Route, Routes } from "react-router-dom";

import Login from "../components/login/Login";
import SignUp from "../components/singup/SignUp";
import Career from "../components/career/Career";
import Home from "../components/home/Home";
import NotFound from "../components/notfound/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/career" element={<Career/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}