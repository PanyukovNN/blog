import axios from "axios";
import {IArticle, IArticlePage, ICreateUpdateArticleRequest, NotificationType} from "../util/CommonTypes";
import {BACK_URL, DEFAULT_ARTICLES_PAGE_SIZE} from "../util/Constants";
import {showNotification} from "./NotificationService";
import {getAccessToken} from "./AuthService";

export async function fetchArticlesPage(pageNumber?: number, pageSize?: number) {
    try {
        const params = {
            number: pageNumber ? pageNumber : "0",
            size: pageSize ? pageSize : DEFAULT_ARTICLES_PAGE_SIZE
        }

        const response = await axios.get<IArticlePage>(BACK_URL + "/article/page",
            {
                params: params,
                headers : {'Content-Type': 'application/json'}
            })

        return response.data;
    } catch (error) {
        processError(error);

        return null;
    }
}

export async function fetchArticle(id: string) {
    try {
        const response = await axios.get<IArticle>(BACK_URL + "/article/" + id,
            { headers : {'Content-Type': 'application/json'} })

        return response.data;
    } catch (error) {
        processError(error);

        return null;
    }
}

export async function createUpdateArticle(createUpdateRequest: ICreateUpdateArticleRequest) {
    try {
        const response = await axios.post<IArticle>(
            BACK_URL + "/article/admin/create-update",
            JSON.stringify(createUpdateRequest),
            { headers : {'Content-Type': 'application/json'} }
        );

        let message = createUpdateRequest.id
            ? "Статья успешно обновлена!"
            : "Статья успешно создана!";
        showNotification(message, NotificationType.SUCCESS);

        return response.data;
    } catch (error) {
        processError(error);

        return null;
    }
}

export async function deleteArticle(id: string) {
    try {
        const response = await axios.delete<IArticle>(BACK_URL + "/article/admin/" + id,
            { headers : {'Content-Type': 'application/json'} })

        return response.data;
    } catch (error) {
        processError(error);

        return null;
    }
}

function processError(error: any) {
    let isErrorInstance = error instanceof Error;

    let message;
    if (isErrorInstance) {
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
        } else {
            message = error.message;
        }
    } else {
        message = 'Unknown Error';
    }

    if (message === "Network Error") {
        window.location.href = "/network-error";

        return;
    }

    showNotification(message, NotificationType.ERROR);
}
