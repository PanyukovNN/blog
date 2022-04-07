import {deleteReq, getReq, postReq} from "./RequestService";
import {BACK_URL} from "../Constants";
import {React} from "react";

export function getAllArticlesPromise() {
    return getReq(BACK_URL + "/article/all")
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return [];
        });
}

export function getArticlePromise(id) {
    return getReq(BACK_URL + "/article/" + id)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return {};
        });
}

export function createUpdateArticleRequest(body) {
    return postReq(BACK_URL + "/article/create-update", body)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return {};
        });
}

export function deleteArticleRequest(id) {
    return deleteReq(BACK_URL + "/article/" + id)
        .then((response) => {
            if (response && response.data) {
                return response.data;
            }

            return {};
        });
}
