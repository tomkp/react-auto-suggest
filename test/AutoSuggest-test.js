
import React from 'react/addons';
import AutoSuggest from '../src/AutoSuggest';
import Asserter from './assertions/Asserter';
import chai from 'chai';

const { TestUtils } = React.addons;
const expect = chai.expect;



describe('AutoSuggest', () => {


    const fetchSuggestions = function(value, callback) {
        callback(['one', 'two', 'three']);
    };


    const onSuggestion = function(suggestion) {
        console.info('onSuggestion', suggestion);
    };


    it('should render', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest);
    });


    it('should not display the DropDown', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .assertDropDownNotDisplayed()
        ;
    });


    it('should display the DropDown when text is entered', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .assertDropDownNotDisplayed()
            .enterNewValue('C').assertDropDownDisplayed()
        ;
    });


    it('should display the suggestions when the DropDown is displayed', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should select the next suggestion when the down key is pressed', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C').assertSelectedSuggestion()
            .pressArrowDown().assertSelectedSuggestion('one')
            .pressArrowDown().assertSelectedSuggestion('two')
            .pressArrowDown().assertSelectedSuggestion('three')
            .pressArrowDown().assertSelectedSuggestion()
            .pressArrowDown().assertSelectedSuggestion('one')
        ;
    });


    it('should select the previous suggestion when the up key is pressed', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C').assertSelectedSuggestion()
            .pressArrowUp().assertSelectedSuggestion('three')
            .pressArrowUp().assertSelectedSuggestion('two')
            .pressArrowUp().assertSelectedSuggestion('one')
            .pressArrowUp().assertSelectedSuggestion()
            .pressArrowUp().assertSelectedSuggestion('three')
        ;
    });


    it('should display entered text', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat').assertValue('cat');
    });


    it('should pass entered text to suggestions function', function(done) {
        const fetchSuggestions = function(suggestion) {
            expect(suggestion).to.equal('cat');
            done();
        };

        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat').assertValue('cat');
    });


    it('should hide the dropdown when the esc key is pressed', function() {
        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        new Asserter(autoSuggest)
            .enterNewValue('cat').assertDropDownDisplayed()
            .pressEscape().assertDropDownNotDisplayed()
    });


    it('should allow custom dropdowns', function() {
        const CustomSuggestionRenderer = React.createClass({
            render() {
                return <div className="Suggestion">{this.props.suggestion}</div>;
            }
        });

        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should allow custom dropdowns for arrays of json', function() {
        const fetchSuggestions = function(value, callback) {
            callback([{title:'one'}, {title:'two'}, {title:'three'}]);
        };

        const CustomSuggestionRenderer = React.createClass({
            render() {
                return <div className="Suggestion" data-suggestion={this.props.suggestion.title}>{this.props.suggestion.title}</div>;
            }
        });

        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });



    it('should handle displaying term from custom dropdowns', function() {
        const fetchSuggestions = function(value, callback) {
            callback([{title:'cow'}, {title:'cat'}, {title:'chicken'}]);
        };

        const onSelect = function(suggestion) {
            return suggestion.title;
        };

        const CustomSuggestionRenderer = React.createClass({
            render() {
                let classes = ['Suggestion', this.props.selected?'selected':''];
                const suggestion = this.props.suggestion;
                return <div className={classes.join(' ')} data-suggestion={suggestion.title}>{suggestion.title}</div>;
            }
        });

        const autoSuggest = TestUtils.renderIntoDocument(
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion} onSelect={onSelect}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        new Asserter(autoSuggest)
            .enterNewValue('c').assertValue('c').assertSuggestions(['cow', 'cat', 'chicken'])
            .pressArrowDown().assertValue('cow')
            .pressArrowDown().assertValue('cat')
            .pressArrowDown().assertValue('chicken')
            .pressArrowDown().assertValue('c')
        ;
    });
});
