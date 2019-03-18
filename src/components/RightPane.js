import React from 'react';
import * as ReactDOM from "react-dom";
import {connect} from 'react-redux';
import * as _ from 'lodash';
import * as reactStringReplace from 'react-string-replace';
import classnames from 'classnames';

import {addToState, getCurrentState} from '../actions/jsonActions';
import {setError, clearErrors} from '../actions/errorActions';
import {diagnose} from '../utils/linting';

    class RightPane extends React.Component {

        constructor() {
            super();

            this.state = {
                textarea: '',
                toHighlight: '',
                fontSize: 12,
                errorBoxVisibility: true,
                cursor: {}
            };

            this.setValueOfInput = this.setValueOfInput.bind(this);
            this.validate = this.validate.bind(this);
            this.checkIfJson = this.checkIfJson.bind(this);
            this.preventNativeTab = this.preventNativeTab.bind(this);
            this.changeFontSize = this.changeFontSize.bind(this);
            this.changeVisibility = this.changeVisibility.bind(this);
            this.populateStatusErrors = this.populateStatusErrors.bind(this);
        }

        componentWillMount() {
            this.props.getCurrentState();
        }

        componentDidUpdate() {
            if (this.state.cursor.keycode === 9) {
                console.log('right tab clicked');
                ReactDOM.findDOMNode(this.refs.textareaElement).selectionEnd = this.state.cursor.position + 1;
            }
        }

        setValueOfInput(e) {
            this.setState({
                [e.target.name]: e.target.value.trim()
            });
            this.props.addToState(e.target.value);
        }

        preventNativeTab(event) {
            event.persist();
            const target = event.currentTarget; 

            if (event.keyCode === 9) {
                event.preventDefault(); 
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const finText = target.value.substring(0, start) + '\t' + target.value.substring(end);

                this.setState(prev => ({
                    ...prev,
                    textarea: finText,
                    cursor: {
                        position: end,
                        keycode: event.keyCode
                    }
                }));
                return;
            }
            console.log(event.keyCode);
            this.setState(prev => ({
                ...prev,
                cursor: {
                    keycode: event.keyCode
                }
            }));
        }

        changeFontSize(e) {
            const target = e.currentTarget;

            this.setState(prev => ({
                ...prev,
                fontSize: prev.fontSize + parseInt(target.getAttribute('val'))
            }));
        } 

        checkIfJson(jsonValue) {    // check if text from user input has a proper JSON format
            if (!jsonValue) {
                return;
            } 

            const objectPattern = /^\{.*\}$/gs;

            if (!objectPattern.exec(jsonValue.trim())) {
                this.props.setError({dataError: 'Pass valid JSON object!'}, 'SET_ERROR');
                return false;
            }

            return true;
        }

        changeVisibility(e) {           // toggle visibility of status box
            this.setState(prev => ({
                ...prev,
                errorBoxVisibility: !prev.errorBoxVisibility
            }));
        }

        populateStatusErrors(option) {      // this function will handle adding labels in status box
            if (option === 'error') {
                for (let o in this.props.errors.error) {
                    return (
                        <div className='text-center header' style={{width: '100%', height: '10%', borderBottom: '1px solid #272727', overflow: 'hidden'}}> <p style={{textAlign: 'center', lineHeight: '2.2rem', fontSize: '12px'}}> {this.props.errors.error[o]} </p> </div>
                    );
                }
            } else if (option === 'lintError') {

                return this.props.errors.lintError.map((e, i) => {
                    return <div 
                            className='text-center header' 
                            key={i} 
                            style={{width: '100%', height: '10%', borderBottom: '1px solid #272727', overflow: 'hidden'}} 
                            >
                                <p style={{textAlign: 'center', lineHeight: '2.2rem', fontSize: '12px'}}> {`Name: ${e.name}, Path: ${e.path.join('.') || '----'}`} </p> 
                            </div>
                });
            } else {
                return <div className='text-center header' style={{width: '100%', height: '10%', borderBottom: '1px solid #272727', overflow: 'hidden'}}> <p style={{textAlign: 'center', lineHeight: '2.2rem', fontSize: '12px'}}> Good job! </p> </div>;
            }
            
        }

        validate(event) {           // this function will choose wether to lint json input or terminate everything and throw error
            const jsonValue = this.state.textarea;

            if (!this.checkIfJson(jsonValue)){
                return;
            };
   
            try {
                const parsed = JSON.parse(jsonValue);
                const lintingResults = diagnose(parsed);

                this.props.setError(lintingResults.results, 'SET_LINT_ERROR');
            } catch (e) {

                const stringError =  String(e);
        
                // Get position of error to highlight
                const pattern = /[0-9]+/g;
                const errorPosition = pattern.exec(stringError);
                if (errorPosition) {
                    this.props.setError({jsonError: `Rendering terminated: syntax error on position: ${errorPosition} (check highlighted part)`}, 'SET_ERROR');
                }
                
                const min = Math.max(parseInt(errorPosition) - 30, 0);
                const max = Math.min(parseInt(errorPosition) + 30, this.state.textarea.length);

                const toHighlight = jsonValue.slice(min, max);
                this.setState(prev => ({
                    ...prev,
                    toHighlight
                }));
            }
        }

        render() {
            return (
            <div className="col-9 px-0">
                    <pre
                        className='m-0 normalizeElements normalizePre' // pre tag exists as 'shadow' of textarea; background color (while syntax error occurred) comes from there (the whole idea comes from a fact that <textarea> is not capable to highlight anything by default)
                        ref='preElement'
                        style={{fontSize: `${this.state.fontSize}px`}}
                    >
                        
                        {reactStringReplace(this.state.textarea, this.state.toHighlight, (match, i) => {
                            return <span key={i} style={{ backgroundColor: '#dd8686', color: '#dd8686' }}>{match}</span>
                        })}

                    </pre>

                    <textarea 
                        name='textarea' 
                        className='m-0 normalizeElements normalizeTextarea'
                        value={this.state.textarea} 
                        style={{fontSize: `${this.state.fontSize}px`}}
                        ref='textareaElement'
                        spellcheck="false"
                        onChange={e => {
                            this.props.clearErrors();
                            this.setValueOfInput(e);
                        }}
                        onKeyUp={e => {
                            this.validate(e);
                        }}
                        onKeyDown={this.preventNativeTab}
                        onScroll={e => {
                            ReactDOM.findDOMNode(this.refs.preElement).scrollTop = e.currentTarget.scrollTop; // synchronise scrollTop value of pre and textarea tags
                        }}
                    ></textarea>
                    
                    <div className='m-0 text-center viewButtonField'> 
                        <button val='1' className='w-50 h-100 p-0 m-0 viewButton' onClick={this.changeFontSize} disabled={this.state.fontSize >= 16}>+</button>
                        <button val='-1' className='w-50 h-100 p-0 m-0 viewButton' onClick={this.changeFontSize} disabled={this.state.fontSize <= 8}>-</button>
                    </div>

                    <div className='absoluteRightBottom'>
                        
                        <div 
                            className={classnames({
                                'd-none': this.state.errorBoxVisibility
                            })} 
                            style={{width: '100%', height: '92%', backgroundColor: '#565656', overflow: 'scroll', border: '2px solid #272727'}}
                        >
                            {!_.isEmpty(this.props.errors.error) ? this.populateStatusErrors('error') : (!_.isEmpty(this.props.errors.lintError) ? this.populateStatusErrors('lintError') : this.populateStatusErrors('good'))}

                        </div>
                        
                        <button className='m-0 pt-1 text-center statusBox' onClick={this.changeVisibility}> Status:
                            {
                                !_.isEmpty(this.props.errors.error) ?   // check if syntax errors exists
                                    ` ${Object.keys(this.props.errors.error).length} error`: // if yes, return how many
                                        (!_.isEmpty(this.props.errors.lintError) ?  // if not, check if lint errors exists
                                            ` ${Object.keys(this.props.errors.lintError).length} errors` :
                                                ' OK') // if everything above is false, then input text is in order
                            }
                        </button>
                    </div>
                    
            </div>
            );
        }
    }

const mapStateToProps = state => ({
    json: state.json,
    errors: state.errors
});

export default connect(mapStateToProps, {addToState, setError, getCurrentState, clearErrors})(RightPane);
