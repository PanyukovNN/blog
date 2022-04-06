import '../App.css';
import {React, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Spinner from "react-bootstrap/Spinner";
import {getReq, postReq} from "../service/RequestService";
import {BACK_URL} from "../Constants";

/**
 * Editor page
 *
 * @returns editor page
 */
export const ArticleEditor = () => {

    const urlParams = useParams();
    const articleId = urlParams.id;

    const [articleLoading, setArticleLoading] = useState(true);
    const [editorLoading, setEditorLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [header, setHeader] = useState("");
    const [text, setText] = useState("");

    useEffect(() => console.log(header), [header])

    useEffect(
        () => {
            if (!articleId) {
                setArticleLoading(false);

                return;
            }

            // TODO убрать дублирование c Article.js
            getReq(BACK_URL + "/article/" + articleId)
                .then((response) => {
                    if (response && response.data) {
                        return response.data;
                    }

                    return {};
                })
                .then((articleEntity) => {
                    setArticle(articleEntity);
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

        postReq(BACK_URL + "/article/create-update", body)
            .then((response) => {
                if (response && response.data) {
                    return response.data;
                }

                return {};
            })
            .then((articleEntity) => {
                setArticle(articleEntity);
                setHeader(articleEntity.header)
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
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar1: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat',
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
