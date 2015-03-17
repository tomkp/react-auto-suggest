import React from 'react';


let DropDown = React.createClass({

    handleClick(event) {
        console.info('DropDown.handleClick');
        let suggestion = event.target.getAttribute('data-suggestion');
        this.props.handleClick(suggestion);
    },

    render() {
        console.info('DropDown.render', this.props.suggestions);
        let index = this.props.index;
        let suggestions = this.props.suggestions;
        let entries = suggestions
            .map((suggestion, i) => {
                let classes = ['suggestion'];
                if (i === index) {
                    classes.push('selected');
                }
                return (
                    <div className={classes.join(' ')}
                        onClick={this.handleClick}
                        data-suggestion={suggestion}
                        key={suggestion}>
                        {suggestion}
                    </div>
                );
            });

        let styles = {
            display: this.props.display ? 'block' : 'none'
        };

        return <div className="DropDown" style={styles}>{entries}</div>;
    }
});


export default DropDown;