/**
 * Created by w on 2017/12/5.
 */
import React from 'react';
import Logo from '../../components/logo/logo';
import {List, Radio, InputItem, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import Form from '../../components/form/form';
import '../../index.css';

@connect(
    state => state.user, {register}
)
@Form
class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount(){
        this.props.handleChange('type','genius');
    }

    handleRegister() {
        this.props.register(this.props.state);
        // console.log(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (<div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <List>
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户名：</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password"
                               onChange={v => this.props.handleChange('pwd', v)}>密码：</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password"
                               onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码：</InputItem>
                    <WhiteSpace/>
                    <RadioItem onChange={v => this.props.handleChange('type', 'genius')}
                               checked={this.props.state.type === 'genius'}>牛人</RadioItem>
                    <RadioItem onChange={v => this.props.handleChange('type', 'boss')}
                               checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}
// <RadioItem onChange={v => this.props.handleChange('type', 'genius')}
//            checked={this.props.state.type === 'genius'}>牛人</RadioItem>
// <RadioItem onChange={v => this.props.handleChange('type', 'boss')}
// checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
export default Register;