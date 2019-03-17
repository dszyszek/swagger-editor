import React from 'react';

class LeftPane extends React.Component {
    // This component will render tree view of JSON input

    constructor() {
        super();

    }

    render() {

        return (
            <div className="col-3 LeftPane_body" style={{maxHeight: '100%'}}>
                <div className='row h-5 LeftPane_label'>
                    <p className='text-center mx-auto my-1'>Tree view</p>
                </div>
            </div>
        );
        
    }
}

export default LeftPane;