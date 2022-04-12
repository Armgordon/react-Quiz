import {AUTH_FAILED, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action){
    switch (action.type) {

        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        case AUTH_FAILED:
            return {
                ...state,
                isError:true,
                errorText: action.errorText
            }
        default:
            return state
    }
}