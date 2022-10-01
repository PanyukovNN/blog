import '../../App.css';
import React from "react";
import {SignForm} from "../../components/auth/SignForm";
import {SignFormType} from "../../util/CommonTypes";

/**
 * Update admin information page
 *
 * @returns update admin page
 */
export const UpdateAdminPage = () => {

    return (
        <SignForm formType={SignFormType.UPDATE_ADMIN}/>
    );
}
