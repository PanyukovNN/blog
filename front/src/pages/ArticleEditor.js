import '../App.css';
import {React, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Spinner from "react-bootstrap/Spinner";
import {createUpdateArticleRequest, getArticlePromise} from "../service/ArticleService";
import {showAlert} from "../service/AlertService";

/**
 * Editor page
 *
 * @returns editor page
 */
export const ArticleEditor = () => {

    const urlParams = useParams();
    const [articleId, setArticleId] = useState(urlParams.id);

    const [articleLoading, setArticleLoading] = useState(true);
    const [editorLoading, setEditorLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [header, setHeader] = useState("");
    const [text, setText] = useState("");

    useEffect(
        () => {
            if (!articleId) {
                setArticleLoading(false);

                return;
            }

            getArticlePromise(articleId)
                .then((articleEntity) => {
                    setArticle(articleEntity);
                    setHeader(articleEntity.header);
                    setArticleLoading(false);
                });
        },
        []);

    const handleSave = () => {
        const body = {
            id: articleId ? articleId : null,
            header: header,
            content: text
        }

        createUpdateArticleRequest(body)
            .then((articleEntity) => {
                setArticle(articleEntity);
                setHeader(articleEntity.header);

                showAlert(articleId
                    ? "Статья успешно обновлена!"
                    : "Статья успешно создана!");

                if (!articleId) {
                    setArticleId(articleEntity.id);
                }
            })
    }

    return (
        <div className="article-editor article-width">
            <input className="article-list-element-id" type={"hidden"} value={articleId}/>

            {!editorLoading && <input className="article-header"
                   type="text"
                   onChange={(event) => setHeader(event.target.value)}
                   value={header}
                   placeholder={"Заголовок"}/>}

            {editorLoading && (
                <Spinner className="editor-spinner" animation="border" />
            )}

            <Editor
                tinymceScriptSrc="https://unpkg.com/tinymce@5.10.3/tinymce.min.js"
                initialValue={article.content}
                onEditorChange={(newText) => setText(newText)}
                disabled={articleLoading}
                onInit={() => {
                    setEditorLoading(false);
                }}
                init={{
                    height: 500,
                    max_height: 1000,
                    menubar: false,
                    branding: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code codesample fullscreen',
                        'insertdatetime media table paste help wordcount'
                    ],
                    toolbar1: 'undo redo | formatselect | ' +
                        'bold italic codesample backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

            {!editorLoading && (
                <Button className="save-btn mt-4"
                        variant="outline-primary"
                        onClick={handleSave}
                        disabled={articleLoading}>
                    {articleId ? 'Обновить' : 'Сохранить'}
                </Button>
            )}
        </div>
    );
}
