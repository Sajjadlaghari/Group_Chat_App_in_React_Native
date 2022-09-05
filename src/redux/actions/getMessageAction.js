import * as ActionTypes from '../ActionTypes'


const get_message_success = (data) => {
    return {
        type: ActionTypes.GET_MESSAGE_SUCCESS,
        payload: data
    }
}

const get_message_loading = () => {
    return {
        type: ActionTypes.GET_MESSAGE_LOADING,

    }
}
const get_message_failed = (data) => {
    // alert(data);
    return {
        type: ActionTypes.GET_MESSAGE_FAILED,
        payload: data
    }
}

export const get_message = () => {
    return (dispatch) => {
        dispatch(get_message_loading())

        fetch("http://192.168.18.20:8000/api/get_all_messages", {

            method: "GET",
            // body: JSON.stringify(),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())

            .then(data => {

                if (data.error && data.status == false) {

                    dispatch(get_message_failed(data))
                }
                else {

                    dispatch(get_message_success(data.Data))
                }
            })
            .catch((error) => {
                alert(JSON.stringify(error,null))
                dispatch(get_message_failed(error.message))
                console.error(error)
            })
    }
}

