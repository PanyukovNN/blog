import '../App.css';
import {React, useEffect, useState} from 'react'
import {ArticleListElement} from "../components/ArticleListElement";
import Spinner from "react-bootstrap/Spinner";
import {getAllArticlesPromise} from "../service/ArticleService";

/**
 * Main page with articles list
 *
 * @returns main page
 */
export const ArticleList = () => {

    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articleListElements, setArticleListElements] = useState([]);

    useEffect(
        () => {
            getAllArticlesPromise()
                .then((articleListEntities) => {
                    const renderedArticleListElements = articleListEntities.map(
                        article => <ArticleListElement article={article} />
                    );

                    if (articleListEntities.length !== 0) {
                        setArticleListElements(renderedArticleListElements);
                    } else {
                        setArticleListElements(noArticlesElement);
                    }

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
            {!articlesLoading && articleListElements}
        </div>
    );
}
