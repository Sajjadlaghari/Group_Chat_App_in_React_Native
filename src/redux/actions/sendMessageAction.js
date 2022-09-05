import * as ActionTypes from '../ActionTypes'

const send_message_success = (data) => {
    return {
        type: ActionTypes.SEND_MESSAGE_SUCCESS,
        payload: data
    }
}

const send_message_loading = () => {
    return {
        type: ActionTypes.SEND_MESSAGE_LOADING,

    }
}
const send_message_failed = (data) => {
    // alert(data);
    return {
        type: ActionTypes.SEND_MESSAGE_FAILED,
        payload: data
    }
}

export const send_message = (data,messageData) => {
    // alert(JSON.stringify(data._parts,null,2))



    return (dispatch) => {
        // dispatch(send_message_loading())

        fetch("http://192.168.18.20:8000/api/send_message", {

            method: "POST",
            body: data,

            // Adding headers to the request
            headers: {
                "Content-Type": "multipart/form-data; ",
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())

            .then(data => {

            // alert(JSON.stringify(data,null,2))
            console.log(data)


                const message={
                    user_id:data.id,
                    message:data.message,
                    user:{
                        name:data.userName
                    }
                }
                // const message={
                //     user_id:2,
                //     message:"dummy message",
                //     user:{
                //         name:"sajjad"
                //     }
                // }
                dispatch(send_message_success(messageData))


                // if (data.status == false) {

                //     // dispatch(send_message_failed(data))
                // }
                // else {
                //     alert(JSON.stringify(data.message,null,2))
                //     dispatch(send_message_success(data))
                // }
            })
            .catch((error) => {
                alert(JSON.stringify(error,null))
                dispatch(send_message_failed(error.message))
                console.error(error)
            })
    }
}

