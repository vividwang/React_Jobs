/**
 * Created by w on 2017/12/10.
 */
import React from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../utils';

@connect(state => state, {getMsgList, sendMsg, recvMsg, readMsg})
class ChatUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            msgs: []
        };
    }

    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    componentWillUnmount(){
        // console.log('unmout');
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });

        // console.log(this.state);
    }

    handleSubmit() {
        // socket.emit('sendMsg', {text: this.state.text});
        // this.setState({
        //     text: ''
        // })
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;

        this.props.sendMsg({from, to, msg});
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    render() {
        let emojis = '😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣  😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😄 😀 😁 😂 🤣 😃 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃'
            .split(' ').filter(v => v).map(v => ({text: v}));

        let userId = this.props.match.params.user;
        let Item = List.Item;
        let users = this.props.chat.users;

        if (!users[userId]) {
            return null;
        }

        console.log(userId);
        let chatId = getChatId(userId, this.props.user._id);
        let chatMsgs = this.props.chat.chatMsg.filter(v => v.chatId === chatId);

        return (<div id="chat-page">
            <NavBar
                mode="dark"
                icon={<Icon type="left"></Icon>} onLeftClick={() => {
                this.props.history.goBack()
            }}
            >{this.props.user.user}</NavBar>
            {chatMsgs.map(v => {
                let avatar = require(`../img/${users[v.from].avatar}.png`);

                return v.from === userId ?
                    (<List key={v.id + Math.random().toFixed(5)}>
                        <Item thumb={avatar}
                        >{v.content}</Item>
                    </List>) :
                    (<List key={v.id + Math.random().toFixed(5)} className="chat-me">
                        <Item extra={<img src={avatar}></img>}>
                            {v.content}
                        </Item>
                    </List>)
            })}

            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v => {
                            this.setState({text: v})
                        }}
                        extra={<div><span style={{marginRight: 15}}
                                          onClick={() => {
                                              this.setState({showEmoji: !this.state.showEmoji})
                                              this.fixCarousel()
                                          }}
                        >😀</span>
                            <span onClick={() => this.handleSubmit()}>发送</span></div>}/>
                </List>
                {this.state.showEmoji ?
                    <Grid
                        data={emojis}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el => {
                            this.setState({text: this.state.text + el.text})
                        }}/> : null}
            </div>
        </div>)

    }
}
export default ChatUser;