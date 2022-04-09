
/**
 * Alert windows (necessary to initialize at application start)
 */
let alert = null;

export function setAlert(alertToSet) {
    alert = alertToSet;
}

/**
 * Show alert with message
 *
 * @param message - text of message
 */
export function showAlert(message) {
    alert.show(message);
}
