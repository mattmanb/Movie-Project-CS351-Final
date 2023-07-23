import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

        this.state = {

            movie:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({movie:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onDelete(e){
        axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <h3 align="center">{this.state.movie.title}</h3>
               Modify me to display the movie info poster etc.
                <input type="Button" value="Delete" onClick={this.onDelete} className="btn btn-primary"/>
            </div>
        )
    }
}