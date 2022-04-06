import '../App.css';
import {React, useEffect, useState} from 'react'
import {ArticleListElement} from "../components/ArticleListElement";
import {getReq} from "../service/RequestService";
import {BACK_URL} from "../Constants";

/**
 * Main page with articles list
 *
 * @returns main page
 */
export const ArticleList = () => {

    const [articleListElements, setArticleListElements] = useState([]);

    useEffect(
        () => {
            getReq(BACK_URL + "/article/all")
                .then((response) => {
                    if (response && response.data) {
                        return response.data;
                    }

                    return [];
                })
                .then((articleListEntities) => {
                    let renderedArticleListElements = [];

                    articleListEntities.forEach(article =>
                        renderedArticleListElements.push(
                            <ArticleListElement article={article} />
                        )
                    )

                    setArticleListElements(renderedArticleListElements);
                })
        },
        []
    );

    return (
        <div className="articles-list article-width">
            {articleListElements}
        </div>
    );
}
