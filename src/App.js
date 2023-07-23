import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import ViewTodo from "./components/view-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.png";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="https://treemote.xyz/matt/" target="_blank">
                            <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
                        </a>
                        <Link to="/" className="navbar-brand">Barrington Movie App</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Movies</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Add Movie</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Routes>
                        <Route path="/" exact element={<TodosList/>} />
                        <Route path="/view/:id" exact element={<ViewTodo/>} />
                        <Route path="/create" element={<CreateTodo/>} />
                    </Routes>

                </div>
            </Router>
        );
    }
}

export default App;