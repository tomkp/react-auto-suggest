"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

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
        console.info("SearchBox.handleChange", event.target.value);
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

module.exports = SearchBox;