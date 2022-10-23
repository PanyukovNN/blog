package org.reactivetales.blog.model.response;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ArticleResponse implements Serializable {

    private String id;
    private String header;
    private String content;
    private String description;
    private String creationDateTime;
}
