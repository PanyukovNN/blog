package org.reactivetales.blog.controller;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/article")
public class ArticleController {

    private final ArticleService articleService;

    /**
     * @return all articles from the system
     */
    @GetMapping("/all")
    public List<ArticleDto> all() {
        return articleService.getAllArticles().stream()
                .map(ArticleDto::new)
                .collect(Collectors.toList());
    }

    /**
     * @param id - unique field for every article
     * @return required article
     */
    @GetMapping("/{id}")
    public ArticleDto get(@PathVariable(required = false) String id) {
        return new ArticleDto(articleService.getArticleById(id));
    }

    /**
     * @param createArticleRequest createArticleRequest.id - unique field for every article
     *                             createArticleRequest.title - main header for article
     *                             createArticleRequest.content - text for article
     * @return created or updated article
     */
    @PostMapping("/create-update")
    public ArticleDto createOrUpdate(@RequestBody CreateArticleRequest createArticleRequest) {
        return new ArticleDto(articleService.createOrUpdate(createArticleRequest));
    }

    /**
     * @param id unique field of the article that has to be deleted
     */
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        articleService.delete(id);
    }
}
