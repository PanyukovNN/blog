import axios from "axios";
import Cookies from 'universal-cookie';
import {AUTH_URL} from "../util/Constants";

const cookies = new Cookies();

/**
 * Admin update
 *
 * @param email admin email
 * @returns response
 */
export function updateAdmin(email : string) {
    return axios.post<any>(AUTH_URL + "/update-admin", { email },
        { headers : {"Authorization" : getAccessToken()} })
        .then(() => {
            signOut();
        });
}

/**
 * Change admin password
 *
 * @param email email
 * @param oldPassword old password
 * @param password password
 * @param confirmPassword confirm password
 * @return response
 */
export function changePassword(email : string, oldPassword: string, password: string, confirmPassword: string) {
    return axios.post<any>(AUTH_URL + "/change-password", { email, oldPassword, password, confirmPassword },
        { headers : {"Authorization" : getAccessToken()} })
        .then(() => {
            signOut();
        });
}

/**
 * Login request
 *
 * @param email email
 * @param password password
 * @returns response
 */
export function signIn(email : string, password : string) {
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
                cookies.set("email", JSON.stringify(response.data.userResponse.email),  {path: '/', expires: expiresDate });
                cookies.set("token", JSON.stringify(response.data.accessToken), { path: '/', expires: expiresDate });
            }

            return response;
        });
}

/**
 * User logout
 */
export function signOut() {
    cookies.remove("token");
    cookies.remove("email");

    window.location.reload();
}

/**
 * Does user logged in
 *
 * @returns {boolean} does user logged in
 */
export function isLoggedIn() {
    return getAccessToken() !== '';
}

/**
 * Get access token from cookie
 *
 * @returns {boolean} access token
 */
export function getAccessToken() : string {
    const accessToken = cookies.get("token");

    return accessToken
        ? 'Bearer ' + accessToken
        : '';
}

/**
 * Get user email from cookie
 *
 * @returns {boolean} user email
 */
export function getUserEmail() : string | null {
    return cookies.get("email");
}
