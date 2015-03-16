jest.dontMock('../AutoSuggest');

var React = require('react/addons');
var TU = React.addons.TestUtils;
var AutoSuggest = require('../AutoSuggest');


describe('AutoSuggest', function() {


    var fetchSuggestions = function() {
        return ['one', 'two', 'three'];
    };

    var onSuggestion = function(suggestion) {
        console.info('onSuggestion', suggestion);
    };

    var autoSuggest = TU.renderIntoDocument(
        <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
    );


    it('should render', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        expect(searchBox.getDOMNode().textContent).toEqual('');
    });


    it('should display the DropDown', function() {
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).toEqual('none');
    });


    it('should display the DropDown when text is entered', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');

        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        expect(dropDown.getDOMNode().style.display).toEqual('block');
    });


    it('should display the suggestions when the DropDown is displayed', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        var children = dropDown.getDOMNode().children;

        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});

        expect(children[0].innerHTML).toEqual('one');
        expect(children[1].innerHTML).toEqual('two');
        expect(children[2].innerHTML).toEqual('three');
        expect(children.length).toEqual(3);
    });


    it('should select the next suggestion when the down key is pressed', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        var children = dropDown.getDOMNode().children;

        TU.Simulate.change(searchBox, {target: {value: 'X'}});

        expect(children[0].className).toEqual('suggestion');
        expect(children[1].className).toEqual('suggestion');
        expect(children[2].className).toEqual('suggestion');

        TU.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).toEqual('suggestion selected');
        expect(children[1].className).toEqual('suggestion');
        expect(children[2].className).toEqual('suggestion');

        TU.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).toEqual('suggestion');
        expect(children[1].className).toEqual('suggestion selected');
        expect(children[2].className).toEqual('suggestion');

        TU.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).toEqual('suggestion');
        expect(children[1].className).toEqual('suggestion');
        expect(children[2].className).toEqual('suggestion selected');

        TU.Simulate.keyDown(searchBox, {keyCode: 40});

        expect(children[0].className).toEqual('suggestion');
        expect(children[1].className).toEqual('suggestion');
        expect(children[2].className).toEqual('suggestion');
    });


    it('should display entered text', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'cat'}});
        expect(searchBox.getDOMNode().value).toEqual('cat');
    });


});