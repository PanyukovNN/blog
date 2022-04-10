export interface IArticle {
    id:      string;
    header:  string;
    content: string;
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
