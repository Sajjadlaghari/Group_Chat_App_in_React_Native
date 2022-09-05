import * as ActionTypes from '../ActionTypes'

export const chatReducer = (state = { isLoading: false, errorMsg: null, message: [] }, action) => {

    switch (action.type) {
        case ActionTypes.GET_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMsg: null,
                message: action.payload
            };
        case ActionTypes.GET_MESSAGE_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMsg: null,
                message: action.payload
            };
        case ActionTypes.GET_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload,
                message: null
            };
            case ActionTypes.SEND_MESSAGE_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    errorMsg: null,
                    message: [...state.message,action.payload]
                };
            case ActionTypes.SEND_MESSAGE_LOADING:
                return {
                    ...state,
                    isLoading: false,
                    errorMsg: null,
                    message:null
                };
            case ActionTypes.SEND_MESSAGE_FAILED:
                return {
                    ...state,
                    isLoading: false,
                    errorMsg: action.payload,
                    message: null
                };
        default:
            return state;
    }
}