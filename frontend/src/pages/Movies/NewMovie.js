import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useFetchMovies } from '../../components/Hooks/useFetchMovies';
import { Movie } from '../../components/Movie';
import logo from './logo.svg';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function NewMovie() {
    return (
        <div className="Movies-container">
            <h1>This page displays the movies</h1>
            <AddMovieForm />
            <UsersTable />
        </div>
    );
}

export default NewMovie;
