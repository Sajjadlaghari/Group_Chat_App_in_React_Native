import * as ActionTypes from '../ActionTypes'

export const UserReducer = (state = { isLoading: false, errorMsg: null, user:null }, action) => {
  
    switch (action.type) {
        case ActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload

            };
        case ActionTypes.LOGIN_USER_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMsg: null

            };
        case ActionTypes.LOGIN_USER_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload,
                user: null
            };
            case ActionTypes.SIGNUP_USER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    errorMsg: null,
                    user: action.payload
                };
                case ActionTypes.SIGNUP_USER_LOADING:
                    return {
                        ...state,
                        isLoading: false,
                        errorMsg: null,
                        user: action.payload
                    };
                    case ActionTypes.SIGNUP_USER_FAILED:
                        return {
                            ...state,
                            isLoading: false,
                            errorMsg: action.payload,
                            user: null
                        };

                        case ActionTypes.LOGOUT_USER_SUCCESS:
                        return {
                            ...state,
                            isLoading: false,
                            errorMsg: null,
                            user:null
                        };
        default:
            return state;
    }
}