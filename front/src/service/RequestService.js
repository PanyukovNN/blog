import axios from "axios";

export function postReq(url, body) {
    let postResponse = axios.post(url,
        JSON.stringify(body),
        {
            headers : {'Content-Type': 'application/json'}
        });

    return processResponse(postResponse);
}

export function getReq(url) {
    let getResponse = axios.get(url,
        {
            headers : {'Content-Type': 'application/json'}
        });

    return processResponse(getResponse);
}

export function deleteReq(url, body) {
    let deleteResponse = axios.delete(url,{
        data: JSON.stringify(body),
        headers : {'Content-Type': 'application/json'}
    });

    return processResponse(deleteResponse);
}

const processResponse = (axiosResponse) => {
    return axiosResponse
        .then((response) => {
            if (response.status !== 200) {
                throw response;
            }

            return response;
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.message) {
                // TODO добавить алерт
                // showAlert(error.response.data.message);
            } else {
                if (error.message && error.message === "Network Error") {
                    window.location.href = "/network-error";

                    return;
                }

                // showAlert(error.response.data);
            }
        });
}
