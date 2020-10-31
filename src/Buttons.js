import { Component } from "react"

class Buttons extends Component {
  render() {
    return (
      <div id="buttons">
        <div id="clear" onClick={this.props.handleClear}>AC</div>
        <div id="divide" onClick={this.props.handleOperator}>÷</div>
        <div id="multiply" onClick={this.props.handleOperator}>×</div>
        <div id="seven" onClick={this.props.handleNumbers}>7</div>
        <div id="eight" onClick={this.props.handleNumbers}>8</div>
        <div id="nine" onClick={this.props.handleNumbers}>9</div>
        <div id="add" onClick={this.props.handleOperator}>+</div>
        <div id="four" onClick={this.props.handleNumbers}>4</div>
        <div id="five" onClick={this.props.handleNumbers}>5</div>
        <div id="six" onClick={this.props.handleNumbers}>6</div>
        <div id="subtract" onClick={this.props.handleOperator}>-</div>  
        <div id="one" onClick={this.props.handleNumbers}>1</div>
        <div id="two" onClick={this.props.handleNumbers}>2</div>
        <div id="three" onClick={this.props.handleNumbers}>3</div>
        <div id="equals" onClick={this.props.handleEvaluation}>=</div>
        <div id="zero" onClick={this.props.handleNumbers}>0</div>
        <div id="decimal" onClick={this.props.handleDecimal}>.</div>
      </div>
    )
  }
}

export default Buttons

