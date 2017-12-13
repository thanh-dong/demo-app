import { createStore } from 'redux'
import DemoApp from './reducers'

const store = createStore(
    DemoApp,
);

export default store
