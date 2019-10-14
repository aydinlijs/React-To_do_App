import React from "react";
import "./Form.css";

class Form extends React.Component {
  state = {
    showError: false,
    newToDo: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.newToDo.trim().split("").length > 0) {
      this.props.addToDo(this.state.newToDo);
      this.setState({
        ...this.state,
        newToDo: ""
      });
    } else {
      this.setState({
        ...this.state,
        showError: true
      });
    }
  };

  handleInputChange = e => {
    this.setState({
      showError: false,
      newToDo: e.target.value
    });
  };

  renderError = () => {
    return this.state.showError ? (
      <small>Please insert a to-do description</small>
    ) : null;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex flexbw">
          <input
            placeholder="Description here..."
            value={this.state.newToDo}
            onChange={this.handleInputChange}
            type="text"
          />
          <button type="submit">Add</button>
        </div>
        {this.renderError()}
      </form>
    );
  }
}
export default Form;
