import React from 'react';
import Form from './Form/Form';
import List from './List/List';
import Buttons from './Buttons/Buttons';
import Toast from './Toast/Toast';
import './App.css';

class App extends React.Component {
    state = {
        todos: [
            {
                index: 1,
                todo: "Learn react router",
                done: true
            },
            {
                index: 2,
                todo: "Dom render carousel problem",
                done: false
            }, {
                index: 3,
                todo: "To-do app",
                done: true
            }, {
                index: 4,
                todo: "Implement redux in a project",
                done: false
            }
        ],
        filter: 1,
        toast: false,
        toastText: "Item successfully added"
    }

    deleteItem = (index) => {
        this.setState({
            ...this.state,
            todos: this.state.todos.filter(t => t.index !== index),
            toast: true,
            toastText: "Item successfully deleted"
        })
    }
    checkItem = (index) => {
        this.setState({
            ...this.state,
            todos: this.state.todos.map(m =>
                m.index === index
                    ? { ...m, done: !m.done }
                    : m),
            toast: true,
            toastText: this.state.todos.filter(m => m.index === index)[0].done ? "Added to waiting list" : "Added to done list"
        })
    }

    newToDo = (val) => {
        this.setState({
            ...this.state,
            todos: [...this.state.todos, { index: this.state.todos.length > 0 ? Math.max.apply(Math, this.state.todos.map(o => o.index)) + 1 : 1, todo: val, done: false }],
            toast: true,
            toastText: "Item successfully added"
        })
    }

    setFilter = (val) => {
        this.setState({
            ...this.state,
            filter: val
        })
    }

    renderListComponent = () => {
        let filteredData = [];
        switch (this.state.filter) {
            case 1:
                filteredData = this.state.todos;
                break;
            case 2:
                filteredData = this.state.todos.filter(t => t.done);
                break;
            case 3:
                filteredData = this.state.todos.filter(t => !t.done);
                break;
            default:
                filteredData = this.state.todos;
                break;
        }
        return (
            <List list={filteredData} deleteItem={this.deleteItem} checkItem={this.checkItem} />
        )
    }

    toastOut = () =>{
        this.setState({
            ...this.state,
            toast: false
        })
    }

    render() {
        return (
            <div className="b-container">
                <h2 id="AppName">Bahruz's to do App</h2>
                <Form addToDo={this.newToDo} />
                <Buttons activeFilter={this.state.filter} setFilter={this.setFilter} />
                <div id="toDoList">
                    {this.renderListComponent()}
                </div>
                <Toast toastOut={this.toastOut} toast={this.state.toast} toastText={this.state.toastText}/>
            </div>
        )
    }
}

export default App;