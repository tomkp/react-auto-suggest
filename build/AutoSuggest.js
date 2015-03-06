"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var suggestions = ["chicken", "duck", "elephant", "zebra", "penguin", "dog", "cat", "crocodile"];

var SearchBox = React.createClass({
    displayName: "SearchBox",

    getInitialState: function getInitialState() {
        return {
            value: ""
        };
    },

    componentDidMount: function componentDidMount() {
        this.refs.searchBox.getDOMNode().focus();
    },

    keyDown: function keyDown(event) {
        console.info("SearchBox.keyDown");
        var keys = [13, 27, 38, 39, 40];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.props.handleSpecial(event.keyCode);
        }
    },

    handleChange: function handleChange(event) {
        console.info("SearchBox.handleChange", event, event.keyCode);
        this.setState({
            value: event.target.value
        });
        var keys = [13, 27, 38, 39, 40];
        if (keys.indexOf(event.keyCode) === -1) {
            var inputtedTerm = this.refs.searchBox.getDOMNode().value;
            this.props.handleTerm(inputtedTerm);
        }
    },

    render: function render() {
        console.info("SearchBox.render");
        return React.createElement("input", { ref: "searchBox",
            className: "SearchBox",
            onKeyDown: this.keyDown,
            onChange: this.handleChange,
            value: this.props.displayTerm });
    }
});

var DropDown = React.createClass({
    displayName: "DropDown",

    handleClick: function handleClick(event) {
        console.info("DropDown.handleClick");
        var suggestion = event.target.getAttribute("data-suggestion");
        this.props.handleClick(suggestion);
    },

    render: function render() {
        var _this = this;

        console.info("DropDown.render", this.props.suggestions);
        var index = this.props.index;
        var entries = this.props.suggestions.map(function (suggestion, i) {
            var classes = ["suggestion"];
            if (i === index) {
                classes.push("selected");
            }
            return React.createElement(
                "div",
                { className: classes.join(" "),
                    onClick: _this.handleClick,
                    "data-suggestion": suggestion,
                    key: suggestion },
                suggestion
            );
        });

        var styles = {
            display: this.props.display ? "block" : "none"
        };

        return React.createElement(
            "div",
            { className: "DropDown", style: styles },
            entries
        );
    }
});

var AutoSuggest = React.createClass({
    displayName: "AutoSuggest",

    propTypes: {
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
        this.setState({
            index: -1,
            term: term,
            suggestions: suggestions,
            displayDropDown: true
        });
    },

    handleClick: function handleClick(term) {
        console.info("AutoSuggest.handleClick", term);
        this.setState({
            index: -1,
            term: term,
            suggestions: suggestions,
            displayDropDown: false
        });
        this.triggerSuggestion(term);
    },

    triggerSuggestion: function triggerSuggestion(suggestion) {
        this.props.onSuggestion(suggestion);
    },

    handleSpecial: function handleSpecial(code) {
        console.info("AutoSuggest.handleSpecial");
        var length = this.state.suggestions.length;
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

        term = index === -1 ? this.state.term : this.state.suggestions[index];
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