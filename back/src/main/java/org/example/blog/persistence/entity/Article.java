package org.example.blog.persistence.entity;

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
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    private String id;

    @Column(length = 32, name = "header")
    private String header;

    @Column(name = "content")
    private String content;
}
