package org.example.blog.dto;

import lombok.Data;

@Data
public class CreateArticleRequest {
    private String title;
    private String content;
}
