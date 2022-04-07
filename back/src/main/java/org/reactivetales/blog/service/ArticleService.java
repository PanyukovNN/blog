package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.persistence.entity.Article;
import org.reactivetales.blog.repository.ArticleRepository;
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
                .orElseThrow(() -> new IllegalStateException("Article not found!"));
    }

    public Article createOrUpdate(CreateArticleRequest createArticleRequest) {
        Article article = StringUtils.hasText(createArticleRequest.getId())
                ? articleRepository.getById(createArticleRequest.getId())
                : new Article();

        article.setHeader(createArticleRequest.getHeader());
        article.setContent(createArticleRequest.getContent());
        articleRepository.save(article);

        return article;
    }

    public void delete(String id) {
        if (!articleRepository.existsById(id)) {
            throw new IllegalStateException("Article not found!");
        }

        articleRepository.deleteById(id);
    }
}
