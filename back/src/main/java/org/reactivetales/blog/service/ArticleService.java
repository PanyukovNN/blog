package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.model.request.CreateArticleRequest;
import org.reactivetales.blog.model.entity.Article;
import org.reactivetales.blog.repository.ArticleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

import static org.reactivetales.blog.util.Constants.ARTICLE_NOT_FOUND_ERROR;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private static final int DESCRIPTION_WORDS_COUNT = 50;

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
                .orElseThrow(() -> new EntityNotFoundException(ARTICLE_NOT_FOUND_ERROR));
    }

    public Article createOrUpdate(CreateArticleRequest createArticleRequest, TimeZone timeZone) {
        Article article = StringUtils.hasText(createArticleRequest.getId())
                ? articleRepository.getReferenceById(createArticleRequest.getId())
                : new Article();

        String description = prepareDescription(createArticleRequest.getPlainContent());

        article.setHeader(createArticleRequest.getHeader());
        article.setContent(createArticleRequest.getContent());
        article.setDescription(description);
        article.setCreationDateTime(ZonedDateTime.now(timeZone.toZoneId()).toLocalDateTime());
        articleRepository.save(article);

        return article;
    }

    public void delete(String id) {
        articleRepository.deleteById(id);
    }

    private String prepareDescription(String plainContent) {
        if (!StringUtils.hasText(plainContent)) {
            return "";
        }

        List<String> contentWords = Arrays.asList(plainContent.split(" "));

        String postfix = contentWords.size() > DESCRIPTION_WORDS_COUNT
                ? "..."
                : "";

        return contentWords.stream()
                .limit(DESCRIPTION_WORDS_COUNT)
                .collect(Collectors.joining(" ")) + postfix;
    }
}
