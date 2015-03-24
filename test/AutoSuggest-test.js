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
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        expect(searchBox.getDOMNode().textContent).to.equal('');

        new Asserter(autoSuggest)
            .assertValue('')
            .assertDropDownNotDisplayed()
            .enterNewValue('Tom')
            .assertDropDownDisplayed()
            .assertNumberOfSuggestions(3)
            .assertValue('')

    });



    class Asserter {

        constructor(autoSuggest) {
            //this.autoSuggest = autoSuggest;
            this.searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
            this.dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        }

        assertValue(value) {
            console.info('assertValue', value);
            expect(this.searchBox.getDOMNode().textContent).to.equal(value);
            return this;
        }

        enterNewValue(value) {
            console.info('enterNewValue', value);
            TestUtils.Simulate.change(this.searchBox.getDOMNode(), {target: {value: value}});
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
    }



    it('should display the DropDown', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).to.equal('none');
    });


    it('should display the DropDown when text is entered', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        expect(dropDown.getDOMNode().style.display).to.equal('block');
    });


    it('should display the suggestions when the DropDown is displayed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        var children = dropDown.getDOMNode().children;

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        expect(children[0].innerHTML).to.equal('one');
        expect(children[1].innerHTML).to.equal('two');
        expect(children[2].innerHTML).to.equal('three');
        expect(children.length).to.equal(3);
    });


    it('should select the next suggestion when the down key is pressed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        var children = dropDown.getDOMNode().children;

        TestUtils.Simulate.change(searchBox, {target: {value: 'X'}});

        expect(children[0].className).to.equal('Suggestion');
        expect(children[1].className).to.equal('Suggestion');
        expect(children[2].className).to.equal('Suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('Suggestion selected');
        expect(children[1].className).to.equal('Suggestion');
        expect(children[2].className).to.equal('Suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('Suggestion');
        expect(children[1].className).to.equal('Suggestion selected');
        expect(children[2].className).to.equal('Suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('Suggestion');
        expect(children[1].className).to.equal('Suggestion');
        expect(children[2].className).to.equal('Suggestion selected');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('Suggestion');
        expect(children[1].className).to.equal('Suggestion');
        expect(children[2].className).to.equal('Suggestion');
    });


    it('should display entered text', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'cat'}});
        expect(searchBox.getDOMNode().value).to.equal('cat');
    });


    it('should pass entered text to suggestions function', function(done) {

        var callback = function(suggestion) {
            expect(suggestion).to.equal('cat');
            done();
        };

        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={callback} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'cat'}});
        expect(searchBox.getDOMNode().value).to.equal('cat');
    });


    it('should hide the dropdown when the esc key is pressed', function() {
        var autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        TestUtils.Simulate.change(searchBox, {target: {value: 'X'}});
        expect(dropDown.getDOMNode().style.display).to.equal('block');
        TestUtils.Simulate.keyDown(searchBox, {keyCode: 27});
        expect(dropDown.getDOMNode().style.display).to.equal('none');
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

        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        var suggestions = TestUtils.scryRenderedDOMComponentsWithClass(autoSuggest, 'Suggestion');

        expect(suggestions[0].getDOMNode().innerHTML).to.equal('one');
        expect(suggestions[1].getDOMNode().innerHTML).to.equal('two');
        expect(suggestions[2].getDOMNode().innerHTML).to.equal('three');
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

        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        var suggestions = TestUtils.scryRenderedDOMComponentsWithClass(autoSuggest, 'Suggestion');

        expect(suggestions[0].getDOMNode().innerHTML).to.equal('one');
        expect(suggestions[1].getDOMNode().innerHTML).to.equal('two');
        expect(suggestions[2].getDOMNode().innerHTML).to.equal('three');
    });



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




});