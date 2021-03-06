import React, { useEffect, useState } from 'react';
import './NewMovie.css';
import axios from 'axios';
import { useFetchMovies } from '../../components/Hooks/useFetchMovies';
import { Movie } from '../../components/Movie';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function NewMovie() {
    return (
        <div className="Movies-container">
            <AddMovieForm />
        </div>
    );
}

export default NewMovie;
