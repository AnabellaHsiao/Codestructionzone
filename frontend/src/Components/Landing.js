import {useAuth0} from '@auth0/auth0-react'
import TitleInteractive from "./TitleInteractive";
import "./Landing.css";
import React from "react";

const Landing = () => {
    const {loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="landing">
                <TitleInteractive />
                <div className="landingtext">A fun and easy way for kids to learn code!</div>
                <button className="log-in" onClick={() => loginWithRedirect()}>
                    Start Codestructing!
                </button>
            </div>
        )
    )
}

export default Landing