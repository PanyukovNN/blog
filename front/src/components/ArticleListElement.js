import '../App.css';
import Button from "react-bootstrap/Button";
import {React} from "react";

/**
 * Articles list element
 *
 * @param article entity
 * @returns articles list element
 */
export const ArticleListElement = ({article}) => {

    const navigateToArticlePage = () => {
        window.location.href = "/article/" + article.id;
    }

    return (
        <div className="article-list-element">
            <input className="article-list-element-id" type={"hidden"} value={article.id}/>

            <div className="article-list-element-header" onClick={navigateToArticlePage}>
                {article.header}
            </div>

            <div className="article-list-element-description">
                {article.content}
            </div>

            <Button className="article-list-element-read-more-btn"
                    variant="outline-primary"
                    onClick={navigateToArticlePage}>
                Читать
            </Button>
        </div>
    )
}
