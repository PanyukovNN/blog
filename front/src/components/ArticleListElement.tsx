import '../App.css';
import React, {FC} from "react";
import parse from 'html-react-parser'
import Button from "react-bootstrap/Button";
import {IArticle} from "../util/CommonTypes";

interface ArticleListElementProps {
    article: IArticle
}

/**
 * Articles list element
 *
 * @param article entity
 * @returns articles list element
 */
export const ArticleListElement: FC<ArticleListElementProps> = ({article}) => {

    const navigateToArticlePage = () => {
        window.location.href = "/article/" + article.id;
    }

    return (
        <div className="article-list-element">
            <input className="article-list-element-id" type={"hidden"} value={article.id}/>

            <h1 className="article-list-element-header" onClick={navigateToArticlePage}>
                {article.header}
            </h1>

            <div className="article-list-element-description">
                {parse(article.content)}
            </div>

            <Button className="article-list-element-read-more-btn"
                    variant="outline-primary"
                    onClick={navigateToArticlePage}>
                Читать
            </Button>
        </div>
    )
}
