/**
 * Created by w on 2017/12/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    static userList = {
        userList: PropTypes.array.isRequired
    };

    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;

        return ( <WingBlank>
            {this.props.userList.map(v => (
                v.avatar ? (<div key={v._id} onClick={()=>{this.handleClick(v)}}><Card>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}>
                        </Header>
                        <Body>
                        {v.type === 'boss'?<div>公司: {' '} {v.company}</div>:null}
                        {v.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
                        {v.type==='boss'?<div>薪资： {' '} { v.salary }</div>:null}
                        </Body>
                    </Card><WhiteSpace></WhiteSpace></div>) : null
            ))}
        </WingBlank>)
    }
}

export default UserCard;