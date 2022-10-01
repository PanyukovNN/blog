import React, {useEffect} from "react";
import {isLoggedIn} from './AuthService'

type Props = {
    children? : JSX.Element
};

/**
 * Wrapper for components with access only for authenticated user
 *
 * @param children child component
 * @returns wrapper
 */
export const RequireAuth = ({ children }: Props) => {

    const navigateToMainPage = () => {
        window.location.href = "/sign-in";
    }

    useEffect(() => {
        if (!isLoggedIn()) {
            navigateToMainPage();
        }
    }, [])

    return <>
        {children}
    </>;
};

export default RequireAuth
