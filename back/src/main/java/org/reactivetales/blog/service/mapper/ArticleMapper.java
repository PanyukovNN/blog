package org.reactivetales.blog.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.reactivetales.blog.model.entity.Article;
import org.reactivetales.blog.model.response.ArticleResponse;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(target = "creationDateTime", dateFormat = "dd MMMM yyyy")
    ArticleResponse convert(Article article);
}
