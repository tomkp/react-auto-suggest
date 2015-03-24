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

    var autoSuggest = TestUtils.renderIntoDocument(
        <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
    );


    it('should render', function() {
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        expect(searchBox.getDOMNode().textContent).to.equal('');
    });


    it('should display the DropDown', function() {
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).to.equal('none');
    });


    it('should display the DropDown when text is entered', function() {
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        TestUtils.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        expect(dropDown.getDOMNode().style.display).to.equal('block');
    });


    it('should display the suggestions when the DropDown is displayed', function() {
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
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        var children = dropDown.getDOMNode().children;

        TestUtils.Simulate.change(searchBox, {target: {value: 'X'}});

        expect(children[0].className).to.equal('suggestion');
        expect(children[1].className).to.equal('suggestion');
        expect(children[2].className).to.equal('suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('suggestion selected');
        expect(children[1].className).to.equal('suggestion');
        expect(children[2].className).to.equal('suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('suggestion');
        expect(children[1].className).to.equal('suggestion selected');
        expect(children[2].className).to.equal('suggestion');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('suggestion');
        expect(children[1].className).to.equal('suggestion');
        expect(children[2].className).to.equal('suggestion selected');

        TestUtils.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).to.equal('suggestion');
        expect(children[1].className).to.equal('suggestion');
        expect(children[2].className).to.equal('suggestion');
    });


    it('should display entered text', function() {
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
        var searchBox = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TestUtils.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        TestUtils.Simulate.change(searchBox, {target: {value: 'X'}});
        expect(dropDown.getDOMNode().style.display).to.equal('block');
        TestUtils.Simulate.keyDown(searchBox, {keyCode: 27});
        expect(dropDown.getDOMNode().style.display).to.equal('none');
    });

});