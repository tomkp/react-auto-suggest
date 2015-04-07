import React from 'react';


let SearchBox = React.createClass({


    componentDidMount() {
        this.refs.searchBox.getDOMNode().focus();
    },


    keyDown(event) {
        let keys = [13,27,38,39,40];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.props.handleSpecial(event.keyCode);
        }
    },


    handleChange(event) {
        let keys = [13,27,38,39,40];
        let keyCode = event.keyCode;
        if (keys.indexOf(keyCode) === -1) {
            let inputtedTerm = event.target.value;
            this.props.handleTerm(inputtedTerm);
        }
    },


    render() {
        let value = this.props.value || '';
        return <input ref="searchBox"
            className={this.constructor.displayName}
            onKeyDown={this.keyDown}
            onChange={this.handleChange}
            value={value} />
    }
});


export default SearchBox;