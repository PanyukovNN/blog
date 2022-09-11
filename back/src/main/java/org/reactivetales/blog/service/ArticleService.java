package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.persistence.entity.Article;
import org.reactivetales.blog.repository.ArticleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;

import static org.reactivetales.blog.util.Constants.USER_NOT_FOUND_ERROR;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    /**
     * Get sorted articles page.
     *
     * @param number page number
     * @param size   page size
     * @return articles page
     */
    public Page<Article> getArticlesPage(int number, int size) {
        Pageable pageable = PageRequest.of(number, size, Sort.by(Sort.Direction.DESC, "creationDateTime"));

        return articleRepository.findAll(pageable);
    }

    public Article getArticleById(String id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_ERROR));
    }

    public Article createOrUpdate(CreateArticleRequest createArticleRequest) {
        Article article = StringUtils.hasText(createArticleRequest.getId())
                ? articleRepository.getReferenceById(createArticleRequest.getId())
                : new Article();

        article.setHeader(createArticleRequest.getHeader());
        article.setContent(createArticleRequest.getContent());
        articleRepository.save(article);

        return article;
    }

    public void delete(String id) {
        articleRepository.deleteById(id);
    }
}
