import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {deleteArticle, fetchArticle} from "../service/ArticleService";
import parse from "html-react-parser";
import {IArticle} from "../util/CommonTypes";
import Spinner from "react-bootstrap/Spinner";

/**
 * Article page
 *
 * @returns article page
 */
export const Article: FC = () => {

    const navigate = useNavigate();

    const urlParams = useParams() as any;
    const articleId = urlParams.id;

    const [article, setArticle] = useState<IArticle | null>();
    const [articleLoading, setArticleLoading] = useState<boolean>(true);

    useEffect(
        () => {
            fetchArticle(articleId)
                .then((articleEntity) => {
                    setArticleLoading(false);

                    if (articleEntity === null) {
                        return;
                    }

                    setArticle(articleEntity);
                });
        },
        [])


    const handleEdit = () => {
        navigate("/editor/" + articleId,{ replace: true });
    }

    const handleDelete = () => {
        let result = window.confirm("Вы уверены, что хотите удалить статью?");

        if (!result) {
            return;
        }

        deleteArticle(articleId)
            .then(() => {
                navigate("/",{ replace: true });
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
                {article?.header}
            </h1>

            <div>
                {article ? parse(article.content) : ""}
            </div>
        </div>
    );
}
