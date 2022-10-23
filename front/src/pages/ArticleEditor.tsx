import '../App.css';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {createUpdateArticle, fetchArticle} from "../service/ArticleService";
import {IArticle, ICreateUpdateArticleRequest} from '../util/CommonTypes';
import {Editor} from "@tinymce/tinymce-react";

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
    // Содержание статьи без html тегов, используется для генерации description
    const [plainText, setPlainText] = useState<string>("");
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
                    setText(articleEntity.content);
                });
        },
        []);

    const handleSave = () => {
        setUpdatingLoading(true);

        const createUpdateRequest: ICreateUpdateArticleRequest = {
            id: articleId ? articleId : "",
            header: header,
            content: text,
            plainContent: plainText
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
            navigate("/article/" + article.id, {replace: true});
        }
    }

    /**
     * Sets header value and autosize height of textarea
     *
     * @param e textarea component
     */
    function handleChangeTextarea(e: any) {
        setHeader(e.target.value)

        e.target.style.height = 'inherit';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    return (
        <div className="article-editor article-width">
            {!editorLoading && <h1>
                <textarea className="article-header"
                          onChange={(e) => handleChangeTextarea(e)}
                          value={header}
                          placeholder={"Заголовок"}/>
            </h1>}

            {editorLoading && (
                <Spinner className="editor-spinner" animation="border"/>
            )}

            <Editor
                initialValue={article?.content}
                onEditorChange={(newText, editor) => {
                    setPlainText(editor.getBody().textContent as string);
                    setText(newText)
                }}
                disabled={articleLoading}
                onInit={(event, editor) => {
                    setEditorLoading(false);
                    setPlainText(editor.getBody().textContent as string);
                }}
                init={{
                    init_instance_callback: function (editor) { // removes warning
                        var freeTiny = document.querySelector('.tox .tox-notification--in') as any;
                        freeTiny.style.display = 'none';
                    },
                    height: 500,
                    max_height: 1000,
                    menubar: false,
                    branding: false,
                    style_formats: [
                        {title: 'Заголовок', block: 'h2'},
                        {title: 'Текст', format: 'p'},
                    ],
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code codesample fullscreen',
                        'insertdatetime media table paste help wordcount importcss'
                    ],
                    toolbar1: 'undo redo | styleselect | ' +
                        'bold italic codesample backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent',
                    content_style:
                        'h2 {' +
                        '    font-size: 1.25rem !important;' +
                        '    line-height: 1.625 !important;' +
                        '    font-weight: 500 !important;' +
                        '    margin: 0 !important;' +
                        '}' +
                        'hr {' +
                        '    margin: 0 !important;' +
                        '    display: flex !important;' +
                        '}' +
                        '.section-divider {' +
                        '    color: transparent;' +
                        '    text-align: center;' +
                        '    font-size: 50px;' +
                        '    position: relative;' +
                        '' +
                        '    height: 120px;' +
                        '}' +
                        '.section-divider::after {' +
                        '    content: "";' +
                        '    position: absolute;' +
                        '    width: .10em;' +
                        '    height: .10em;' +
                        '    border-radius: 50%;' +
                        '    background: #a7b0b8;' +
                        '    bottom: 58px;' +
                        '    left: 50%;' +
                        '    transform: translateX(-50%);' +
                        '    filter: drop-shadow(.6em 0px 0px #a7b0b8)' +
                        '    drop-shadow(-.6em 0px 0px #a7b0b8)' +
                        '}'
                }}
            />

            {!editorLoading && (
                <Button className="save-btn mt-4"
                        variant="outline-primary"
                        onClick={handleSave}
                        disabled={articleLoading}>
                    {updatingLoading && (<Spinner className="editor-spinner" size="sm" animation="border"/>)}
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
