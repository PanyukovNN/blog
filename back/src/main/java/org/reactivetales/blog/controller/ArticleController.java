package org.reactivetales.blog.controller;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.service.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import static org.reactivetales.blog.util.Constants.DEFAULT_ARTICLE_PAGE_SIZE;

@Validated
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/article")
public class ArticleController {

    private final ArticleService articleService;

    /**
     * @return articles page
     */
    @GetMapping("/page")
    public Page<ArticleDto> page(@RequestParam(required = false, defaultValue = "0")
                                 @Min(value = 0, message = "Page number couldn't be less than 0")
                                 Integer number,
                                 @RequestParam(required = false, defaultValue = DEFAULT_ARTICLE_PAGE_SIZE)
                                 @Min(value = 1, message = "Page size couldn't be less than 1")
                                 @Max(value = 20, message = "Page size couldn't be grater than 1")
                                 Integer size) {
        return articleService.getArticlesPage(number, size)
                .map(articleService::convertToDto);
    }

    /**
     * @param id - unique field for every article
     * @return required article
     */
    @GetMapping("/{id}")
    public ArticleDto get(@PathVariable(required = false) String id) {
        return articleService.convertToDto(
                articleService.getArticleById(id)
        );
    }

    /**
     * @param createArticleRequest request
     * @return created or updated article
     */
    @PostMapping("/create-update")
    public ArticleDto createOrUpdate(@RequestBody CreateArticleRequest createArticleRequest) {
        return articleService.convertToDto(
                articleService.createOrUpdate(createArticleRequest)
        );
    }

    /**
     * @param id unique field of the article that has to be deleted
     */
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        articleService.delete(id);
    }
}
