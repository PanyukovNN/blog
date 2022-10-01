import '../../App.css';
import React from "react";
import {SignForm} from "../../components/auth/SignForm";
import {SignFormType} from "../../util/CommonTypes";

/**
 * Страница регистрации нового пользователя
 *
 * @returns страница регистрации
 */
export const UpdateAdminPage = () => {

    return (
        <SignForm formType={SignFormType.UPDATE_ADMIN}/>
    );
}
