package org.reactivetales.blog.persistence.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

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

    @Column(length = 256, name = "header")
    private String header;

    @Column(length = Integer.MAX_VALUE, name = "content")
    private String content;
}
