package org.reactivetales.blog.controller.article;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.model.request.CreateArticleRequest;
import org.reactivetales.blog.model.response.ArticleResponse;
import org.reactivetales.blog.service.ArticleService;
import org.reactivetales.blog.service.mapper.ArticleMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.TimeZone;

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
    @Cacheable(value = "articlePage")
    public Page<ArticleResponse> page(@RequestParam(required = false, defaultValue = "0")
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
    public ArticleResponse get(@PathVariable(required = false) String id) {
        return articleMapper.convert(
                articleService.getArticleById(id)
        );
    }

    @PostMapping("/admin/create-update")
    @Operation(summary = "create or update article")
    @CachePut(value = "articles", key = "#result.id")
    @CacheEvict(value = "articlePage", allEntries = true)
    public ArticleResponse createOrUpdate(@RequestBody @Valid CreateArticleRequest createArticleRequest,
                                          TimeZone timeZone) {
        return articleMapper.convert(
                articleService.createOrUpdate(createArticleRequest, timeZone)
        );
    }

    @DeleteMapping(value = "/admin/{id}")
    @Operation(summary = "delete article by id")
    @Caching(evict = {
            @CacheEvict(value = "articles", key = "#id"),
            @CacheEvict(value = "articlePage", allEntries = true)
    })
    public void delete(@PathVariable String id) {
        articleService.delete(id);
    }
}
