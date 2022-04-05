import '../App.css';
import {React, useEffect, useState} from 'react'
import {ArticleListElement} from "../components/ArticleListElement";

/**
 * Main page with articles list
 *
 * @returns main page
 */
export const ArticleList = () => {

    const articleListEntities = [
        {id: 1, header: "Заголовок 1", description: "Описание 1"},
        {id: 2, header: "Заголовок 2", description: "Описание 2"},
        {id: 3, header: "Заголовок 3", description: "Описание 3"}
    ];
    const [articleListElements, setArticleListElements] = useState([]);

    useEffect(
        () => {
            let renderedArticleListElements = [];

            articleListEntities.forEach(article =>
                renderedArticleListElements.push(
                    renderArticleListElement(article)
                )
            )

            setArticleListElements(renderedArticleListElements);
        },
        []
    );

    const renderArticleListElement = (article) => {
        return (
            <ArticleListElement article={article} />
        );
    }

    return (
        <div className="articles-list article-width">
            {articleListElements}
        </div>
    );
}
