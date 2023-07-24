import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => (
    <tr>
        <td><img src={"https://image.tmdb.org/t/p/w300"+props.movie.poster_path}/></td>
        <td>{props.movie.title}</td>
        <td>{props.movie.overview}</td>
        <td>
            <Link to={"/view/"+props.movie._id}>View</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: [],
                    movies: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                console.log(response.data);
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Movie movie={currentTodo} key={i} />;
        });
    }

    async hitMovieList() {
        const response = axios.get(
            "https://api.themoviedb.org/3/movie/popular?api_key=30e5cc4bad6f7de3f9215805730d8a4f&language=en-US&page=1"
        );
        console.log(response.data);
        this.setState({movies: response.data.results});
    }

    render() {
        return (
            <div>
                <h3>Trending Movies</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.hitMovieList() }
                    </tbody>
                </table>
                <h3>Movie List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}