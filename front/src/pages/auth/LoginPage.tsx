import '../../App.css';
import React from "react";
import {SignForm} from "../../components/auth/SignForm";
import {SignFormType} from "../../util/CommonTypes";

/**
 * User sign in page
 *
 * @returns sign in page
 */
export const LoginPage = () => {

    return (
        <SignForm formType={SignFormType.SIGN_IN}/>
    );
}
