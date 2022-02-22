import React from 'react';
import { v4 as uuid } from 'uuid';
// == Import
import Compteur from '../Compteur';
import Form from '../Form';
import List from '../List';

import './styles.css';

// == Composant
class App extends React.Component {

  state = {
    inputText: '',
    todos: [],
  };

  componentDidMount() {
    const backupString = localStorage.getItem('todos');
    if (backupString) {
      const backupTodos = JSON.parse(backupString);
      this.setState({
        todos: backupTodos,
      });
    }
  }

  handleInputChange = (text) => {
    this.setState({
      inputText: text,
    });
  }

  handleFormSubmit = () => {
    const { inputText, todos } = this.state;
    if (!inputText) return;
    const newTodo = {
      id: uuid(),
      label: inputText,
      done: false,
    };

    const newTodoList = [newTodo, ...todos];
    const backupString = JSON.stringify(newTodoList);
    localStorage.setItem('todos', backupString);
    this.setState({
      todos: newTodoList,
      inputText: '',
    })
  }

  handleTodoClick = (todoCliquee) => {
    const {todos} = this.state;
    const newTodos = todos.map((todoOriginale) => {
      if (todoOriginale.id === todoCliquee.id) {
        return {
          ...todoOriginale,
          done: !todoOriginale.done,
        };
      }
      return todoOriginale;
    });
    this.setState({
      todos: newTodos
    });
  };

  getNoteDoneTodos = () => {
    const { todos } = this.state;
    const notDoneTodos = todos.filter((todoOriginale) => todoOriginale.done === false);
    return notDoneTodos.length;
  };

  getOrderedTodos = () => {
    const { todos } = this.state;
    const notDone = todos.filter((todo) => todo.done === false);
    const done = todos.filter((todo) => todo.done === true);
    return [...notDone, ...done];
  };

  render(){
    const { inputText } = this.state;
    return (
      <div className="app">
        <Form
        inputText={inputText}
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleFormSubmit}
        />
        <Compteur total={this.getNoteDoneTodos()} />
        <List
        todos={this.getOrderedTodos()}
        onTodoClick={this.handleTodoClick}
        />
      </div>
    );
  }
}

// == Export
export default App;
