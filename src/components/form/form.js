/**
 * Created by w on 2017/12/10.
 */
import React from 'react';

export default function Form(Component) {
    class WrapperComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }

        render() {
            return <Component handleChange={this.handleChange} state={this.state} {...this.props}/>
        }
    }

    return WrapperComponent;
}