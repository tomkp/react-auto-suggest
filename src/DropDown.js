import React from 'react/addons';
import Suggestion from './Suggestion';



let DropDown = React.createClass({

    onClick(suggestion) {
        this.props.onClick(suggestion);
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
                            onClick: this.onClick
                        });
                    } else {
                        return <Suggestion key={i} suggestion={suggestion} selected={selected} onClick={this.onClick} />
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