import React, { Component } from "react";
import "./App.css";
import ResultLabelComponent from "./ResultLabelComponent";
import KeysPadComponent from "./KeysPadComponent";
import HistoryLabelComponent from "./HistoryLabelComponent";

// window.onload puts focus and hides the <input/> on browser window load
window.onload = (e) => {
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
  document.getElementById("input").style.opacity = 0;
};

// window.onload and hides the <input/> on browser window click at any location
window.onclick = () => {
  document.getElementById("input").value = "";
  document.getElementById("input").focus();
};

// App class Component
class App extends Component {
  constructor() {
    super();

    // default setting of state variables
    this.state = {
      result: 0, //  for calculation result
      history: "", //  for calculation history
      optUsed: false, //  to check any operator used in calculation
      prevKey: "" //  for previous Keypress or ButtonPress value
    };
  }

  // maps key press to desired functionality on calculator
  // takes "key" as props from <input/>
  onKeyPress = (key) => {
    // available keys for calculation
    var patt = /^[0-9-*+/%]{1,5}$/;

    // checking if keyPess matches the above pattern
    var check = patt.test(key.target.value);

    // if keys are other than above pattern
    if (!check) {
      // if key is an "Enter" key or "=" key, then compute the result
      if (key.keyCode === 13 || key.target.value === "=") this.calculate();
      // if key is an "BackSpace" key, then delete the last character used in calculation
      else if (key.keyCode === 8) {
        this.delChar();
      }

      // if key is an "." key, then avoid the duplication of "." in single calculation
      else if (key.target.value === ".") {
        if (!this.state.result.toString().includes("."))
          this.setState({
            result: this.state.result + key.target.value
          });
      }
    }

    // if keys match the pattern : /^[0-9-*+/%]{1,5}$/
    else {
      // if key Pressed is : "-" or "*" or "+" or "/" or "%", meaning if it is an "operator"
      if (
        key.target.value === "+" ||
        key.target.value === "-" ||
        key.target.value === "*" ||
        key.target.value === "/" ||
        key.target.value === "%"
      ) {
        // if the "=" is pressed/clicked already then set the history accordingly
        if (this.state.history.includes("=")) {
          this.setState({
            history: this.state.result + key.target.value
          });
        }

        // if the last keyPress was the same operator then do nothing
        else if (this.state.prevKey === key.target.value) {
        }

        // if the last keyPress was a different operator then set the new operator in place of lastone
        else if (
          this.state.prevKey === "+" ||
          this.state.prevKey === "-" ||
          this.state.prevKey === "*" ||
          this.state.prevKey === "/" ||
          this.state.prevKey === "%"
        ) {
          this.setState({
            history: this.state.history.slice(0, -1) + key.target.value
          });
        }

        // if the last keyPress was not any operator then do calculation from "result and history"
        // and append sequence to "history" label and show calculation result on "result" label
        else {
          this.setState({
            history: this.state.history + this.state.result + key.target.value
          });

          this.setState({
            result: eval(this.state.history + this.state.result)
          });
        }

        // now it is clear that an operator is used in calculation, so set "optUsed" state to "true"
        this.setState({
          optUsed: true
        });
      }

      // if key Pressed is a number : [0-9]
      else {
        // if the calculation is already done, then enter a number for new calculation
        // removes all previous history and result should contain a new key
        if (this.state.history.includes("=")) {
          this.setState({
            history: "",
            result: key.target.value
          });
        }

        // if the operator is used in calculation, then enter a number for new calculation
        // and set "optUsed" state to false
        if (this.state.optUsed === true) {
          this.setState({
            result: key.target.value
          });
          this.setState({
            optUsed: false
          });
        }

        // if the operator is was not used in calculation, then append new key number to previous number
        else {
          // if result is not zero, then append new key number to previous number
          if (this.state.result !== 0) {
            this.setState({
              result: this.state.result + key.target.value
            });
          }

          // if result is zero, add new key number in place of zero
          else {
            this.setState({
              result: key.target.value
            });
          }
        }
      }

      // set state of "prevKey" to key Pressed from keyboard having pattern /^[0-9-*+/%]/
      this.setState({
        prevKey: key.target.value
      });
    }

    // As we are done with the single keyPress and operations on it
    // set input tag value to "" for the new keyPress
    document.getElementById("input").value = "";
  };

  // maps Button Click to desired functionality on calculator
  // takes "button" as props from <KeysPadComponent/>
  onClick = (button) => {
    // if button is "=", then compute the result
    if (button === "=") {
      this.calculate();
    }

    // if button is "C", then reset the whole calculation
    else if (button === "C") {
      this.reset();
    }

    // if button is "CE", then reset the input
    else if (button === "CE") {
      this.inputReset();
    }
    // if button is "DEL", then delete the last character used in calculation
    else if (button === "DEL") {
      this.delChar();
    }

    // if button is ".", then avoid the duplication of "." in single calculation
    else if (button === ".") {
      if (!this.state.result.toString().includes("."))
        this.setState({
          result: this.state.result + button
        });
    }

    // if button matches the pattern : /^[0-9-*+/%]$/
    else {
      // if button is : "-" or "*" or "+" or "/" or "%", meaning if it is an "operator"
      if (
        button === "+" ||
        button === "-" ||
        button === "*" ||
        button === "/" ||
        button === "%"
      ) {
        // if the "=" is already pressed/clicked then set the history accordingly
        if (this.state.history.includes("=")) {
          this.setState({
            history: this.state.result + button
          });
        }

        // if the last button was the same operator then do nothing
        else if (this.state.prevKey === button) {
        }

        // if the last button was a different operator then set the new operator in place of lastone
        else if (
          this.state.prevKey === "+" ||
          this.state.prevKey === "-" ||
          this.state.prevKey === "*" ||
          this.state.prevKey === "/" ||
          this.state.prevKey === "%"
        ) {
          this.setState({
            history: this.state.history.slice(0, -1) + button
          });
        }

        // if the last button was not any operator then do calculation from "result and history"
        // and append sequence to "history" label and show calculation result on "result" label
        else {
          this.setState({
            history: this.state.history + this.state.result + button
          });

          this.setState({
            result: eval(this.state.history + this.state.result)
          });
        }

        // now it is clear that an operator is used in calculation, so set "optUsed" state to "true"
        this.setState({
          optUsed: true
        });
      }

      // if button clicked is a number : [0-9]
      else {
        // if the calculation is already done, then enter a number for new calculation
        // removes all previous history and result should contain a new buttonKey
        if (this.state.history.includes("=")) {
          this.setState({
            history: "",
            result: button
          });
        }

        // if the operator is used in calculation, then enter a number for new calculation
        // and set "optUsed" state to false
        if (this.state.optUsed === true) {
          this.setState({
            result: button
          });
          this.setState({
            optUsed: false
          });
        }

        // if the operator is was not used in calculation, then append new key number to previous number
        else {
          // if result is not zero, then append new button number to previous number
          if (this.state.result !== 0) {
            this.setState({
              result: this.state.result + button
            });
          }
          // if result is zero, add new button number in place of zero
          else {
            this.setState({
              result: button
            });
          }
        }
      }

      // set state of "prevKey" to button from keyPad having pattern /^[0-9-*+/%]/
      this.setState({
        prevKey: button
      });
    }
  };

  // calculate the result if "=" or "Enter" is clicked or pressed
  calculate = () => {
    // if operators come consecutively with "-" operator then take abosulte value
    if (
      (this.state.history.slice(-1) === "+" ||
        this.state.history.slice(-1) === "-" ||
        this.state.history.slice(-1) === "/" ||
        this.state.history.slice(-1) === "*" ||
        this.state.history.slice(-1) === "%") &&
      Math.sign(this.state.result) === "-1"
    ) {
      this.setState({
        history:
          this.state.history + this.state.result.toString().slice(1) + "=",
        result: eval(this.state.history + Math.abs(this.state.result))
      });
    }

    // if calculation already done, then do nothing
    else if (this.state.history.includes("=")) {
    }

    // do calculation as desired and set 'history' and 'result' states accordingly
    else {
      this.setState({
        history: this.state.history + this.state.result + "=",
        result: eval(this.state.history + this.state.result)
      });
    }
  };

  // reset the whole calculation by setting 'history' and 'result' states accordingly
  reset = () => {
    this.setState({
      history: "",
      result: 0
    });
  };

  // reset the input by setting 'results' state to '0'
  inputReset = () => {
    this.setState({
      result: 0
    });
  };

  // delete the last character from the input by setting 'result' state accordingly using toString().slice(0, -1)
  delChar = () => {
    this.setState({
      result: this.state.result.toString().slice(0, -1)
    });
  };

  // render function of App component class
  render() {
    // return satement returning the desired Html Code
    return (
      <div>
        <input id="input" type="text" onKeyUp={this.onKeyPress} />
        <div className="cal-body">
          <h1>Standard Calculator</h1>
          <HistoryLabelComponent history={this.state.history} />
          <ResultLabelComponent result={this.state.result} />
          <KeysPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
// exporting the App component
export default App;
