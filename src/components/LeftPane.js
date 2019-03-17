import React from 'react';
import {connect} from 'react-redux';

import {getCurrentState} from '../actions/jsonActions';
class LeftPane extends React.Component {
    // This component will render tree view of JSON input

    constructor() {
        super();

        this.state = {
            textarea: '',
            errorPosition: 0
        };

    }

    componentWillMount() {
        this.props.getCurrentState();
    }

    componentWillReceiveProps(newProps) {
        this.setState(old => ({
            ...old,
            ...newProps
        }));
    }

    render() {

        return (
            <div className="col-3 LeftPane_body" style={{maxHeight: '100%'}}>
                <div className='row h-5 LeftPane_label'>
                    <p className='text-center mx-auto my-1'>Tree view</p>
                </div>

                {this.state.errors && <p className='LeftPane_error_paragraph'>{this.state.errors.error.jsonError}</p>}
                {this.state.errors && <p className='LeftPane_error_paragraph'>{this.state.errors.error.dataError}</p>}
            </div>
        );
        
    }
}

const mapStateToProps = state => ({
    json: state.json,
    errors: state.errors
});

export default connect(mapStateToProps, {getCurrentState})(LeftPane);