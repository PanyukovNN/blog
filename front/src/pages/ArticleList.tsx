import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {ArticleListElement} from "../components/ArticleListElement";
import Spinner from "react-bootstrap/Spinner";
import {fetchArticlesPage} from '../service/ArticleService';
import {IArticlePage} from '../util/CommonTypes';
import {renderPagination} from "../util/PaginationUtil";
import {useNavigate} from "react-router";
import {DEFAULT_ARTICLES_PAGE_SIZE} from "../util/Constants";

/**
 * Main page with articles list
 *
 * @returns main page
 */
export const ArticleList : FC = () => {

    const navigate = useNavigate();

    // Only way, which makes it possible to extract named url params, for example /?number=0&size=5
    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get("number") as any;
    const pageSize = urlParams.get("size") as any;

    const [articlesPage, setArticlesPage] = useState<IArticlePage | null>();
    const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState() as any;

    useEffect(
        () => {
            fetchArticlesPage(pageNumber, pageSize).then((articlePage) => {
                setArticlesLoading(false);

                if (articlePage === null) {
                    return;
                }

                setArticlesPage(articlePage);
                setPagination(renderPagination(articlePage.number, articlePage.totalPages, onPageChange));
            })
        },
        [pageNumber, pageSize]
    );

    const noArticlesElement = (
        <div className="article-list-element">Не найдено ни одной статьи</div>
    );

    const onPageChange = (number: number) => {
        navigate("/?number=" + number + "&size=" + DEFAULT_ARTICLES_PAGE_SIZE, { replace: false });
    }

    return (
        <div className="articles-list article-width">
            {articlesLoading && (
                <Spinner className="editor-spinner" animation="border" />
            )}
            {!articlesLoading && articlesPage?.content.map(article =>
                <ArticleListElement article={article}/>
            )}

            {!articlesLoading && pagination}

            {/* Если нет ни одной статьи, то отображаем пустой блок */}
            {!articlesLoading && articlesPage?.content.length === 0 && noArticlesElement}
        </div>
    );
}
