import '../App.css';
import React, {FC} from "react";
import parse from 'html-react-parser'
import {IArticle} from "../util/CommonTypes";
import {useNavigate} from "react-router-dom";

interface ArticleListElementProps {
    article: IArticle
}

/**
 * Articles list element.
 *
 * @param article entity
 * @returns articles list element
 */
export const ArticleListElement: FC<ArticleListElementProps> = ({article}) => {

    const navigate = useNavigate();

    const navigateToArticlePage = () => {
        navigate("/article/" + article.id, { replace: true });
    }

    return (
        <article className="article-list-element">
            <h1 className="article-list-element-header" onClick={navigateToArticlePage}>
                {article.header}
            </h1>

            <div className="article-list-element-top">
                <div className="article-list-element-creation-date-time">
                    {article.creationDateTime}
                </div>
            </div>

            <div className="article-list-element-description">
                {article.description ? parse(article.description) : ""}
            </div>

            <div className="article-list-element-continue-link" onClick={navigateToArticlePage}>
                Continue...
            </div>
        </article>
    )
}
