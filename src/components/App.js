import React from "react";
import Form from "./Form/Form";
import List from "./List/List";
import Buttons from "./Buttons/Buttons";
import Toast from "./Toast/Toast";
import Select from "./Select/Select";
import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    user: 0,
    filter: 1,
    toastText: "",
    todosLoading: false
  };

  fetchTodos = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data,
          todosLoading: false
        });
      });
  };

  componentDidMount() {
    this.fetchTodos();
  }

  deleteItem = index => {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== index),
      toastText: "Todo " + index + " successfully deleted"
    });
  };

  //check and unchecks a single to do 
  checkItem = index => {
    this.setState({
      todos: this.state.todos.map(m =>
        m.id === index ? { ...m, completed: !m.completed } : m
      ),
      toastText: this.state.todos.find(m => m.id === index).completed
        ? "Todo " + index + " added to waiting list"
        : "Todo " + index + " added to done list"
    });
  };

  newToDo = val => {
    const newId = Math.max(...this.state.todos.map(o => o.id)) + 1;
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: this.state.todos.length > 0 ? newId : 1,
          title: val,
          completed: false,
          userId: parseInt(this.state.user)
        }
      ],
      toastText: "Item " + newId + " successfully added"
    });
  };

  setFilter = val => {
    this.setState({
      filter: val
    });
  };

  handleSelect = e => {
    this.setState({
      user: e.target.value
    });
  };

  toastOut = () => {
    this.setState({
      toastText: ""
    });
  };

  renderListComponent = () => {
    let filteredData = [];
    switch (this.state.filter) {
      case 1:
        filteredData = this.state.todos;
        break;
      case 2:
        filteredData = this.state.todos.filter(t => t.completed);
        break;
      case 3:
        filteredData = this.state.todos.filter(t => !t.completed);
        break;
      default:
        filteredData = this.state.todos;
        break;
    }
    return (
      <List
        list={filteredData}
        user={this.state.user}
        deleteItem={this.deleteItem}
        checkItem={this.checkItem}
        loading={this.state.todosLoading}
      />
    );
  };

  render() {
    return (
      <div className="b-container">
        <h2 id="AppName">Bahruz's to do App</h2>
        <Form addToDo={this.newToDo} />
        <Buttons activeFilter={this.state.filter} setFilter={this.setFilter} />
        <Select selected={this.state.user} changeSelect={this.handleSelect} />
        <div id="toDoList">{this.renderListComponent()}</div>
        <Toast toastOut={this.toastOut} toastText={this.state.toastText} />
      </div>
    );
  }
}

export default App;
