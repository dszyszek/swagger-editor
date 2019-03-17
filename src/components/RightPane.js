import React from 'react';
import {connect} from 'react-redux';

import {addToState, getCurrentState} from '../actions/jsonActions';
import {setError, clearErrors} from '../actions/errorActions';
import * as reactStringReplace from 'react-string-replace';


class RightPane extends React.Component {

        constructor() {
            super();

            this.state = {
                textarea: '',
                toHighlight: '',
                fontSize: 12
            };

            this.setValueOfInput = this.setValueOfInput.bind(this);
            this.validate = this.validate.bind(this);
            this.checkIfJson = this.checkIfJson.bind(this);
            this.preventNativeTab = this.preventNativeTab.bind(this);
            this.changeFontSize = this.changeFontSize.bind(this);
        }

        setValueOfInput(e) {
            this.setState({
                [e.target.name]: e.target.value.trim()
            });
            this.props.addToState(e.target.value);
        }

        preventNativeTab(event) {
            const target = event.currentTarget; 

            if (event.keyCode === 9) {
                event.preventDefault(); 
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const finText = target.value.substring(0, start) + '\t' + target.value.substring(end);

                this.setState(prev => ({
                    ...prev,
                    textarea: finText
                }));

            }
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

        validate(event) {           // this function will choose wether to lint json input or terminate everything and throw error
            const jsonValue = this.state.textarea;

            if (!this.checkIfJson(jsonValue)){
                return;
            };
   
            try {
                const parsed = JSON.parse(jsonValue);
                // const lintingResults = diagnose(parsed);


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
                        className='m-0 normalizeElements normalizePre'
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
                        ref='textareaElement'
                        style={{fontSize: `${this.state.fontSize}px`}}
                        onChange={e => {
                            this.props.clearErrors();
                            this.setValueOfInput(e);
                        }}
                        onKeyUp={e => {
                            this.validate(e);
                        }}
                        onScroll={e => {
                            ReactDOM.findDOMNode(this.refs.preElement).scrollTop = e.currentTarget.scrollTop; // synchronise scrollTop value of pre and textarea tags
                        }}
                    ></textarea>

                    <div className='m-0 text-center viewButtonField'> 
                        <button val='1' className='w-50 h-100 p-0 m-0 viewButton' onClick={this.changeFontSize} disabled={this.state.fontSize >= 16}>+</button>
                        <button val='-1' className='w-50 h-100 p-0 m-0 viewButton' onClick={this.changeFontSize} disabled={this.state.fontSize <= 8}>-</button>
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
