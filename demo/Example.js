import React from 'react';
import AutoSuggest from '../src/AutoSuggest';
import jsonp from 'jsonp';



var Suggestion = React.createClass({


    render() {
        //console.info('Suggestion.render', this.props.suggestion);
        var suggestion = this.props.suggestion;
        let classes = ['Suggestion'];
        if (this.props.selected) {
            classes.push('selected');
        }
        return (
            <div className={classes.join(' ')} data-suggestion={suggestion.title}>
                <span className="title">{suggestion.title}</span>
                <span className="series-title">{suggestion.seriesName?suggestion.seriesName:''}</span>
            </div>
        );
    }
});


var Example = React.createClass({

    suggestions: function(value, callback) {
        console.info('Example.suggestions', value);
        jsonp('http://api.search.sky.com/query.json?category=newtv&term=' + value, function(err, data) {
            if (!err) {
                if (data.searchResults) {
                    var results = data.searchResults.map(function (result) {
                        //return result.seriesName + ' / '  + result.title;
                        return result;
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
            <AutoSuggest suggestions={this.suggestions} onSuggestion={this.suggested}>
                <Suggestion />
            </AutoSuggest>
        );
    }

});

React.render(<Example />, document.body);