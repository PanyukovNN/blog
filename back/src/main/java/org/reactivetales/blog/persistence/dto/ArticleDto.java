package org.reactivetales.blog.persistence.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArticleDto {

    private String id;
    private String header;
    private String content;
    private String creationDateTime;
}
