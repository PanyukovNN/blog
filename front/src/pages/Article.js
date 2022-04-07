import '../App.css';
import {React, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {deleteArticleRequest, getArticlePromise} from "../service/ArticleService";
import parse from "html-react-parser";

/**
 * Article page
 *
 * @returns article page
 */
export const Article = () => {

    const urlParams = useParams();
    const articleId = urlParams.id;

    const [renderedContent, setRenderedContent] = useState("")
    const [article, setArticle] = useState({});

    useEffect(
        () => {
            getArticlePromise(articleId)
                .then((articleEntity) => {
                    setArticle(articleEntity);
                    setRenderedContent(parse(articleEntity.content));
                });
        },
        [])


    const handleEdit = () => {
        window.location.href = "/editor/" + articleId;
    }

    const handleDelete = () => {
        let result = window.confirm("Вы уверены, что хотите удалить статью?");

        if (result) {
            deleteArticleRequest(articleId)
                .then(() => {
                    window.location.href = "/";
                })
        }
    }

    return (
        <div className="article article-width">
            <input className="article-list-element-id" type={"hidden"} value={articleId}/>

            <div className="article-control-btns-wrap">
                <Button variant="outline-primary" onClick={handleEdit}>Редактировать</Button>
                <Button variant="outline-danger" onClick={handleDelete}>Удалить</Button>
            </div>

            <div className="article-header">
                {article.header}
            </div>

            <div>
                {renderedContent}
            </div>
        </div>
    );
}
