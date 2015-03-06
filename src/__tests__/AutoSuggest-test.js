jest.dontMock('../AutoSuggest');

var React = require('react/addons');
var TU = React.addons.TestUtils;
var AutoSuggest = require('../AutoSuggest');


describe('AutoSuggest', function() {

    var autoSuggest = TU.renderIntoDocument(
        <AutoSuggest />
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


    /*it('renders text', function() {
        console.info('renders');
        var searchBox = TU.findRenderedDOMComponentWithClass(component, 'SearchBox');
        TU.Simulate.change(searchBox.getDOMNode(), {target: {value: 'X'}});
        //TU.Simulate.keyDown(searchBox.getDOMNode(), {key: "Enter"});
        //expect(searchBox.getDOMNode().getAttribute('value')).toEqual('X');
        expect(searchBox.getDOMNode().textContent).toEqual('X');
    });*/



});