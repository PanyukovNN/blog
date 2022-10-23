export interface IArticle {
    id:                 string;
    header:             string;
    content:            string;
    description:        string;
    creationDateTime?:  string;
}

export interface IArticlePage {
    content:    IArticle[];
    number:     number;
    size:       number;
    totalPages: number;
}

export interface ICreateUpdateArticleRequest {
    id           : string;
    header       : string;
    content      : string;
    plainContent : string;
}

export enum NotificationType {
    INFO    = "info",
    SUCCESS = "success",
    ERROR   = "danger"
}

export enum SignFormType {
    UPDATE_ADMIN,
    CHANGE_PASSWORD,
    SIGN_IN
}
