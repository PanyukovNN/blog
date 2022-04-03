import '../App.css';

/**
 * Элемент списка статей на главной странице
 *
 * @param article сущность статьи
 * @returns элемент списка статей
 */
export const ArticleListElement = ({article}) => {

    return (
        <div className={"article-list-element"}>
            <input className="article-list-element-id" type={"hidden"} value={article.id}/>

            <div className="article-list-element-header">
                {article.header}
            </div>

            <div className="article-list-element-description">
                {article.description}
            </div>
        </div>
    )
}
