jest.dontMock('../AutoSuggest');

var React = require('react/addons');
var TU = React.addons.TestUtils;
var AutoSuggest = require('../AutoSuggest');


describe('AutoSuggest', function() {


    var fetchSuggestions = function() {
        console.info('fetchSuggestions');
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
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).toEqual('block');
    });


    it('should display the suggestions when the DropDown is displayed', function() {
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        console.info('dropDown.getDOMNode()', dropDown.getDOMNode().innerHTML);
        var children = dropDown.getDOMNode().children;
        expect(children[0].innerHTML).toEqual('one');
        expect(children[1].innerHTML).toEqual('two');
        expect(children[2].innerHTML).toEqual('three');
        expect(children.length).toEqual(3);
    });


    /*it('renders text', function() {
        console.info('renders');
        var searchBox = TU.findRenderedDOMComponentWithClass(component, 'SearchBox');
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});
        //TU.Simulate.keyDown(searchBox.getDOMNode(), {key: "Enter"});
        //expect(searchBox.getDOMNode().getAttribute('value')).toEqual('X');
        expect(searchBox.getDOMNode().textContent).toEqual('X');
    });*/



});