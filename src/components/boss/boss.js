/**
 * Created by w on 2017/12/8.
 */
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.user';
import UserCard from '../usercard/usercard';

@connect(state=>state.chatUser,{getUserList})
class Boss extends React.Component {

    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;

        return (<div><UserCard userList = {this.props.userList}/></div>)
    }
}

export default Boss;