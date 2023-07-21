import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from './components/create-todo.component';
import EditTodo from './components/edit-todo.component';
import TodosList from './components/todos-list.component';

import logo from "./logo.png"

function App() {
  return (
    <Router>
      <div className="container">

        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href="https://treemote.xyz/matt/" target="_blank">
            <img src={logo} width="30" height="30" alt="Matt's website" />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>



        <Routes>
          <Route path="/" element={<TodosList/>}></Route>
          <Route path="/edit/:id" element={<EditTodo/>}></Route>
          <Route path="/create" element={<CreateTodo/>}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
//note