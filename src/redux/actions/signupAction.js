import * as ActionTypes from '../ActionTypes'


const signup_success = (data) => {
    return {
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: data
    }
}

const signup_loading = () => {
    return {
        type: ActionTypes.LOGIN_USER_LOADING,

    }

}
const signup_failed = (data) => {
    alert("Action fired");
    return {

        type: ActionTypes.SIGNUP_USER_FAILED,
        payload: data
    }
}

export const signup_user = (data) => {
    return (dispatch) => {
        dispatch(signup_loading())

        fetch("http://192.168.18.20:8000/api/registration", {

            method: "POST",
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())

            .then(data => {

                if (data.error && data.status == false) {
                    dispatch(signup_failed(data.error))
                }
                else
                    dispatch(signup_success(data))
            })
            .catch((error) => {
                dispatch(signup_failed(error.message))
                console.error(error)
            })
    }
}

