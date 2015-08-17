import React from 'react';


let Suggestion = React.createClass({


    onClick(event) {
        let suggestion = this.props.suggestion;
        this.props.onClick(suggestion);
    },


    render() {
        let suggestion = this.props.suggestion;
        let classes = [this.constructor.displayName];
        let selected = this.props.selected;
        if (selected) {
            classes.push('selected');
        }
        return (
            <a className={classes.join(' ')} data-suggestion={suggestion} onClick={this.onClick}>
                {suggestion}
            </a>
        );
    }
});


export default Suggestion;