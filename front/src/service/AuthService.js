import axios from "axios";
import Cookies from 'universal-cookie';
import {AUTH_URL} from "../util/Constants";

const cookies = new Cookies();

/**
 * Запрос на регистрацию пользователя
 *
 * @param username имя пользователя
 * @param email почтовый ящик
 * @param password пароль
 * @param confirmPassword подтверждение пароля
 * @returns результат выполнения запроса
 */
export function signUp(username, email, password, confirmPassword) {
    return axios.post(AUTH_URL + "/sign-up", {
        username,
        email,
        password,
        confirmPassword
    });
}

/**
 * Запрос на аутентификаци
 *
 * @param email почтовый ящик
 * @param password пароль
 * @returns результат выполнения запроса
 */
export function signIn(email, password) {
    var expiresDate = new Date();
    var time = expiresDate.getTime();
    var expireTime = time + 15 * 24 * 60 * 60 * 1000;
    expiresDate.setTime(expireTime);

    return axios
        .post(AUTH_URL + "/sign-in", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                cookies.set("user", JSON.stringify(response.data.userDto),  {path: '/', expires: expiresDate });
                cookies.set("token", JSON.stringify(response.data.accessToken), { path: '/', expires: expiresDate });
            }

            return response;
        });
}

/**
 * Выход пользователя
 */
export function signOut() {
    cookies.remove("token");
    cookies.remove("user");

    window.location.reload();
}

/**
 * Аутентифицирован ли пользователь
 *
 * @returns {boolean} аутентифицирован ли пользователь
 */
export function isLoggedIn() {
    return getAccessToken() !== null;
}

/**
 * Получить токен доступа из локального хранилища.
 *
 * @returns {boolean} токен доступа
 */
export function getAccessToken() {
    const accessToken = cookies.get("token");

    return accessToken
        ? 'Bearer ' + accessToken
        : null;
}

/**
 * Взять данные о пользователе из локально хранилища
 *
 * @returns {boolean} пользователь
 */
export function getUser() {
    return cookies.get("user");
}
