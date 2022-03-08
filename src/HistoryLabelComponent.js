import React, { Component } from 'react';

// HistoryLabelComponent class Component
class HistoryLabelComponent extends Component {
    
    // render function of HistoryLabelComponent component class
    render() {

        // declaring "history" as a 'props' variable
        let { history } = this.props;
        
        // return satement returning the desired Html Code
        return (
            <div className="history">
                <p >{history}</p>
            </div>
        );
    }
}

// exporting the HistoryLabelComponent component
export default HistoryLabelComponent;