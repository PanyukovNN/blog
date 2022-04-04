package org.example.blog.service;

import lombok.RequiredArgsConstructor;
import org.example.blog.dto.CreateArticleRequest;
import org.example.blog.persistence.entity.Article;
import org.example.blog.persistence.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article getArticleById(String id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Сущность не существует!"));
    }

    public Article createOrUpdate(CreateArticleRequest createArticleRequest) {
        Article article = StringUtils.hasText(createArticleRequest.getId()) ?
                articleRepository.getById(createArticleRequest.getId())
                : new Article();

        article.setHeader(createArticleRequest.getTitle());
        article.setContent(createArticleRequest.getContent());
        articleRepository.save(article);

        return article;
    }

    public void delete(String id) {
        articleRepository.deleteById(id);
    }
}
