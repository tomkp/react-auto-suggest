import React from 'react';


let suggestions = [
    'chicken', 'duck', 'elephant', 'zebra', 'penguin', 'dog', 'cat', 'crocodile'
];


let SearchBox = React.createClass({


    getInitialState() {
        return {
            value: ''
        }
    },

    componentDidMount() {
        this.refs.searchBox.getDOMNode().focus();
    },


    keyDown(event) {
        console.info('SearchBox.keyDown');
        let keys = [13,27,38,39,40];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.props.handleSpecial(event.keyCode);
        }
    },


    handleChange(event) {
        console.info('SearchBox.handleChange', event, event.keyCode);
        this.setState({
            value: event.target.value
        });
        let keys = [13,27,38,39,40];
        if (keys.indexOf(event.keyCode) === -1) {
            let inputtedTerm = this.refs.searchBox.getDOMNode().value;
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


let DropDown = React.createClass({

    handleClick(event) {
        console.info('DropDown.handleClick');
        let suggestion = event.target.getAttribute('data-suggestion');
        this.props.handleClick(suggestion);
    },

    render() {
        console.info('DropDown.render', this.props.suggestions);
        let index = this.props.index;
        let entries = this.props.suggestions
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


let AutoSuggest = React.createClass({

    propTypes: {
        onSuggestion: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            suggestions: [],
            displayDropDown: false,
            index: -1
        }
    },


    handleTerm(term) {
        console.info('AutoSuggest.handleTerm', term);
        this.setState({
            index: -1,
            term: term,
            suggestions: suggestions,
            displayDropDown: true
        });
    },


    handleClick(term) {
        console.info('AutoSuggest.handleClick', term);
        this.setState({
            index: -1,
            term: term,
            suggestions: suggestions,
            displayDropDown: false
        });
        this.triggerSuggestion(term);
    },


    triggerSuggestion: function (suggestion) {
        this.props.onSuggestion(suggestion);
    },


    handleSpecial(code) {
        console.info('AutoSuggest.handleSpecial');
        let length = this.state.suggestions.length;
        let index = this.state.index;
        let displayDropDown = true;
        let term;

        if (code === 13) {
            // enter
            displayDropDown = false;
            this.triggerSuggestion(this.state.term);
        } else if (code === 27) {
            // esc
            index = -1;
            displayDropDown = false;
        } else if (code === 38) {
            // up
            if (index === -1) {
                index = length - 1;
            } else {
                index--;
            }
        } else if (code === 39) {
            // right
        } else if (code === 40) {
            // down
            if (index === length - 1) {
                index = -1;
            } else {
                index++;
            }
        }

        term = index === -1?this.state.term:this.state.suggestions[index];
        this.setState({
            index: index,
            term: term,
            displayDropDown: displayDropDown
        })
    },


    render() {
        console.info('AutoSuggest.render');
        return (
            <div className="AutoSuggest">
                <SearchBox
                    handleTerm={this.handleTerm}
                    handleSpecial={this.handleSpecial}
                    displayTerm={this.state.term}
                />
                <DropDown key="dropdown"
                    handleClick={this.handleClick}
                    suggestions={this.state.suggestions}
                    display={this.state.displayDropDown}
                    index={this.state.index}
                />
            </div>
        );
    }
});


module.exports = AutoSuggest;
