import '../App.css';

/**
 * Articles list element
 *
 * @param article entity
 * @returns articles list element
 */
export const ArticleListElement = ({article}) => {

    const navigateToArticlePage = () => {
        window.location.href = "/article/" + article.id;
    }

    return (
        <div className="article-list-element" onClick={navigateToArticlePage}>
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
