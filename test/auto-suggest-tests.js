
import React from 'react/addons';
import AutoSuggest from '../src/AutoSuggest';
import asserter from './assertions/Asserter';
import chai from 'chai';

const { TestUtils } = React.addons;
const expect = chai.expect;



describe('AutoSuggest', () => {


    const fetchSuggestions = (value, callback) => {
        callback(['one', 'two', 'three']);
    };


    const onSuggestion = (suggestion) => {
        console.info('onSuggestion', suggestion);
    };


    it('should render', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest);
    });


    it('should not display the DropDown', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .assertDropDownNotDisplayed()
        ;
    });


    it('should display the DropDown when text is entered', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .assertDropDownNotDisplayed()
            .enterNewValue('C').assertDropDownDisplayed()
        ;
    });


    it('should display the suggestions when the DropDown is displayed', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should select the next suggestion when the down key is pressed', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('C').assertSelectedSuggestion()
            .pressArrowDown().assertSelectedSuggestion('one')
            .pressArrowDown().assertSelectedSuggestion('two')
            .pressArrowDown().assertSelectedSuggestion('three')
            .pressArrowDown().assertSelectedSuggestion()
            .pressArrowDown().assertSelectedSuggestion('one')
        ;
    });


    it('should select the previous suggestion when the up key is pressed', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('C').assertSelectedSuggestion()
            .pressArrowUp().assertSelectedSuggestion('three')
            .pressArrowUp().assertSelectedSuggestion('two')
            .pressArrowUp().assertSelectedSuggestion('one')
            .pressArrowUp().assertSelectedSuggestion()
            .pressArrowUp().assertSelectedSuggestion('three')
        ;
    });


    it('should display entered text', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('cat').assertValue('cat');
    });


    it('should pass entered text to suggestions function', (done) => {
        const fetchSuggestions = function(suggestion) {
            expect(suggestion).to.equal('cat');
            done();
        };

        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('cat').assertValue('cat');
    });


    it('should hide the dropdown when the esc key is pressed', () => {
        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}/>
        );

        asserter(autoSuggest)
            .enterNewValue('cat').assertDropDownDisplayed()
            .pressEscape().assertDropDownNotDisplayed()
    });


    it('should allow custom dropdowns', () => {
        const CustomSuggestionRenderer = React.createClass({
            render() {
                return <div className="Suggestion">{this.props.suggestion}</div>;
            }
        });

        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });


    it('should allow custom dropdowns for arrays of json', () => {
        const fetchSuggestions = function(value, callback) {
            callback([{title:'one'}, {title:'two'}, {title:'three'}]);
        };

        const CustomSuggestionRenderer = React.createClass({
            render() {
                return <div className="Suggestion" data-suggestion={this.props.suggestion.title}>{this.props.suggestion.title}</div>;
            }
        });

        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        asserter(autoSuggest)
            .enterNewValue('C').assertSuggestions(['one', 'two', 'three'])
        ;
    });



    it('should handle displaying term from custom dropdowns', () => {
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

        const autoSuggest = (
            <AutoSuggest suggestions={fetchSuggestions} onSuggestion={onSuggestion} onSelect={onSelect}>
                <CustomSuggestionRenderer />
            </AutoSuggest>
        );

        asserter(autoSuggest)
            .enterNewValue('c').assertValue('c').assertSuggestions(['cow', 'cat', 'chicken'])
            .pressArrowDown().assertValue('cow')
            .pressArrowDown().assertValue('cat')
            .pressArrowDown().assertValue('chicken')
            .pressArrowDown().assertValue('c')
        ;
    });
});
