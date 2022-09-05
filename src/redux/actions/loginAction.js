import * as ActionTypes from '../ActionTypes'


const login_success = (data) => {
    return {
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: data
    }
}

const login_loading = () => {
    return {
        type: ActionTypes.LOGIN_USER_LOADING,

    }
}
const login_failed = (data) => {
    // alert(data);
    return {
        type: ActionTypes.LOGIN_USER_FAILED,
        payload: data
    }
}

export const user_login = (data) => {


    return (dispatch) => {
        dispatch(login_loading())

        fetch('http://192.168.18.20:8000/api/login', {

            method: "POST",
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'same-origin'
        })
            .then((response) => response.json())
            .then((data) => {
                alert(JSON.stringify(data,null,2))
                if (data.status == false && data.error) {
                    alert(JSON.stringify(data, null, 2))
                    dispatch(login_failed(data.error))
                }
                else
                    dispatch(login_success(data))

            })
            .catch((error) => {
                dispatch(login_failed(error))
                console.error(error)
            })
    }

  
}

