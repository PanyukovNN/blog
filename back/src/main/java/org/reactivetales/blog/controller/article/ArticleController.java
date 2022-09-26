package org.reactivetales.blog.controller.article;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.service.ArticleService;
import org.reactivetales.blog.service.mapper.ArticleMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import static org.reactivetales.blog.util.Constants.DEFAULT_ARTICLE_PAGE_SIZE;

@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/article")
@Tag(name = "article", description = "article controller")
public class ArticleController {

    private final ArticleMapper articleMapper;
    private final ArticleService articleService;

    @GetMapping("/page")
    @Operation(summary = "get articles page")
    public Page<ArticleDto> page(@RequestParam(required = false, defaultValue = "0")
                                 @Min(value = 0, message = "Page number couldn't be less than 0")
                                 Integer number,
                                 @RequestParam(required = false, defaultValue = DEFAULT_ARTICLE_PAGE_SIZE)
                                 @Min(value = 1, message = "Page size couldn't be less than 1")
                                 @Max(value = 20, message = "Page size couldn't be grater than 1")
                                 Integer size) {
        return articleService.getArticlesPage(number, size)
                .map(articleMapper::convert);
    }

    @GetMapping("/{id}")
    @Operation(summary = "get article by id")
    @Cacheable(value = "articles", key = "#id")
    public ArticleDto get(@PathVariable(required = false) String id) {
        return articleMapper.convert(
                articleService.getArticleById(id)
        );
    }

    @PostMapping("/admin/create-update")
    @Operation(summary = "create or update article")
    @CachePut(value = "articles", key = "#result.id")
    public ArticleDto createOrUpdate(@RequestBody @Valid CreateArticleRequest createArticleRequest) {
        return articleMapper.convert(
                articleService.createOrUpdate(createArticleRequest)
        );
    }

    @DeleteMapping(value = "/admin/{id}")
    @Operation(summary = "delete article by id")
    @CacheEvict(value = "articles", key = "#id")
    public void delete(@PathVariable String id) {
        articleService.delete(id);
    }
}
