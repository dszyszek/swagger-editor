import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

const JsonTree = (props) => {
    // This component will prepare tree view (ready to render)
    

    const spansToRender = [];

    // this piece of code will add span elements to right place (where error occurred)
    if (props.data && props.lintError) {
        props.data.map((branch, index) => {     // loop over tree-skeleton object
    
                props.lintError.map(err => {

                        let errPath = [...err.path];        // save content of current lintError.err object, to not mutate its state
                        errPath.push('dummy_content');     // this 'dummy_content' thing (which may look stupid at first) is just because I need err.path.reduce to loop over all paths including last one (without it last path would be returned from .reduce() method)
                        
                        // check if path of current lintError.err object is same as the <li> path (if yes, then prepare it to add)
                        errPath.reduce((prev, next) => {

                            if (prev === branch.path) {

                                spansToRender.push(<span 
                                    key={index + Math.random()*1000}
                                    data-id={branch.path}   // data-id attribute is for comparison reason (to match it with proper <li>)
                                    className={classnames(
                                    'float-right',
                                    'dot',
                                        {
                                        'warningClass': err.severityLabel === 'warn',   // add proper class conditionally 
                                        'errorClass':  err.severityLabel === 'error'
                                        }
                                    )} 
                                    style={{marginTop: '3%'}}
                                >
                                </span>);                                
                            }
                            return prev + '.' + next;
                        });
                });

        });
    }
    
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
                    {spansToRender.map(s => {

                        if (s.props['data-id'] === branch.path) {
                            return s;
                        }
                    })}
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



                    