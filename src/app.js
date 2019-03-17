import React from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import {connect} from 'react-redux';

import {getCurrentState} from './actions/jsonActions';

import './styles/styles.scss';
import img from '../dist/img/cursor.png';

class App extends React.Component {
    constructor() {
      super();
    
        this.state = {
            textarea: ''
          }
    }

    componentWillMount() {
      this.props.getCurrentState();
    }
  
    render() {
        return (
          <div className="container mt-3" style={{height: '90%'}}>

            <div className='row text-center header'>
                <p className='m-auto d-inline-block w-100 m-0' style={{color: 'white', fontSize: '10px'}}>SWAGGER EDITOR</p>
            
            </div>

            <div className="row" style={{height: '97%'}}>

                <LeftPane  />
                <RightPane />


            </div>
          </div>
   
        );
    }
  }

  const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(mapStateToProps, {getCurrentState})(App);