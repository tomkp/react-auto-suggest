import React from 'react';
import AutoSuggest from '../';
import jsonp from 'jsonp';



let Custom = React.createClass({

    onClick(event) {
        console.info('Custom.onClick', event);
        var suggestion = this.props.suggestion;
        this.props.onClick(suggestion.title);
    },


    render() {
        var suggestion = this.props.suggestion;
        let classes = ['Suggestion'];
        if (this.props.selected) {
            classes.push('selected');
        }
        return (
            <div className={classes.join(' ')} data-suggestion={suggestion.title} onClick={this.onClick} >
                <span className="titles">
                    <div className="series-title">{suggestion.seriesName?suggestion.seriesName:''}</div>
                    <div className="title">{suggestion.title}</div>
                </span>
            </div>
        );
    }
});


let Example = React.createClass({

    suggestions: function(value, callback) {
        console.info('Example.suggestions', value);
        jsonp('http://api.search.sky.com/query.json?category=newtv&term=' + value, function(err, data) {
            if (!err) {
                if (data.searchResults) {
                    var results = data.searchResults.map(function (result) {
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

    onSelect: function(suggestion) {
        console.info('selected:', suggestion);
        return suggestion.title;
    },


    render: function() {
        return (
            <AutoSuggest suggestions={this.suggestions} onSuggestion={this.suggested} onSelect={this.onSelect}>
                <Custom />
            </AutoSuggest>
        );
    }

});

React.render(<Example />, document.body);