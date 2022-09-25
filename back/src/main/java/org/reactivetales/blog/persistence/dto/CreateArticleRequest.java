package org.reactivetales.blog.persistence.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class CreateArticleRequest {

    private String id;
    @NotEmpty(message = "header can't be null")
    private String header;
    @NotEmpty(message = "content can't be null")
    private String content;
}
