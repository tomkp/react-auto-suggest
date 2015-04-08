import expect from 'expect.js';
import React from 'react/addons';
let { TestUtils } = React.addons;


export default class Asserter {


    constructor(autoSuggest) {
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

    pressArrowLeft() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 37});
        return this;
    }

    pressArrowUp() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 38});
        return this;
    }

    pressArrowRight() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 39});
        return this;
    }

    pressArrowDown() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 40});
        return this;
    }

    pressEscape() {
        TestUtils.Simulate.keyDown(this.searchBox, {keyCode: 27});
        return this;
    }

    pressEnter() {
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