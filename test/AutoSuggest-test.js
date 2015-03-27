import expect from 'expect.js';
import React from 'react/addons';
let { TestUtils } = React.addons;

import AutoSuggest from '../src/AutoSuggest';

import Asserter from '../util/Asserter';



describe('AutoSuggest', function() {


    var fetchSuggestions = function(value, callback) {
        callback(['one', 'two', 'three']);
    };


    var onSuggestion = function(suggestion) {
        console.info('onSuggestion', suggestion);
    };


    it('should render', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest);
    });


    it('should not display the DropDown', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .assertDropDownNotDisplayed()
        ;
    });


    it('should display the DropDown when text is entered', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        new Asserter(autoSuggest)
            .assertDropDownNotDisplayed()
            .enterNewValue('C')
            .assertDropDownDisplayed()
        ;
    });


    it('should display the suggestions when the DropDown is displayed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should select the next suggestion when the down key is pressed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSelectedSuggestion()
            .arrowDown()
            .assertSelectedSuggestion('one')
            .arrowDown()
            .assertSelectedSuggestion('two')
            .arrowDown()
            .assertSelectedSuggestion('three')
            .arrowDown()
            .assertSelectedSuggestion()
            .arrowDown()
            .assertSelectedSuggestion('one')
        ;
    });


    it('should select the previous suggestion when the up key is pressed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSelectedSuggestion()
            .arrowUp()
            .assertSelectedSuggestion('three')
            .arrowUp()
            .assertSelectedSuggestion('two')
            .arrowUp()
            .assertSelectedSuggestion('one')
            .arrowUp()
            .assertSelectedSuggestion()
            .arrowUp()
            .assertSelectedSuggestion('three')
        ;
    });


    it('should display entered text', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat')
            .assertValue('cat');
    });


    it('should pass entered text to suggestions function', function(done) {
        var fetchSuggestions = function(suggestion) {
            expect(suggestion).to.equal('cat');
            done();
        };

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat')
            .assertValue('cat');
    });


    it('should hide the dropdown when the esc key is pressed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat')
            .assertDropDownDisplayed()
            .esc()
            .assertDropDownNotDisplayed()
    });


    it('should allow custom dropdowns', function() {
        var Custom = React.createClass({
            onSelect() {
                return this.props.suggestion;
            },
            render() {
                return <div className="Suggestion">{this.props.suggestion}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <Custom />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should allow custom dropdowns for arrays of json', function() {
        var fetchSuggestions = function(value, callback) {
            callback([{title:'one'}, {title:'two'}, {title:'three'}]);
        };

        var Custom = React.createClass({
            onSelect() {
                return this.props.suggestion.title;
            },
            render() {
                let classes = ['Suggestion'];
                if (this.props.selected) {
                    classes.push('selected');
                }
                return <div className={classes.join(' ')} data-suggestion={this.props.suggestion.title}>{this.props.suggestion.title}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <Custom />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSuggestions(['one', 'two', 'three'])
        ;
    });



    it('should handle displaying term from custom dropdowns', function() {
        var fetchSuggestions = function(value, callback) {
            callback([{title:'dog'}, {title:'cat'}, {title:'chicken'}]);
        };

        var onSelect = function(suggestion) {
            return suggestion.title;
        };

        var Custom = React.createClass({

            render() {
                let classes = ['Suggestion'];
                if (this.props.selected) {
                    classes.push('selected');
                }
                var suggestion = this.props.suggestion;
                return <div className={classes.join(' ')} data-suggestion={suggestion.title}>{suggestion.title}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion} access={onSelect}>
                <Custom />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('c')
            .assertValue('c')
            .assertSuggestions(['dog', 'cat', 'chicken'])
            .arrowDown()
            .assertValue('dog')
        ;
    });


});
