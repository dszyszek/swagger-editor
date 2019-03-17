import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

const JsonTree = (props) => {
    // This component will prepare tree view (ready to render)

    
    return (
            <ul
                style={{width: '100%', marginLeft: 0, marginTop: '0px', paddingLeft: '10px', paddingTop: 0, paddingBottom: 0}}
            >
            {props.data.map((branch, index) => {

                return (<li 
                    key={index}
                    style={{color: 'white', listStyleType: 'none', marginLeft: '0px'}}
                    className='d-inline'
                    data-id={branch.path}
                >
    
                    {isEmpty(branch.name) ? null : branch.name}     {/* prevent returning empty object as label in tree (this would crash whole app) */}  
                    {branch.children && (
                    <JsonTree data={branch.children} lintError={props.lintError} />  // repeat process recursively for nested objects in props.data 
                    )}


                </li>
            )
            }
            )}
        </ul>  
        

    );
};

export default JsonTree;
