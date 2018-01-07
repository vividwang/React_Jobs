/**
 * Created by w on 2017/12/10.
 */
import axios from 'axios';
import io from 'socket.io-client';

let socket = io('ws://localhost:8000');

//信息列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initialState = {
    chatMsg: [],
    users: {},
    unread: 0
};

export function chat(state = initialState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payload.users,
                chatMsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length
            };
        case MSG_RECV:
            let n = (action.payload.to === action.userId ? 1 : 0);//需要增加的值，先进行一个判断
            console.log(num);
            return {
                ...state,
                chatMsg: [...state.chatMsg, action.payload],
                unread: state.unread + n
            };
        case MSG_READ:
            const {from,num} = action.payload;
            return {
                ...state, chatMsg: state.chatMsg.map(v => ({
                    ...v,read: from === v.from ?true : v.read
                })),unread:state.unread - num
            };
        default:
            return state;
    }
}

function msgList(msgs, users, userId) {
    return {type: MSG_LIST, payload: {msgs, users, userId}};
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let userId = getState().user._id;
                    // console.log('res.data.msgs:'+res.data.msgs);
                    dispatch(msgList(res.data.msgs, res.data.users, userId));
                }
            }, err => {
                console.log('Error found: ' + err);
            })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg});
    }
}

function msgRecv(data, userId) {
    return {userId, type: MSG_RECV, payload: data};
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvMsg', function (data) {
            let userId = getState().user._id;
            dispatch(msgRecv(data, userId));
        })

    }
}

function msgRead({from, userid, num}) {
    return {type: MSG_READ, payload: {from, userid, num}};
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readMsg', {from})
            .then(res => {
                const userid = getState().user._id;
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({userid, from, num: res.data.num}));
                }
            }, err => {
                console.log('Error found: ' + err);
            })
    }
}
