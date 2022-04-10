import axios from "axios";
import {IArticle, ICreateUpdateArticleRequest, NotificationType } from "../util/CommonTypes";
import {BACK_URL, EMPTY_ARTICLE} from "../util/Constants";
import {showNotification} from "./NotificationService";

export async function fetchAllArticles() {
    try {
        const response = await axios.get<IArticle[]>(BACK_URL + "/article/all",
            { headers : {'Content-Type': 'application/json'} })

        return response.data;
    } catch (error) {
        processError(error);

        return [];
    }
}

export async function fetchArticle(id: string) {
    try {
        const response = await axios.get<IArticle>(BACK_URL + "/article/" + id,
            { headers : {'Content-Type': 'application/json'} })

        return response.data;
    } catch (error) {
        processError(error);

        return EMPTY_ARTICLE;
    }
}

export async function createUpdateArticle(createUpdateRequest: ICreateUpdateArticleRequest) {
    try {
        const response = await axios.post<IArticle>(
            BACK_URL + "/article/create-update",
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

        return EMPTY_ARTICLE;
    }
}

export async function deleteArticle(id: string) {
    try {
        const response = await axios.delete<IArticle>(BACK_URL + "/article/" + id,
            { headers : {'Content-Type': 'application/json'} })

        return response.data;
    } catch (error) {
        processError(error);

        return EMPTY_ARTICLE;
    }
}

function processError(error: any) {
    let message = error instanceof Error ? error.message : 'Unknown Error';

    if (message === "Network Error") {
        window.location.href = "/network-error";

        return;
    }

    showNotification(message, NotificationType.ERROR);
}
