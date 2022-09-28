package org.reactivetales.blog.persistence.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ArticleDto implements Serializable {

    private String id;
    private String header;
    private String content;
    private String creationDateTime;
}
