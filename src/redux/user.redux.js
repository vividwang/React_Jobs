/**
 * Created by w on 2017/12/5.
 */
import axios from 'axios';
import {getRedirectPath} from '../utils';

// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initalState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
};

export function user(state = initalState, action) {
    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return {
        //         ...state,
        //         msg: '',
        //         redirectTo: getRedirectPath(action.payload),
        //         isAuth: true, ...action.payload
        //     };
        // case LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         msg: '',
        //         redirectTo: getRedirectPath(action.payload),
        //         isAuth: true,
        //         ...action.payload
        //     };
        case AUTH_SUCCESS:
            return {
                ...state,
                msg:'',
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            };
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...initalState,redirectTo:'/login'};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

function authSuccess(data) {
    //若是redux中state暴露出密码，应该过滤掉密码
    const {pwd,...otherData} = data;
    return {type: AUTH_SUCCESS, payload: otherData,pwd:''};//过滤密码在这里可以加上pwd：''
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo};
}

export function logoutSubmit() {
    return {type:LOGOUT};
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('清输入用户名和密码');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            }, err => {
                console.log('Error found: ' + err);
            })
    }
}

export function register({type,user, pwd, repeatpwd,}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入！');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同！');
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            }, err => {
                console.log('Error found: ' + err);
            })
    };
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            }, err => {
                console.log('Error found: ' + err);
            })
    }
}