import React from 'react';



let Suggestion = React.createClass({

    render() {
        let suggestion = this.props.suggestion;
        let classes = ['Suggestion'];
        let selected = this.props.selected;
        if (selected) {
            classes.push('selected');
        }
        return (
            <div className={classes.join(' ')} data-suggestion={suggestion}>
                {suggestion}
            </div>
        );
    }
});


export default Suggestion;