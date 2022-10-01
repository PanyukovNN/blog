import React, {useEffect} from "react";
import {isLoggedIn} from './AuthService'

type Props = {
    children? : JSX.Element
};

/**
 * Wrapper for components, which need to be redirected to main page if user is authenticated
 *
 * @param children children component
 * @returns wrapper
 */
export const RedirectAfterAuth = ({ children }: Props) => {

    const navigateToMainPage = () => {
        window.location.href = "/";
    }

    useEffect(() => {
        if (isLoggedIn()) {
            navigateToMainPage();
        }
    }, [])

    return <>
        {children}
    </>;
};

export default RedirectAfterAuth
