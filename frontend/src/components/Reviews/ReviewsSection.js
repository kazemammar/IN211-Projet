import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';

export default function ReviewsSection() {
    return (
        <List /* className={classes.root} */>
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={'name'} />
                    </ListItemAvatar>
                    <ListItemText
                        // primary={
                        //     comment.author
                        //         .first_name
                        //         ? comment.author
                        //               .first_name +
                        //           ' ' +
                        //           comment.author
                        //               .last_name
                        //         : 'Unnamed'
                        // }
                        primary={'auteur'}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    // className={classes.inline}
                                    color="textPrimary"
                                >
                                    {'@' + 'username'}
                                </Typography>
                                {' — ' + 'review'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </>

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
                        >
                            <TextField
                                fullWidth
                                // value={comment}
                                size="small"
                                label="Your comment..."
                                // onChange={e => {
                                //     setComment(
                                //         e.target
                                //             .value
                                //     );
                                // }}
                            />
                        </form>
                    }
                />
            </ListItem>
        </List>
    );
}
