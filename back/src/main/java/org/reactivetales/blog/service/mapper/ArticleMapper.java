package org.reactivetales.blog.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.persistence.entity.Article;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(target = "creationDateTime", dateFormat = "dd MMMM yyyy")
    ArticleDto convert(Article article);
}
