import { iNotification, Store } from "react-notifications-component";
import { NotificationType } from "../util/CommonTypes";

const notificationOptions : iNotification = {
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 5000
    }
}

export function showNotification(message: string, type: NotificationType) {
    Store.addNotification({
        ...notificationOptions,
        message: message,
        type: type
    })
}
