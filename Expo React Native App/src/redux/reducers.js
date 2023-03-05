import { SET_NOTIFICATION_PREFERENCE } from './actions';

const initialState = {
    settingsNotification: {
        SMS: true,
        Push: true,
        Email: true
    }
}

function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION_PREFERENCE : return {...state, settingsNotification: action.payload};
        default:
            return state;
    }
}

export default settingsReducer;