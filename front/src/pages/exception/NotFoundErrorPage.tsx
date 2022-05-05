import React, {FC} from 'react';
import {ErrorPage} from "./BaseErrorPage";

/**
 * Not found exception page.
 *
 * @returns Not found exception page
 */
export const NotFoundErrorPage: FC = () => {

    return (
        <ErrorPage
            header="404"
            text="Страница не найдена"/>
    );
}
