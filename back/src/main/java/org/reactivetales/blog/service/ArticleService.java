package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.ArticleDto;
import org.reactivetales.blog.persistence.dto.CreateArticleRequest;
import org.reactivetales.blog.persistence.entity.Article;
import org.reactivetales.blog.repository.ArticleRepository;
import org.reactivetales.blog.util.DateTimeUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    /**
     * Get sorted articles page.
     *
     * @param number page number
     * @param size page size
     * @return articles page
     */
    public Page<Article> getArticlesPage(int number, int size) {
        Pageable pageable = PageRequest.of(number, size, Sort.by(Sort.Direction.DESC, "creationDateTime"));

        return articleRepository.findAll(pageable);
    }

    public Article getArticleById(String id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Article not found"));
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
            throw new IllegalStateException("Article not found");
        }

        articleRepository.deleteById(id);
    }

    public ArticleDto convertToDto(Article article) {
        Objects.requireNonNull(article, "Article can't be null");

        ArticleDto.ArticleDtoBuilder articleDtoBuilder = ArticleDto.builder()
                .id(article.getId())
                .header(article.getHeader())
                .content(article.getContent());

        if (article.getCreationDateTime() != null) {
            articleDtoBuilder.creationDateTime(DateTimeUtil.FRONT_DT_FORMATTER.format(article.getCreationDateTime()));
        }

        return articleDtoBuilder.build();
    }
}
