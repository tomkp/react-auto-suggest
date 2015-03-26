import React from 'react/addons';





let Suggestion = React.createClass({

    render() {
        //console.info('Suggestion.render', this.props.suggestion);
        var suggestion = this.props.suggestion;
        let classes = ['Suggestion'];
        if (this.props.selected) {
            classes.push('selected');
        }
        return (
            <div className={classes.join(' ')} data-suggestion={suggestion}>
                {suggestion}
            </div>
        );
    }
});


let DropDown = React.createClass({

    handleClick(event) {
        //console.info('DropDown.handleClick');
        let suggestion = event.target.getAttribute('data-suggestion');
        this.props.handleClick(suggestion);
    },

    render() {
        //console.info('DropDown.render', this.props.suggestions);
        let index = this.props.index;
        let suggestions = this.props.suggestions;
        let renderer = this.props.renderer;

        //console.info('renderer', renderer);

        let entries = [];

        if (suggestions && suggestions.length > 0) {

            entries = suggestions
                .map((suggestion, i) => {
                    let classes = ['Suggestion'];
                    let selected = (i === index);
                    if (selected) {
                        classes.push('selected');
                    }

                    if (renderer) {
                        //value = renderer
                        return React.addons.cloneWithProps(renderer, {
                            className: classes.join(' '),
                            suggestion: suggestion,
                            key: i,
                            onClick: this.handleClick
                        });
                    } else {
                        /*return (
                            <div onClick={this.handleClick}
                                 data-suggestion={suggestion}
                                 selected={selected}
                                 key={suggestion + i}>
                                {suggestion}
                            </div>
                        );*/
                        return <Suggestion key={i} suggestion={suggestion} selected={selected} />
                    }

                });
        }
        let styles = {
            display: this.props.display ? 'block' : 'none'
        };

        return <div className="DropDown" style={styles}>{entries}</div>;
    }
});


export default DropDown;