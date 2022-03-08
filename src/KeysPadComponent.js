import React, { Component } from 'react';

// KeysPadComponent class Component
class KeysPadComponent extends Component {

    // render function of KeysPadComponent component class
    render() {

        // return satement returning the desired Html Code
        // all buttons use an onClick event handler with 
        // a callback arrow function returning the button 'name' property as props
        return (
            <div className="button">
                <button name="DEL"onClick={e => this.props.onClick(e.target.name)}>DEL</button>
                <button name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
                <button name="C" onClick={e => this.props.onClick(e.target.name)}>C</button>
                <button name="%" onClick={e => this.props.onClick(e.target.name)}>%</button>
                <br />
                <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
                <button name="+" onClick={e => this.props.onClick(e.target.name)}>+</button>
                <br />
                <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
                <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button>
                <br />
                <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
                <button name="*" onClick={e => this.props.onClick(e.target.name)}>x</button>
                <br />
                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
                <button name="/" onClick={e => this.props.onClick(e.target.name)}>/</button>
                <br />
            </div>
        );
    }
}

// exporting the KeysPadComponent component
export default KeysPadComponent;