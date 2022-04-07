import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Not found exception page
 *
 * @returns Not found exception page
 */
export const NotFoundPage = () => {
    return (
        <div className="exception-page-wrap">
            <div className="exception-page-text-wrap">
                <h1 className="exception-page-header">404</h1>
                <h2>Страница не найдена</h2>
                <Link className="exception-page-back-to-home-link" to="/">на главную</Link>
            </div>
        </div>
    );
}
