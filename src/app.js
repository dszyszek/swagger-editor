import React from 'react';

import './styles/styles.scss';
import img from '../dist/img/cursor.png';

class App extends React.Component {
    constructor() {
      super();
    
        this.state = {
            textarea: ''
          }
    }
  
    render() {
        return (
          <div className="container mt-3" style={{height: '90%'}}>

            <div className='row text-center header'>
              <p className='m-auto d-inline-block w-100 m-0' style={{color: 'white', fontSize: '10px'}}>SWAGGER EDITOR</p>
              
            </div>

            <div className="row" style={{height: '97%'}}>


            </div>
          </div>
   
        );
    }
  }

export default App;
