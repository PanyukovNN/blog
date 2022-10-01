import '../App.css';
import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

/**
 * Navigation panel component.
 *
 * @returns navigation panel component
 */
export const NavigationPanel: FC = () => {

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate("/", { replace: true });
    }

    return (
        <div className={"navigation-panel"}>
            <span className={"navigation-panel-link"} onClick={navigateToHomePage}>Home</span>

            <span className={"navigation-panel-link"} onClick={navigateToHomePage}>About me</span>
        </div>
    )
}
