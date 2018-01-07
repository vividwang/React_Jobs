/**
 * Created by w on 2017/12/5.
 */
import {combineReducers} from 'redux';
import {user} from './user.redux';
import {chatUser} from './chatuser.user';
import {chat} from './chat.redux';

let reducers = combineReducers({user,chatUser,chat});
export default reducers;