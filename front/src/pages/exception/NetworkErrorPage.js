import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Страница ошибки отсутствия соединения с сервером
 *
 * @returns страница ошибки отсутствия соединения с сервером
 */
export const NetworkErrorPage = () => {
    return (
        <>
            <div className="content"/> {/* Данный тег необходим для корректного отображения футера внизу страницы */}
            <div className="exception-page-wrap">
                <div className="exception-page-text-wrap">
                    <h1 className="exception-page-header">Oops...</h1>
                    <h2>В настоящее время сервер недоступен, попробуйте подключиться позднее</h2>
                    <Link className="exception-page-back-to-home-link" to="/">на главную</Link>
                </div>
            </div>
        </>
    );
}
