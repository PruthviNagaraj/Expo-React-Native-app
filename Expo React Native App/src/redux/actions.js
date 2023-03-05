export const SET_NOTIFICATION_PREFERENCE = "SET_NOTIFICATION_PREFERENCE";

export const setNotificationPreference = pref => dispatch => {
    dispatch({
        type: SET_NOTIFICATION_PREFERENCE,
        payload: pref
    })
}