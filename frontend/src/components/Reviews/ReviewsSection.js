import {
    Avatar,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useUser } from '../../contexts/UserContext';
import { useFetchReviews } from '../Hooks/useFetchReviews';
import MarkInput from './MarkInput';
import ReviewMark from './ReviewMark';

export default function ReviewsSection(props) {
    const { movie_id } = props;
    const { reviews, reviewsLoadingError, append } = useFetchReviews(movie_id);
    const { user } = useUser();

    const [myComment, setMyComment] = useState('');
    const [myMark, setMyMark] = useState(1);

    const postReview = () => {
        if (user) {
            const url = `${process.env.REACT_APP_BACKDEND_URL}/reviews/new`;
            const form = {
                user: user.id,
                mark: myMark,
                comment: myComment,
                movie: movie_id,
            };
            axios
                .post(url)
                .then(res => {
                    if (res.status === 200) {
                        setMyComment('');
                        append(form);
                    }
                })
                .catch(res => {
                    alert(res.message);
                });
        } else {
            alert('please connect to post a review');
        }
    };

    return (
        <>
            {reviewsLoadingError ? (
                <Typography>
                    There was an error while loading the reviews...
                </Typography>
            ) : (
                <List /* className={classes.root} */>
                    {reviews &&
                        reviews.map(review => (
                            <>
                                <ListItem alignItems="flex-start">
                                    <Grid container>
                                        <Grid item>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={
                                                        review.user.firstname +
                                                        ' ' +
                                                        review.user.lastname
                                                    }
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    review.user.firstname +
                                                    ' ' +
                                                    review.user.lastname
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            // className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {review.user.email}
                                                        </Typography>
                                                        {' — ' + review.comment}
                                                    </React.Fragment>
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            <ReviewMark mark={review.mark} />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        ))}

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={'name'} />
                        </ListItemAvatar>
                        <ListItemText
                            primary="You"
                            secondary={
                                <form
                                    noValidate
                                    // className={classes.form}
                                    autoComplete="off"
                                    onSubmit={postReview}
                                >
                                    <TextField
                                        fullWidth
                                        value={myComment}
                                        size="small"
                                        label="Your comment..."
                                        onChange={e => {
                                            setMyComment(e.target.value);
                                        }}
                                    />
                                </form>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <MarkInput mark={myMark} setMark={setMyMark} />
                    </ListItem>
                    <Button
                        variant="outlined"
                        onClick={postReview}
                        startIcon={<SendIcon />}
                    >
                        Submit a review
                    </Button>
                </List>
            )}
        </>
    );
}
