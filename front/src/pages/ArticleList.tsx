import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {ArticleListElement} from "../components/ArticleListElement";
import Spinner from "react-bootstrap/Spinner";
import { fetchAllArticles } from '../service/ArticleService';
import { IArticle } from '../util/CommonTypes';

/**
 * Main page with articles list
 *
 * @returns main page
 */
export const ArticleList : FC = () => {

    const [articles, setArticles] = useState<IArticle[]>([]);
    const [articlesLoading, setArticlesLoading] = useState<boolean>(true);

    useEffect(
        () => {
            fetchAllArticles().then((response) => {
                setArticles(response);
                setArticlesLoading(false);
            })
        },
        []
    );

    const noArticlesElement = (
        <div className="article-list-element">Не найдено ни одной статьи</div>
    );

    return (
        <div className="articles-list article-width">
            {articlesLoading && (
                <Spinner className="editor-spinner" animation="border" />
            )}
            {!articlesLoading && articles.map(article =>
                <ArticleListElement article={article}/>
            )}

            {/* Если нет ни одной статьи, то отображаем пустой блок */}
            {!articlesLoading && articles.length === 0 && noArticlesElement}
        </div>
    );
}
