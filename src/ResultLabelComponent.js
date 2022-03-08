import React, { Component } from 'react';

// ResultLabelComponent class Component
class ResultLabelComponent extends Component {
    
    // render function of ResultLabelComponent component class
    render() {
        
        // declaring "result" as a 'props' variable
        let { result } = this.props;
        
        // return satement returning the desired Html Code
        return (
            <div className="result">
                <p >{result}</p>
            </div>
        );
    }
}

// exporting the ResultLabelComponent component
export default ResultLabelComponent;
