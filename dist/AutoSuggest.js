"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var SearchBox = _interopRequire(require("./SearchBox"));

var DropDown = _interopRequire(require("./DropDown"));

var AutoSuggest = React.createClass({
    displayName: "AutoSuggest",

    propTypes: {
        suggestions: React.PropTypes.func.isRequired,
        onSuggestion: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            suggestions: [],
            displayDropDown: false,
            index: -1
        };
    },

    handleTerm: function handleTerm(term) {
        console.info("AutoSuggest.handleTerm", term);
        var suggestions = this.props.suggestions(term) || [];
        console.info("suggestions", suggestions);
        this.setState({
            index: -1,
            term: term,
            displayDropDown: true,
            suggestions: suggestions
        });
    },

    handleClick: function handleClick(term) {
        console.info("AutoSuggest.handleClick", term);
        this.setState({
            index: -1,
            term: term,
            displayDropDown: false
        });
        this.triggerSuggestion(term);
    },

    triggerSuggestion: function triggerSuggestion(suggestion) {
        this.props.onSuggestion(suggestion);
    },

    handleSpecial: function handleSpecial(code) {
        console.info("AutoSuggest.handleSpecial");

        //let suggestions = this.props.suggestions(this.state.term);
        var suggestions = this.state.suggestions;
        var length = suggestions.length;
        var index = this.state.index;
        var displayDropDown = true;
        var term = undefined;

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
        } else if (code === 39) {} else if (code === 40) {
            // down
            if (index === length - 1) {
                index = -1;
            } else {
                index++;
            }
        }

        term = index === -1 ? this.state.term : suggestions[index];
        this.setState({
            index: index,
            term: term,
            displayDropDown: displayDropDown
        });
    },

    render: function render() {
        console.info("AutoSuggest.render");
        return React.createElement(
            "div",
            { className: "AutoSuggest" },
            React.createElement(SearchBox, {
                handleTerm: this.handleTerm,
                handleSpecial: this.handleSpecial,
                displayTerm: this.state.term
            }),
            React.createElement(DropDown, { key: "dropdown",
                handleClick: this.handleClick,
                suggestions: this.state.suggestions,
                display: this.state.displayDropDown,
                index: this.state.index
            })
        );
    }
});

module.exports = AutoSuggest;

// right