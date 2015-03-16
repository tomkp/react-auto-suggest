import React from 'react';
import AutoSuggest from '../src/AutoSuggest';


var Example = React.createClass({

    suggestions: function() {
        return ['chicken', 'duck', 'elephant', 'zebra', 'penguin', 'dog', 'cat', 'crocodile'];
    },

    suggested: function(suggestion) {
        console.info('suggestion:', suggestion);
    },

    render: function() {
        return (
            <AutoSuggest suggestions={this.suggestions} onSuggestion={this.suggested}/>
        );
    }

});

React.render(<Example />, document.body);