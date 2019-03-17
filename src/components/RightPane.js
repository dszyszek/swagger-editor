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
                toHighlight: ''
            };

            this.setValueOfInput = this.setValueOfInput.bind(this);
            this.validate = this.validate.bind(this);
            this.checkIfJson = this.checkIfJson.bind(this);
        }

        setValueOfInput(e) {
            this.setState({
                [e.target.name]: e.target.value.trim()
            });
            this.props.addToState(e.target.value);
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
                    
            </div>
            );
        }
    }

    const mapStateToProps = state => ({
        json: state.json,
        errors: state.errors
    });
    
    export default connect(mapStateToProps, {addToState, setError, getCurrentState, clearErrors})(RightPane);
