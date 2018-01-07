/**
 * Created by w on 2017/12/6.
 */
import React from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        this.state={};
    }

    render() {
        let avatarList = 'boy,man,girl,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',').map(v => {
                return {icon: require(`../img/${v}.png`), text: v}
            });

        let gridHeader = this.state.icon ? (<div><span>已选择头像</span><img style={{width: '20px'}}
                                                                        src={this.state.icon}/></div>) : '请选择头像';


        return <div>
            <List renderHeader={gridHeader}>
                <Grid data={avatarList}
                      columnNum={5}
                      onClick={element => {
                          this.setState(element);
                          this.props.selectAvatar(element.text)
                      }}/>
            </List>
        </div>
    }
}

export default AvatarSelector;