package org.reactivetales.blog.persistence.dto;

import lombok.Data;

@Data
public class CreateArticleRequest {
    private String id;
    private String header;
    private String content;
}
