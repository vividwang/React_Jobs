/**
 * Created by w on 2017/12/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../index.css';

@connect(state=>state)
@withRouter
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const {pathname} = this.props.location;
        // console.log(this.props.chat.unread);
        return (
            <TabBar className="stick-footer">
                {navList.map(v => (<TabBar.Item
                    badge={v.path==='/msg'?this.props.chat.unread:0}
                    key={v.path}
                    text={v.text}
                    icon={{uri: require(`./img/${v.icon}.svg`)}}
                    selectedIcon={{uri: require(`./img/${v.icon}_fill.svg`)}}
                    selected={pathname === v.path}
                    onPress={() => {
                        this.props.history.push(v.path)
                    }}>
                </TabBar.Item>))}
            </TabBar>
        )
    }
}

export default NavLinkBar;