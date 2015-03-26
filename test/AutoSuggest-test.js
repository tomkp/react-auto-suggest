import expect from 'expect.js';
import React from 'react/addons';
let { TestUtils } = React.addons;

import AutoSuggest from '../src/AutoSuggest';


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


    it('should display entered text', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat')
            .assertValue('cat');
    });


    it('should pass entered text to suggestions function', function(done) {

        var callback = function(suggestion) {
            expect(suggestion).to.equal('cat');
            done();
        };

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={callback} onSuggestion={onSuggestion}/>
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

        var Suggestion = React.createClass({
            render() {
                return <div className="Suggestion">{this.props.suggestion}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <Suggestion />
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

        var Suggestion = React.createClass({
            render() {
                return <div className={this.props.className} data-suggestion={this.props.suggestion.title}>{this.props.suggestion.title}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <Suggestion />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C')
            .assertSuggestions(['one', 'two', 'three'])
        ;
    });


/*
    TODO

    it('should handle displaying term from custom dropdowns', function() {

        var fetchSuggestions = function(value, callback) {
            callback([{title:'one'}, {title:'two'}, {title:'three'}]);
        };

        var Suggestion = React.createClass({

            render() {
                var suggestion = this.props.suggestion;
                return <div className="Suggestion" data-suggestion={suggestion.title}>{suggestion.title}</div>;
            }
        });

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <Suggestion />
            </AutoSuggest>
        );

        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        var suggestions = TestUtils.scryRenderedDOMComponentsWithClass(autoSuggest, 'Suggestion');

        expect(suggestions[0].getDOMNode().innerHTML).to.equal('one');

        expect(searchBox.getDOMNode().value).to.equal('one');

    });
*/



});



class Asserter {

    constructor(autoSuggest) {
        this.autoSuggest = autoSuggest;
        this.searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        this.dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
    }

    assertValue(value) {
        expect(this.searchBox.getDOMNode().value).to.equal(value);
        return this;
    }

    enterNewValue(value) {
        TestUtils.Simulate.change(this.searchBox.getDOMNode(), {target: {value: value}});
        return this;
    }

    arrowLeft() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 37});
        return this;
    }

    arrowUp() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 38});
        return this;
    }

    arrowRight() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 39});
        return this;
    }

    arrowDown() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 40});
        return this;
    }

    esc() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 27});
        return this;
    }

    enter() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 13});
        return this;
    }

    assertDropDownDisplayed() {
        expect(this.dropDown.getDOMNode().style.display).to.equal('block');
        return this;
    }

    assertDropDownNotDisplayed() {
        expect(this.dropDown.getDOMNode().style.display).to.equal('none');
        return this;
    }

    assertNumberOfSuggestions(expectedNumberOfSuggestions) {
        var children = this.dropDown.getDOMNode().children;
        expect(children.length).to.equal(expectedNumberOfSuggestions);
        return this;
    }

    assertSuggestions(expectedSuggestions) {
        let suggestions = TestUtils.scryRenderedDOMComponentsWithClass(this.dropDown, 'Suggestion');
        var values = suggestions.map((suggestion) => {
            return suggestion.getDOMNode().innerHTML;
        });
        expect(values).to.eql(expectedSuggestions);
        return this;
    }

    assertSelectedSuggestion(expected) {
        let selected = TestUtils.scryRenderedDOMComponentsWithClass(this.dropDown, 'selected');
        if (expected) {
            expect(selected.length).to.equal(1);
            expect(selected[0].getDOMNode().innerHTML).to.equal(expected);
        } else {
            expect(selected.length).to.equal(0);
        }
        return this;
    }
}