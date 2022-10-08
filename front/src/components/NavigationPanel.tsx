import '../App.css';
import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Navigation panel component.
 *
 * @returns navigation panel component
 */
export const NavigationPanel: FC = () => {

    const navigate = useNavigate();

    const navigateToHomePage = (e : any) => {
        e.preventDefault()

        navigate("/", { replace: true });
    }

    return (
        <div className={"navigation-panel"}>
            <a className={"navigation-panel-link"} onClick={navigateToHomePage} href="/">Home</a>

            <a className={"navigation-panel-link"} onClick={navigateToHomePage} href="/">About me</a>
        </div>
    )
}
