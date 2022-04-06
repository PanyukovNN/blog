import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Страница ошибки 404
 *
 * @returns страница ошибки 404
 */
export const NotFoundPage = () => {
    return (
        <>
            <div className="content"/> {/* Данный тег необходим для корректного отображения футера внизу страницы */}
            <div className="exception-page-wrap">
                <div className="exception-page-text-wrap">
                    <h1 className="exception-page-header">404</h1>
                    <h2>Страница не найдена</h2>
                    <Link className="exception-page-back-to-home-link" to="/">на главную</Link>
                </div>
            </div>
        </>
    );
}
