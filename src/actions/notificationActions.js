export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

/**
 * @typedef {Object} notificationOptions
 * @param {number} [notificationOptions.autoHideDuration=4000] - The type of the notification
 * @param {Object} [notificationOptions.messageArgs] - Arguments used to translate the message
 */

/**
 * Shows a snackbar/toast notification on the screen
 * @param {string} message - A translatable label or text to display on notification
 * @param {string} [type=info] - The type of the notification
 * @param {notificationOptions} [notificationOptions] - Specify additional parameters of notification
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 *
 */
export const showNotification = (
    message,
    type = 'info',
    notificationOptions
) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    ...notificationOptions,
    type,
    message,
  },
});

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
