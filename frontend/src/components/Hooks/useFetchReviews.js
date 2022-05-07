import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchReviews = id => {
    const [reviews, setReviews] = useState(null);
    const [reviewsLoadingError, setReviewsLoadingError] = useState(null);

    useEffect(() => {
        if (id) {
            const url = `${process.env.REACT_APP_BACKDEND_URL}/reviews/${id}/`;
            axios
                .get(url)
                .then(response => {
                    if (response.data) {
                        if (response.data.reviews) {
                            setReviews(response.data.reviews);
                        }
                    }
                })
                .catch(error => {
                    setReviewsLoadingError(
                        'An error occured while fetching reviews.'
                    );
                });
        }
    }, [id]);

    return { reviews: reviews, reviewsLoadingError: reviewsLoadingError };
};