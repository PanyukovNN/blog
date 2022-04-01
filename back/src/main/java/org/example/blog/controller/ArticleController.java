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
@RequestMapping("/api/v1/article")
public class ArticleController {
    private final ArticleRepository articleRepository;

    @GetMapping("/all")
    public List<ArticleDto> all() {
        return articleRepository.findAll().stream()
                .map(ArticleDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping(value = "/create-update/{id}")
    public ArticleDto createOrUpdate(@PathVariable(required = false) String id,
                                     CreateArticleRequest createArticleDto) {
        Article article = null;

        if (StringUtils.hasText(id)) {
            article = articleRepository.findById(id).get();
        } else {
            article = new Article();
        }

        article.setHeader(createArticleDto.getTitle());
        article.setContent(createArticleDto.getContent());

        return new ArticleDto(article);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void delete(@PathVariable String id) {
        articleRepository.deleteById(id);
    }

}
