package org.example.blog.controller;

import lombok.RequiredArgsConstructor;
import org.example.blog.dto.CreateArticleRequest;
import org.example.blog.persistence.dto.ArticleDto;
import org.example.blog.persistence.entity.Article;
import org.example.blog.persistence.repository.ArticleRepository;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/articles")
public class ArticleController {
    private final ArticleRepository articleRepository;

    @GetMapping("/all")
    public List<ArticleDto> all() {
        return articleRepository.findAll().stream()
                .map(ArticleDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ArticleDto get(@PathVariable(required = false) String id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new IllegalStateException("Сущность не существует!"));
        return new ArticleDto(article);
    }

    @PostMapping()
    public ArticleDto createOrUpdate(@RequestBody CreateArticleRequest createArticleDto) {
        Article article = StringUtils.hasText(createArticleDto.getId()) ?
                articleRepository.getById(createArticleDto.getId())
                : new Article();

        article.setHeader(createArticleDto.getTitle());
        article.setContent(createArticleDto.getContent());

        articleRepository.save(article);

        return new ArticleDto(article);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        articleRepository.deleteById(id);
    }

}
