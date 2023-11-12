import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Trash from "./components/Trash";
import Manage from "./components/Manage";
import Reset from "./components/Reset";
import Root from "./components/Root";
import {List as ListComp} from "./components/List";
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { ToastContainer } from 'react-toastify';

function App (){

    const [location, setLocation] = useState(null);

    // useEffect(() => {
    //     console.log("App Location", location);
    // }, [location]);

    return(
        <div className="App">
            <Routes>
                <Route element={<PublicRoutes></PublicRoutes>}>
                    <Route path="/" element={<Root></Root>}></Route>
                    <Route path="/login" element={<Login setLocation = {setLocation} ></Login>}></Route>
                    <Route path="/register" element={<Register setLocation = {setLocation} ></Register>}></Route>
                    <Route path="/reset" element={<Reset setLocation = {setLocation} ></Reset>}></Route>
                    <Route path="*" element={<h1>Not Found</h1>}></Route>
                </Route>
                <Route element={
                    <PrivateRoutes 
                        location = {location} 
                    ></PrivateRoutes>}
                >
                    <Route path="/home" element={<Home setLocation = {setLocation} ></Home>}></Route>
                    <Route path="/list/:id" element={<ListComp setLocation = {setLocation}></ListComp>}></Route>
                    <Route path="/trash" element={<Trash setLocation = {setLocation} ></Trash>}></Route>
                    <Route path="/manage" element={<Manage setLocation = {setLocation} ></Manage>}></Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default App;