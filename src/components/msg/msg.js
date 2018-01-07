/**
 * Created by w on 2017/12/29.
 */
import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';

@connect(state => state)
class Msg extends React.Component {
    //获得最后一条消息
    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        // if (!this.props.chat.chatMsg.length){
        //     return ;
        // }

        //console.log(this.props);
        //按照聊天用户分组，根据chatId
        const msgGroup = {};
        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chatId] = msgGroup[v.chatId] || [];
            msgGroup[v.chatId].push(v);
        });

        console.log(msgGroup);

        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;

        console.log('user:' + userid);
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            let last_a = this.getLast(a).create_time;
            let last_b = this.getLast(b).create_time;

            return last_b - last_a;
        });

        // console.log(chatList);
        return <div>
            {chatList.map(v => {
                const lastItem = this.getLast(v);
                const targetId = v[0].from === userid ? v[0].to : v[0].from;
                const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].name;
                const avatar = this.props.chat.users[targetId] && this.props.chat.users[targetId].avatar;
                const unreadNum = v.filter(v=>!v.read && v.to === userid).length;
                console.log(unreadNum);
                console.log('name:' + name, 'avatar:' + avatar);
                return <List key={lastItem._id}>
                    <Item key={v}
                          extra={<Badge text ={unreadNum}></Badge>}
                          thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                          arrow = "horizontal"
                    onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}>
                        {lastItem.content}
                        <Brief>{this.props.chat.users[targetId].name}</Brief>
                    </Item>
                </List>
            })}
        </div>
    }
}

export default Msg;