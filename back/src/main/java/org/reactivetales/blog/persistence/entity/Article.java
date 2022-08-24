package org.reactivetales.blog.persistence.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(generator = "uuid-gen")
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    private String id;

    /**
     * Article header.
     */
    private String header;

    /**
     * Article content.
     * Attribute columnDefinition="VARCHAR" is necessary for automatic creating timestamp column with no size limit.
     */
    @Column(columnDefinition="VARCHAR")
    private String content;

    private LocalDateTime creationDateTime;
}
