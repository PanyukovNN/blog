package org.reactivetales.blog.repository;

import org.panyukovnn.reactiveadapter.ReactiveRepositoryAdapter;
import org.reactivetales.blog.persistence.entity.Article;
import org.springframework.stereotype.Service;
import reactor.core.scheduler.Schedulers;

@Service
public class ReactiveArticleRepository extends ReactiveRepositoryAdapter<Article, String> {

    public ReactiveArticleRepository(ArticleRepository crudRepository) {
        super(Schedulers.boundedElastic(), crudRepository);
    }
}
