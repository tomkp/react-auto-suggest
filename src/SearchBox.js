import React from 'react';


let SearchBox = React.createClass({


    componentDidMount() {
        this.refs.searchBox.getDOMNode().focus();
    },


    keyDown(event) {
        console.info('SearchBox.keyDown', event.keyCode);
        let keys = [13,27,38,39,40];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.props.handleSpecial(event.keyCode);
        }
    },


    handleChange(event) {
        console.info('SearchBox.handleChange', event.target.value);
        let keys = [13,27,38,39,40];
        let keyCode = event.keyCode;
        if (keys.indexOf(keyCode) === -1) {
            let inputtedTerm = event.target.value;
            this.props.handleTerm(inputtedTerm);
        }
    },


    render() {
        console.info('SearchBox.render');
        return <input ref="searchBox"
            className="SearchBox"
            onKeyDown={this.keyDown}
            onChange={this.handleChange}
            value={this.props.displayTerm} />
    }
});


export default SearchBox;