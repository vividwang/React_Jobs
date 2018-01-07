/**
 * Created by w on 2017/12/8.
 */
import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {update} from '../../redux/user.redux';

@connect(state => state.user, {update})
class Geniusinfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            salary: '',
            desc: ''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const nowPath = this.props.location.pathname;
        const redirect = this.props.redirectTo;

        return <div>
            {redirect && redirect !== nowPath ? <Redirect to={this.props.redirectTo}/> : null}
            <NavBar mode="dark">牛人完善信息页面</NavBar>
            <AvatarSelector selectAvatar={(imgName => {
                this.setState({avatar: imgName})
            })}></AvatarSelector>
            <InputItem onChange={v => {
                this.onChange('title', v)
            }}>期望职位</InputItem>
            <InputItem onChange={v => {
                this.onChange('salary', v)
            }}>期望薪资</InputItem>
            <TextareaItem onChange={v => {
                this.onChange('desc', v)
            }}
                          rows={3}
                          autoHeight
                          title="个人介绍"/>
            <Button type="primary" onClick={() => {
                //console.log(this.state);
                this.props.update(this.state)
            }}>保存</Button>
        </div>
    }
}

export default Geniusinfo;