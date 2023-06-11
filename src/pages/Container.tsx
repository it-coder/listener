import React from "react";
import { Outlet } from "react-router-dom"



const Container = () => {

    return (
        <React.Fragment>
            <Outlet></Outlet>
        </React.Fragment>
    );
}

export default Container;