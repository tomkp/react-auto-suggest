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


    it('renders', function() {
        console.info('renders');
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        expect(searchBox.getDOMNode().textContent).toEqual('');
    });


    it('DropDown not displayed', function() {
        console.info('DropDown not displayed');
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).toEqual('none');
    });


    it('DropDown displayed when text is entered', function() {
        console.info('DropDown displayed when text is entered');
        var searchBox = TU.findRenderedDOMComponentWithClass(autoSuggest, 'SearchBox');
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});
        var dropDown = TU.findRenderedDOMComponentWithClass(autoSuggest, 'DropDown');
        expect(dropDown.getDOMNode().style.display).toEqual('block');
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