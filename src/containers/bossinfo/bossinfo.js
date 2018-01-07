/**
 * Created by w on 2017/12/6.
 */
import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {update} from '../../redux/user.redux';

@connect(state => state.user, {update})
class Bossinfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            company:'',
            salary:'',
            desc:''
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
            {redirect &&redirect !== nowPath ? <Redirect to={this.props.redirectTo}/>:null}
                    <NavBar mode="dark">BOSS完善信息页面</NavBar>
                    <AvatarSelector selectAvatar={(imgName => {
                        this.setState({avatar: imgName})
                    })}></AvatarSelector>
                    <InputItem onChange={v => {
                        this.onChange('title', v)
                    }}>招聘职位</InputItem>
                    <InputItem onChange={v => {
                        this.onChange('company', v)
                    }}>公司名称</InputItem>
                    <InputItem onChange={v => {
                        this.onChange('salary', v)
                    }}>职位薪资</InputItem>
                    <TextareaItem onChange={v => {
                        this.onChange('desc', v)
                    }}
                                  rows={3}
                                  autoHeight
                                  title="职位要求"/>
                    <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
                </div>
            }
            }

            export default Bossinfo;