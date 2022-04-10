import '../App.css';
import React, {FC, useEffect, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Spinner from "react-bootstrap/Spinner";
import {fetchArticle, createUpdateArticle} from "../service/ArticleService";
import { EMPTY_ARTICLE } from '../util/Constants';
import { IArticle, ICreateUpdateArticleRequest } from '../util/CommonTypes';

/**
 * Editor page
 *
 * @returns editor page
 */
export const ArticleEditor: FC = () => {

    const urlParams = useParams() as any;

    const [text, setText] = useState<string>("");
    const [header, setHeader] = useState<string>("");
    const [article, setArticle] = useState<IArticle>(EMPTY_ARTICLE);
    const [articleId, setArticleId] = useState<string>(urlParams.id);
    const [editorLoading, setEditorLoading] = useState<boolean>(true);
    const [articleLoading, setArticleLoading] = useState<boolean>(true);

    useEffect(
        () => {
            if (!articleId) {
                setArticleLoading(false);

                return;
            }

            fetchArticle(articleId)
                .then((articleEntity) => {
                    setArticle(articleEntity);
                    setHeader(articleEntity.header);
                    setArticleLoading(false);
                });
        },
        []);

    const handleSave = () => {
        const createUpdateRequest: ICreateUpdateArticleRequest = {
            id: articleId ? articleId : "",
            header: header,
            content: text
        }

        createUpdateArticle(createUpdateRequest)
            .then((articleEntity) => {
                if (articleEntity === EMPTY_ARTICLE) {
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
        window.location.href = "/article/" + article.id;
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
                    {articleId ? 'Обновить' : 'Сохранить'}
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
