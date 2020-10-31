import { Component } from "react"

class Display extends Component {
  render() {
    return (
      <div id="output">
        <div id="formula">{this.props.formula}</div>
        <div id="display">{this.props.display}</div>
      </div>
    )
  }
}

export default Display