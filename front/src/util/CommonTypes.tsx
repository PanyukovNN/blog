export interface IArticle {
    id:                 string;
    header:             string;
    content:            string;
    creationDateTime?:  string;
}

export interface IArticlePage {
    content:    IArticle[];
    number:     number;
    size:       number;
    totalPages: number;
}

export interface ICreateUpdateArticleRequest {
    id      : string;
    header  : string;
    content : string;
}

export enum NotificationType {
    INFO    = "info",
    SUCCESS = "success",
    ERROR   = "danger"
}
