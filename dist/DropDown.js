"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

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
        var suggestions = this.props.suggestions;
        var entries = suggestions.map(function (suggestion, i) {
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

module.exports = DropDown;