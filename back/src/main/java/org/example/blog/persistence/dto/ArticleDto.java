package org.example.blog.persistence.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.blog.persistence.entity.Article;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class ArticleDto {
    private String id;
    private String header;
    private String content;

    public ArticleDto(Article article) {
        this.id = article.getId();
        this.header = article.getHeader();
        this.content = article.getContent();
    }
}