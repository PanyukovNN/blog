import '../App.css';
import {React} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";

/**
 * Article page
 *
 * @returns article page
 */
export const Article = () => {

    const urlParams = useParams();
    const articleId = urlParams.id;

    const articleContent = "Здесь будет красивое содержание статьи"

    const article = {id: 1, header: "Заголовок " + articleId, content: articleContent};

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
