
import React from 'react/addons';
import chai from 'chai';
const { TestUtils } = React.addons;
const expect = chai.expect;


export default class Asserter {


    constructor(jsx) {
        this.autoSuggest = TestUtils.renderIntoDocument(jsx);
        this.searchBox = TestUtils.findRenderedDOMComponentWithClass(this.autoSuggest, 'SearchBox');
        this.dropDown = TestUtils.findRenderedDOMComponentWithClass(this.autoSuggest, 'DropDown');
    }

    assertValue(value) {
        console.debug(`is the value ${value}?`);
        expect(this.searchBox.getDOMNode().value).to.equal(value);
        return this;
    }

    enterNewValue(value) {
        console.debug(`enter ${value}`);
        TestUtils.Simulate.change(this.searchBox.getDOMNode(), {target: {value: value}});
        return this;
    }

    pressArrowLeft() {
        console.debug(`press arrow left`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 37});
        return this;
    }

    pressArrowUp() {
        console.debug(`press arrow up`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 38});
        return this;
    }

    pressArrowRight() {
        console.debug(`press arrow right`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 39});
        return this;
    }

    pressArrowDown() {
        console.debug(`press arrow down`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 40});
        return this;
    }

    pressEscape() {
        console.debug(`press escape`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 27});
        return this;
    }

    pressEnter() {
        console.debug(`press enter`);
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 13});
        return this;
    }

    assertDropDownDisplayed() {
        console.debug(`drop down displayed?`);
        expect(this.dropDown.getDOMNode().style.display).to.equal('block');
        return this;
    }

    assertDropDownNotDisplayed() {
        console.debug(`is drop down not displayed?`);
        expect(this.dropDown.getDOMNode().style.display).to.equal('none');
        return this;
    }

    assertNumberOfSuggestions(expectedNumberOfSuggestions) {
        console.debug(`are there ${expectedNumberOfSuggestions} suggestions?`);
        var children = this.dropDown.getDOMNode().children;
        expect(children.length).to.equal(expectedNumberOfSuggestions);
        return this;
    }

    assertSuggestions(expectedSuggestions) {
        console.debug(`are the suggestions ${expectedSuggestions}?`);
        let suggestions = TestUtils.scryRenderedDOMComponentsWithClass(this.dropDown, 'Suggestion');
        var values = suggestions.map((suggestion) => {
            return suggestion.getDOMNode().innerHTML;
        });
        expect(values).to.eql(expectedSuggestions);
        return this;
    }

    assertSelectedSuggestion(expected) {
        console.debug(`is the selected suggestion ${expected}?`);
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