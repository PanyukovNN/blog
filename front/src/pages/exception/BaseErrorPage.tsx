import React, {FC} from 'react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
    header: string,
    text: string
}

/**
 * Error page.
 *
 * @returns error page
 */
export const ErrorPage: FC<ErrorPageProps> = (props) => {

    return (
        <div className="content">
            <div className="exception-page-text-wrap">
                <h1 className="exception-page-header">{props.header}</h1>
                <h2>{props.text}</h2>
                <Link className="exception-page-back-to-home-link" to="/">на главную</Link>
            </div>
        </div>
    );
}
