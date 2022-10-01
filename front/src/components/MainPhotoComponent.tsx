import '../App.css';
import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import mainPhotoPath from "../resources/main-photo.jpg";

/**
 * Navigation panel component.
 *
 * @returns navigation panel component
 */
export const MainPhotoComponent: FC = () => {

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate("/", { replace: true });
    }

    return (
        <div className={"main-photo-wrap"} onClick={navigateToHomePage}>
            <img src={mainPhotoPath} alt={"Here must be my photo"}/>
        </div>
    )
}
