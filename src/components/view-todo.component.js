import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewTodo = (props) => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/todos/${id}`)
            .then(response => {
                console.log(response.data);
                setMovie(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    const onDelete = async (e) => {
        axios.post(`http://localhost:4000/todos/delete/${id}`)
            .then(res =>  {
                console.log(res.data);
                window.location = '/';
            }).catch(err => console.log(err));
    }

    return (
        <div align="center">
            <h3>{movie.title}</h3>
            <img src={"https://image.tmdb.org/t/p/w300"+movie.poster_path} alt={movie.title+"Poster"}/>
            <h4 class="movieInfo">Overview</h4>{movie.overview}
            <br/><br/>
            <input type="Button" value="Delete" onClick={onDelete} className="btn btn-primary"/>
        </div>
    )
}

export default ViewTodo;