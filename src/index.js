import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './store'
import { Provider } from 'react-redux'

render(
    <Provider store={store}>
        <Root />
    </Provider>, document.getElementById('root'));
