import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Spinner from "react-bootstrap/Spinner";
import {fetchArticle, createUpdateArticle} from "../service/ArticleService";
import { IArticle, ICreateUpdateArticleRequest } from '../util/CommonTypes';

/**
 * Editor page
 *
 * @returns editor page
 */
export const ArticleEditor: FC = () => {

    const navigate = useNavigate();

    const urlParams = useParams() as any;

    // Содержание статьи
    const [text, setText] = useState<string>("");
    // Заголовок статьи
    const [header, setHeader] = useState<string>("");
    const [article, setArticle] = useState<IArticle | null>();
    const [articleId, setArticleId] = useState<string>(urlParams.id);
    // Флаг загрузки редактора
    const [editorLoading, setEditorLoading] = useState<boolean>(true);
    // Флаг загрузки статьи
    const [articleLoading, setArticleLoading] = useState<boolean>(true);
    // Флаг исполнения запроса сохранения/обновления статьи
    const [updatingLoading, setUpdatingLoading] = useState<boolean>(false);

    useEffect(
        () => {
            if (!articleId) {
                setArticleLoading(false);

                return;
            }

            fetchArticle(articleId)
                .then((articleEntity) => {
                    setArticleLoading(false);

                    if (articleEntity === null) {
                        return;
                    }

                    setArticle(articleEntity);
                    setHeader(articleEntity.header);
                });
        },
        []);

    const handleSave = () => {
        setUpdatingLoading(true);

        const createUpdateRequest: ICreateUpdateArticleRequest = {
            id: articleId ? articleId : "",
            header: header,
            content: text
        }

        createUpdateArticle(createUpdateRequest)
            .then((articleEntity) => {
                setUpdatingLoading(false);

                if (articleEntity === null) {
                    return;
                }

                setArticle(articleEntity);
                setHeader(articleEntity.header);

                if (!articleId) {
                    setArticleId(articleEntity.id);
                }
            })
    }

    const handleToArticle = () => {
        if (article) {
            navigate("/article/" + article.id, { replace: true });
        }
    }

    return (
        <div className="article-editor article-width">
            <input className="article-list-element-id" type={"hidden"} value={articleId}/>

            {!editorLoading && <h1>
                <input className="article-header"
                       type="text"
                       onChange={(event) => setHeader(event.target.value)}
                       value={header}
                       placeholder={"Заголовок"}/>
            </h1>}

            {editorLoading && (
                <Spinner className="editor-spinner" animation="border" />
            )}

            <Editor
                tinymceScriptSrc="https://unpkg.com/tinymce@5.10.3/tinymce.min.js"
                initialValue={article?.content}
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
                    style_formats: [
                        { title: 'Заголовок', block: 'h2'},
                        { title: 'Текст', format: 'p' },
                    ],
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code codesample fullscreen',
                        'insertdatetime media table paste help wordcount'
                    ],
                    toolbar1: 'undo redo | styleselect | ' +
                        'bold italic codesample backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent',
                    content_style: 'body { font-family:Fira Sans,sans-serif; font-size:14px } ' +
                        'h2 {font-size: 1.25rem; line-height: 1.625; font-weight: 500 }',
                }}
            />

            {!editorLoading && (
                <Button className="save-btn mt-4"
                        variant="outline-primary"
                        onClick={handleSave}
                        disabled={articleLoading}>
                    {updatingLoading && (<Spinner className="editor-spinner" animation="border" />)}
                    {!updatingLoading && articleId ? 'Обновить' : 'Сохранить'}
                </Button>
            )}

            {!editorLoading && articleId && (
                <Button className="editor-navigate-to-article-btn save-btn mt-4"
                        variant="outline-primary"
                        onClick={handleToArticle}
                        disabled={articleLoading}>
                    Перейти к статье
                </Button>
            )}
        </div>
    );
}
