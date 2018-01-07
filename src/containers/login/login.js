/**
 * Created by w on 2017/12/5.
 */
import React from 'react';
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import Form from '../../components/form/form';

// function hello() {
//     console.log('say hello');
// }
//
// function wrapperHello(fn) {
//     return function () {
//         console.log('before');
//         fn();
//         console.log('after');
//     }
// }
//
// hello = wrapperHello(hello);
// hello();

// function wrapperHello(Component) {
//     class WrapperComponent extends React.Component{
//         render(){
//             return (<div>
//                 <Component {...this.props}></Component>
//             </div>)
//         }
//     }
//
//     return WrapperComponent;
// }
//
// //HOC高阶组件
// @wrapperHello
// class Hello extends React.Component{
//
//     render(){
//         return <div>这是HOC高阶组件Hello</div>
//     }
// }

//Hello = wrapperHello(Hello);

@connect(state => state.user, {login})
@Form
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pwd: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);

    }


    register() {
        console.log(this.props);
        this.props.history.push('/register');
    }

    handleLogin() {
        console.log(this.props.state);
        this.props.login(this.props.state);
    }

    render() {
        return (<div>
            {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                <Redirect to={this.props.redirectTo}/> : null}
            <Logo/>
            <WingBlank>
                <List>
                    {this.props.msg?<div>用户名或密码错误！</div>:null}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>
                        用户名
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>
                        密码
                    </InputItem>
                    <WhiteSpace/>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleLogin}>
                    登录
                </Button>
                <WhiteSpace/>
                <Button type="primary" onClick={this.register}>注册</Button>
            </WingBlank>
        </div>)
    }
}

export default Login;