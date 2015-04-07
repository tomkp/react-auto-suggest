import React from 'react/addons';
import Suggestion from './Suggestion';



let DropDown = React.createClass({

    handleClick(event) {
        let suggestion = event.target.getAttribute('data-suggestion');
        this.props.handleClick(suggestion);
    },


    render() {
        let index = this.props.index;
        let suggestions = this.props.suggestions;
        let renderer = this.props.renderer;
        let entries = [];
        if (suggestions && suggestions.length > 0) {
            entries = suggestions
                .map((suggestion, i) => {
                    let selected = (i === index);
                    if (renderer) {
                        return React.addons.cloneWithProps(renderer, {
                            selected: selected,
                            suggestion: suggestion,
                            key: i,
                            onClick: this.handleClick
                        });
                    } else {
                        return <Suggestion key={i} suggestion={suggestion} selected={selected} />
                    }
                });
        }
        let styles = {
            display: this.props.display ? 'block' : 'none'
        };
        return <div className={this.constructor.displayName} style={styles}>{entries}</div>;
    }
});


export default DropDown;