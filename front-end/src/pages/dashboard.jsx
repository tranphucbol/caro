import React from "react";
import Main from "./main";
import { Link } from "react-router-dom";

const DashBoard = () => (
    <Main>
        <div className="row min-vh-100">
            <Link to="/login">login</Link>
        </div>
    </Main>
);

export default DashBoard;
