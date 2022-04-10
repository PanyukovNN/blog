import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {deleteArticle, fetchArticle} from "../service/ArticleService";
import parse from "html-react-parser";
import {EMPTY_ARTICLE} from "../util/Constants";
import {IArticle} from "../util/CommonTypes";
import Spinner from "react-bootstrap/Spinner";

/**
 * Article page
 *
 * @returns article page
 */
export const Article: FC = () => {

    const urlParams = useParams() as any;
    const articleId = urlParams.id;

    const [article, setArticle] = useState<IArticle>(EMPTY_ARTICLE);
    const [articleLoading, setArticleLoading] = useState<boolean>(true);

    useEffect(
        () => {
            fetchArticle(articleId)
                .then((articleEntity) => {
                    setArticleLoading(false);

                    if (articleEntity === EMPTY_ARTICLE) {
                        return;
                    }

                    setArticle(articleEntity);
                });
        },
        [])


    const handleEdit = () => {
        window.location.href = "/editor/" + articleId;
    }

    const handleDelete = () => {
        let result = window.confirm("Вы уверены, что хотите удалить статью?");

        if (!result) {
            return;
        }

        deleteArticle(articleId)
            .then(() => {
                window.location.href = "/";
            });
    }

    return (
        <div className="article article-width">
            {articleLoading && (
                <Spinner className="editor-spinner" animation="border" />
            )}

            <input className="article-list-element-id" type={"hidden"} value={articleId}/>

            {!articleLoading && <div className="article-control-btns-wrap">
                <Button variant="outline-primary" onClick={handleEdit}>Редактировать</Button>
                <Button variant="outline-danger" onClick={handleDelete}>Удалить</Button>
            </div>}

            <h1 className="article-header">
                {article.header}
            </h1>

            <div>
                {parse(article.content)}
            </div>
        </div>
    );
}
