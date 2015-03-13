import React from 'react';
import AutoSuggest from '../src/AutoSuggest';


var Example = React.createClass({

    suggested: function(suggestion) {
        console.info('suggestion:', suggestion);
    },

    render: function() {
        return (
            <AutoSuggest onSuggestion={this.suggested}/>
        );
    }

});

React.render(<Example />, document.body);