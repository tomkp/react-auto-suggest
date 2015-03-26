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


    handleTerm(term) {
        //console.info('AutoSuggest.handleTerm', term);
        let child = this.props.children;

        this.setState({
            term: term
        });
        this.props.suggestions(term, this.onResponse);
    },


    onResponse(suggestions) {
        //console.info('AutoSuggest.onResponse', suggestions);
        this.setState({
            index: -1,
            displayDropDown: true,
            suggestions: suggestions
        });
    },


    handleClick(term) {
        //console.info('AutoSuggest.handleClick', term);
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
        //console.info('AutoSuggest.handleSpecial');

        //let suggestions = this.props.suggestions(this.state.term);
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

        //console.info('children', this.props.children);


        term = index === -1?this.state.term:suggestions[index];

        //console.info('term', term, index, suggestions);

        this.setState({
            index: index,
            term: term,
            displayDropDown: displayDropDown
        })
    },


    render() {
        //console.info('AutoSuggest.render');

        /*var children = this.props.children;
        let elements = [];
        if (children && children.length > 0) {
            elements = children.map((child) => {
                //console.info('child', child);
                return child;
            });
        }*/

        let child = this.props.children;
        //console.info('child', child);

        return (
            <div className="AutoSuggest">
                <SearchBox
                    handleTerm={this.handleTerm}
                    handleSpecial={this.handleSpecial}
                    displayTerm={this.state.term}
                />
                <DropDown key="dropdown"
                    handleClick={this.handleClick}
                    suggestions={this.state.suggestions}
                    display={this.state.displayDropDown}
                    renderer={child}
                    index={this.state.index}
                />
            </div>
        );
    }
});


export default AutoSuggest;
