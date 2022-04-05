import '../App.css';
import {React, useState} from 'react'
import {useParams} from "react-router";
import Button from "react-bootstrap/Button";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import Spinner from "react-bootstrap/Spinner";

/**
 * Editor page
 *
 * @returns editor page
 */
export const ArticleEditor = () => {

    const urlParams = useParams();
    const articleId = urlParams.id;

    const [loading, setLoading] = useState(true);
    const [header, setHeader] = useState([]);
    const [text, setText] = useState("");

    const handleSave = () => {
        // реализовать
    }

    return (
        <div className="article-editor article-width">
            <input className="article-list-element-id" type={"hidden"} value={articleId}/>

            <input className="article-header" type="text" value={(newHeader) => setHeader(newHeader)} placeholder={"Заголовок"}/>

            {loading && (
                <Spinner className="editor-spinner" animation="border" />
            )}

            <Editor
                tinymceScriptSrc="https://unpkg.com/tinymce@5.10.3/tinymce.min.js"
                initialValue=""
                onEditorChange={(newText) => setText(newText)}
                onInit={() => {
                    setLoading(false);
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

            {!loading && (
                <Button className="save-btn mt-4"
                        variant="outline-primary"
                        onClick={handleSave}>
                    {articleId ? 'Обновить' : 'Сохранить'}
                </Button>
            )}
        </div>
    );
}
