package org.reactivetales.blog.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.persistence.entity.Article;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(target = "creationDateTime", expression = "java(org.reactivetales.blog.util.DateTimeUtil.FRONT_DT_FORMATTER.format(article.getCreationDateTime()))")
    ArticleDto articleToDto(Article article);
}
