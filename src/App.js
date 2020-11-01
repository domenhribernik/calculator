import { Component } from "react"
import Buttons from "./Buttons"
import Display from "./Display"
import "./css/app.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      display: "0",
      formula: "",
      lastNum: ""
    } 
    this.handleNumbers = this.handleNumbers.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.handleEvaluation = this.handleEvaluation.bind(this)
  }

  handleNumbers(e) {
    e.preventDefault()
    var number = e.target.innerHTML
    this.setState(prevState => ({
      display: prevState.display === "0" ? number :
      prevState.formula.toString().length >= 9 ? "Digit limit met" : 
      prevState.formula.includes("=") ? number :
      ["+", "-", "*", "/"].includes(prevState.display) ? number : prevState.display + number,
      formula: prevState.formula === "0" || prevState.formula === "" ? number : 
      prevState.formula.toString().length >= 9 ? "Operation canceled" :
      prevState.formula.includes("=") ? number : prevState.formula + number,
      lastNum: prevState.display === "0" ? number : 
      prevState.formula.includes("=") ? number :
      ["+", "-", "*", "/"].includes(prevState.display) ? number : prevState.display + number
    }))
  }
  operation(operator) {
    this.setState(prevState => ({
      formula: prevState.formula === "" ? "0" + operator :
      prevState.formula === "Operation canceled" ? prevState.formula :
      prevState.formula.includes("=") ? prevState.formula.slice(this.state.formula.indexOf("=")+1) + operator :
      ["+", "*", "/"].includes(prevState.formula.slice(-2, -1)) && prevState.formula.slice(-1) === "-" ? prevState.formula.slice(0, -2) + operator :
      operator !== "-" && ["+", "-", "*", "/"].includes(prevState.formula.slice(-1)) ? prevState.formula.slice(0, -1) + operator :
      prevState.formula.slice(-1) === operator ? prevState.formula : prevState.formula + operator,
      display: prevState.display === "Digit limit met" ? prevState.display : operator,
      lastNum: "0"
    }))
  }
  handleOperator(e) {
    e.preventDefault()
    let operator = e.target.innerHTML
    switch (operator) {
      case "÷":
        operator = "/"
        this.operation(operator)
        break
      case "×":
        operator = "*"
        this.operation(operator)
        break
      case "+":
        this.operation(operator)
        break
      case "-":
        this.operation(operator)
        break    
      default:
        break
    }
  }
  handleClear(e) {
    e.preventDefault()
    this.setState({
      display: "0",
      formula: "",
      lastNum: "0"
    })
  }
  handleDecimal(e) {
    e.preventDefault()
    this.setState(prevState => ({
      display: prevState.display === "" ? "0." :
      prevState.display.slice(-1) === "." ? prevState.display : 
      parseFloat(prevState.display) === Math.round(parseFloat(prevState.display)) ? prevState.display + "." :
      prevState.display,
      lastNum: prevState.display === "" ? "0." :
      prevState.display.slice(-1) === "." ? prevState.display : 
      parseFloat(prevState.display) === Math.round(parseFloat(prevState.display)) ? prevState.display + "." :
      prevState.display,
      formula: prevState.formula === "" ? "0." :
      prevState.formula.slice(-1) === "." ? prevState.formula : 
      parseFloat(prevState.lastNum) === Math.round(parseFloat(prevState.lastNum)) ? prevState.formula + "." :
      prevState.formula
    }))
  }
  handleEvaluation(e) {
    e.preventDefault()
    var result
    if (this.state.formula.includes("=")) {
      result = this.state.formula.slice(this.state.formula.indexOf("=")+1)
    } else if(this.state.display === "Digit limit met") {
      result = "Digit limit met"
    } else if (["+", "-", "*", "/"].includes(this.state.formula.slice(-2, -1)) && this.state.formula.slice(-1) === "-") {
      this.setState(prevState => ({
        formula: prevState.formula.slice(0, -2)
      }))
      result = eval(this.state.formula.slice(0, -2))
    } else if (["+", "-", "*", "/"].includes(this.state.formula.slice(-1))) {
      result = eval(this.state.formula.slice(0, -1))
      this.setState(prevState => ({
        formula: prevState.formula.slice(0, -1)
      }))
    } else {
      result = eval(this.state.formula)
    }
    if (result !== "Digit limit met") {
      result = Math.round(result * 10000) / 10000
    }
    this.setState(prevState => ({
      display: prevState.formula === "" ? "0" : result,
      formula: prevState.formula === "" ? "" : 
      result === "Digit limit met" ? "Operation canceled" : 
      prevState.formula === result ? `${prevState.formula}=${prevState.formula}` :
      prevState.formula.includes("=") ? prevState.formula : `${prevState.formula}=${result}`,
      lastNum: ""
    }))
  }

  render() {
    return (
      <div className="container">
        <Display 
          display={this.state.display}
          formula={this.state.formula}
        />
        <Buttons 
          handleNumbers={this.handleNumbers}
          handleClear={this.handleClear}
          handleDecimal={this.handleDecimal}
          handleOperator={this.handleOperator}
          handleEvaluation={this.handleEvaluation}
        />
      </div>
    )
  }
}

export default App;