import React, {FC} from 'react';
import {ErrorPage} from "./BaseErrorPage";

/**
 * Server unavailable exception page.
 *
 * @returns server unavailable exception page
 */
export const NetworkErrorPage: FC = () => {

    return (
        <ErrorPage
            header="Oops..."
            text="В настоящее время сервер недоступен, попробуйте подключиться позднее"/>
    );
}
