import '../../App.css';
import React from "react";
import {SignForm} from "../../components/auth/SignForm";
import {SignFormType} from "../../util/CommonTypes";

/**
 * Change admin password page
 *
 * @returns update password page
 */
export const ChangePasswordPage = () => {

    return (
        <SignForm formType={SignFormType.CHANGE_PASSWORD}/>
    );
}
