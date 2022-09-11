package org.reactivetales.blog.persistence.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class CreateArticleRequest {

    private String id;
    @NotEmpty
    private String header;
    @NotEmpty
    private String content;
}
