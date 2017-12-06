// import React from 'react';
// import { render } from 'react-dom';
// import Root from './components/Root';
//
// render(<Root />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
var Card = require('./components/card');
var axios = require('axios');
var createReactClass = require('create-react-class');

var CardList = createReactClass({

    getInitialState: function() {
        return {
            persons: []
        }
    },

    componentDidMount: function() {
        // Is there a React-y way to avoid rebinding `this`? fat arrow?
        var th = this;
        this.serverRequest =
            axios.get(this.props.source)
                .then(function(result) {
                    th.setState({
                        persons: result.data.results
                    });
                })
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
            <div>
                <h1>Persons!</h1>
                {/* Don't have an ID to use for the key, URL work ok? */}
                {this.state.persons.map(function(person) {

                    return <Card key={person.email} data={person}/>;

                })}
            </div>
        )
    }
});
render(<Root />, document.getElementById('root'));

render(
    <CardList source="http://api.randomuser.me/?results=5" />,
    document.getElementById('app')
);
