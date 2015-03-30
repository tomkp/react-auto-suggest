import React from 'react';
import SearchBox from './SearchBox';
import DropDown from './DropDown';


let AutoSuggest = React.createClass({

    propTypes: {
        suggestions: React.PropTypes.func.isRequired,
        onSuggestion: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            suggestions: [],
            displayDropDown: false,
            index: -1
        }
    },


    handleTerm(value) {
        this.setState({
            term: value,
            value: value
        });
        this.props.suggestions(value, this.onResponse);
    },


    onResponse(suggestions) {
        this.setState({
            index: -1,
            displayDropDown: true,
            suggestions: suggestions
        });
    },


    handleClick(term) {
        this.setState({
            index: -1,
            term: term,
            displayDropDown: false
        });
        this.triggerSuggestion(term);
    },


    triggerSuggestion: function (suggestion) {
        this.props.onSuggestion(suggestion);
    },


    handleSpecial(code) {
        let suggestions = this.state.suggestions;
        let length = suggestions.length;
        let index = this.state.index;
        let displayDropDown = true;
        let term;

        if (code === 13) {
            // enter
            displayDropDown = false;
            this.triggerSuggestion(this.state.term);
        } else if (code === 27) {
            // esc
            index = -1;
            displayDropDown = false;
        } else if (code === 38) {
            // up
            if (index === -1) {
                index = length - 1;
            } else {
                index--;
            }
        } else if (code === 39) {
            // right
        } else if (code === 40) {
            // down
            if (index === length - 1) {
                index = -1;
            } else {
                index++;
            }
        }

        if (index === -1) {
            term = this.state.value;
        } else {
            var suggestion = suggestions[index];
            if (this.props.onSelect) {
                term = this.props.onSelect(suggestion);
            } else {
                term = suggestion;
            }
        }

        this.setState({
            index: index,
            term: term,
            displayDropDown: displayDropDown
        })
    },


    render() {
        let renderer = this.props.children;
        return (
            <div className="AutoSuggest">
                <SearchBox
                    handleTerm={this.handleTerm}
                    handleSpecial={this.handleSpecial}
                    value={this.state.term}
                />
                <DropDown key="dropdown"
                    handleClick={this.handleClick}
                    suggestions={this.state.suggestions}
                    display={this.state.displayDropDown}
                    renderer={renderer}
                    index={this.state.index}
                />
            </div>
        );
    }
});


export default AutoSuggest;
