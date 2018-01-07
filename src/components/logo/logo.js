/**
 * Created by w on 2017/12/5.
 */
import React from 'react';
import logoImg from './logo.png';
import './logo.css';

class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}

export default Logo;