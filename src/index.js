import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import reducers from './redux/reducers';
import './config';

import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRouter from './components/authrouter/authrouter';
import Bossinfo from './containers/bossinfo/bossinfo';
import Geniusinfo from './containers/geniusinfo/geniusinfo';
import Dashboard from './components/dashboard/dashboard';
import ChatUser from './components/chat/chat';

// const reduxDevtools = window.devToolsExtension;
// const store = createStore(reducers, compose(
//     applyMiddleware(thunk)
// ));


const store = createStore(reducers,compose(applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f));

// const store = createStore(reducers,applyMiddleware(thunk));

//boss,genius,me,msg共四个页面

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter/>
                <Switch>
                    <Route path="/geniusinfo" component={Geniusinfo}/>
                    <Route path="/bossinfo" component={Bossinfo}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/chat/:user" component={ChatUser}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>)
    , document.getElementById('root'));
