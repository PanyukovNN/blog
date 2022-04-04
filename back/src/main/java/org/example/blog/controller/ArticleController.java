package org.example.blog.controller;

import lombok.RequiredArgsConstructor;
import org.example.blog.dto.CreateArticleRequest;
import org.example.blog.persistence.dto.ArticleDto;
import org.example.blog.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/articles")
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
     * @param createArticleDto createArticleDto.id - unique field for every article
     *                         createArticleDto.title - main header for article
     *                         createArticleDto.content - text for article
     * @return created or updated article
     */
    @PostMapping("/delete")
    public ArticleDto createOrUpdate(@RequestBody CreateArticleRequest createArticleDto) {
        return new ArticleDto(articleService.createOrUpdate(createArticleDto));
    }

    /**
     * @param id unique field of the article that has to be deleted
     */
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        articleService.delete(id);
    }
}
