import '../App.css';
import {React, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {getReq} from "../service/RequestService";
import {BACK_URL} from "../Constants";

/**
 * Article page
 *
 * @returns article page
 */
export const Article = () => {

    const urlParams = useParams();
    const articleId = urlParams.id;

    const [article, setArticle] = useState({});

    useEffect(
        () => {
            getReq(BACK_URL + "/article/" + articleId)
                .then((response) => {
                    if (response && response.data) {
                        return response.data;
                    }

                    return {};
                })
                .then((articleEntity) => {
                    setArticle(articleEntity);
                });
        },
        [])


    const handleEdit = () => {
        window.location.href = "/editor/" + articleId;
    }

    const handleDelete = () => {
        let result = window.confirm("Вы уверены, что хотите удалить статью?");

        if (result) {
            // реализовать
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
                {article.content}
            </div>
        </div>
    );
}
