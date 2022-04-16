package org.reactivetales.blog.persistence.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.reactivetales.blog.persistence.entity.Article;
import org.reactivetales.blog.util.DateTimeUtil;

@Data
@NoArgsConstructor
public class ArticleDto {
    private String id;
    private String header;
    private String content;

    private String creationDateTime;

    public ArticleDto(Article article) {
        this.id = article.getId();
        this.header = article.getHeader();
        this.content = article.getContent();

        if (article.getCreationDateTime() != null) {
            this.creationDateTime = DateTimeUtil.FRONT_DT_FORMATTER.format(article.getCreationDateTime());
        }
    }
}
