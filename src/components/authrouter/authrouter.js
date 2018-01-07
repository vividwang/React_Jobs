/**
 * Created by w on 2017/12/5.
 */
//关于权限检验
import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux';
import {connect} from 'react-redux';

@withRouter
@connect(null,{loadData})
class AuthRouter extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;//得到当前的url

        if (publicList.indexOf(pathname) !== -1) {
            return null;
        }
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                   this.props.loadData(res.data.data)

                } else {
                    console.log('没有登录');
                    this.props.history.push('/login');
                }
            }
        }, err => {
            console.log('Error found: ' + err);
        });
    }

    render() {
        return null;
    }
}

export default AuthRouter