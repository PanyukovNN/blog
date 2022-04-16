package org.reactivetales.blog.persistence.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "article")
public class Article {

    @Id
    @Column(length = 40, name = "id")
    @GeneratedValue(generator = "uuid-gen")
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    private String id;

    /**
     * Article header.
     */
    @Column(length = 256, name = "header")
    private String header;

    /**
     * Article content.
     * Attribute columnDefinition="VARCHAR" is necessary for automatic creating timestamp column with no size limit.
     */
    @Column(columnDefinition="VARCHAR", name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "creation_date_time")
    private LocalDateTime creationDateTime;
}
