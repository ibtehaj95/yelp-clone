import React from "react";
import { Outlet } from "react-router-dom";

function PublicRoutes(){

    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}

export default PublicRoutes;