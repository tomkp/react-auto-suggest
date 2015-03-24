import React from 'react';
import AutoSuggest from '../src/AutoSuggest';
import jsonp from 'jsonp';


var Example = React.createClass({

    suggestions: function(value, callback) {
        console.info('Example.suggestions', value);
        jsonp('http://api.search.sky.com/query.json?category=newtv&term=' + value, function(err, data) {
            if (!err) {
                if (data.searchResults) {
                    var results = data.searchResults.map(function (result) {
                        return result.seriesName + ' / '  + result.title;
                    });
                    callback(results);
                }
            }

        })
    },

    suggested: function(suggestion) {
        console.info('suggestion:', suggestion);
    },

    render: function() {
        return (
            <AutoSuggest suggestions={this.suggestions} onSuggestion={this.suggested} />
        );
    }

});

React.render(<Example />, document.body);