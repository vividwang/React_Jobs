/**
 * Created by w on 2017/12/8.
 */
import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initialState = {
    userList: []
};

//reducer
export function chatUser(state = initialState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload};
        default:
            return state;
    }
}

function userList(data) {
    return {type: USER_LIST, payload: data};
}

export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type=' + type)
            .then(res => {
                if (res.data.code === 0) {
                    dispatch(userList(res.data.data));
                }
            }, err => {
                console.log(err);
            });
    }
}
