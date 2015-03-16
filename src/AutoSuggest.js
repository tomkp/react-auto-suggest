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
            displayDropDown: false,
            index: -1
        }
    },


    handleTerm(term) {
        console.info('AutoSuggest.handleTerm', term);
        this.setState({
            index: -1,
            term: term,
            displayDropDown: true
        });
    },


    handleClick(term) {
        console.info('AutoSuggest.handleClick', term);
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
        console.info('AutoSuggest.handleSpecial');

        let suggestions = this.props.suggestions();
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

        term = index === -1?this.state.term:suggestions[index];
        this.setState({
            index: index,
            term: term,
            displayDropDown: displayDropDown
        })
    },


    render() {
        console.info('AutoSuggest.render');
        return (
            <div className="AutoSuggest">
                <SearchBox
                    handleTerm={this.handleTerm}
                    handleSpecial={this.handleSpecial}
                    displayTerm={this.state.term}
                />
                <DropDown key="dropdown"
                    handleClick={this.handleClick}
                    suggestions={this.props.suggestions}
                    display={this.state.displayDropDown}
                    index={this.state.index}
                />
            </div>
        );
    }
});


export default AutoSuggest;
