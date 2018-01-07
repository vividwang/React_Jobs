/**
 * Created by w on 2017/12/8.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {Redirect} from 'react-router-dom';
import {logoutSubmit} from '../../redux/user.redux';

@connect(state => state.user,{logoutSubmit})
class User extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        const alert = Modal.alert;

        alert('注销', '确定退出登录？', [
            {
                text: '取消', onPress: () => {
                console.log('cancel')
            }
            },
            {
                text: '确定', onPress: () => {
                 browserCookie.erase('userId');
                // window.location.href = window.location.href;
                this.props.logoutSubmit();
            }
            }
        ]);

    }

    render() {
        // console.log(this.props);
        // console.log(this.props.desc);
        const Item = List.Item;
        const Brief = Item.Brief;

        return (this.props.user ? <div style={{marginTop: '-30px'}}>
                <Result img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: '50px'}} alt=""/>}
                        title={this.props.user}
                        message={this.props.type === 'boss' ? this.props.company : null}/>
                <List renderHeader={() => "简介"}>
                    <Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => (<Brief key={v}>{v}</Brief>))}
                        {this.props.salary ? <Brief>薪资： {this.props.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <Button type="primary" style={{marginTop: '20%'}} onClick={this.logout}>退出登录</Button>
            </div> : <Redirect to={this.props.redirectTo}/>)
    }
}

export default User;