import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@mui/material';
import { HALF_STAR_THRESHOLD } from '../../utility/Constants';

const FullStar = <StarIcon />;
const HalfStar = <StarHalfIcon />;
const EmptyStar = <StarBorderIcon />;

var StarArrayEx = new Array(10);
// StarArrayEx.fill(EmptyStar);

for (var i = 0; i < StarArrayEx.length; ++i) {
    StarArrayEx[i] = { id: i + 1 };
}
export default function MarkInput(props) {
    const [StarArray, setStarArray] = useState(StarArrayEx);
    const { mark, setMark } = props;

    return (
        <div className="flexDisplay">
            {StarArray.map((star, index) => (
                <div key={index}>
                    <IconButton
                        sx={{ padding: 0 }}
                        onClick={() => {
                            setMark(index + 1);
                        }}
                    >
                        {star.id <= mark ? FullStar : EmptyStar}
                    </IconButton>{' '}
                </div>
            ))}
        </div>
    );
}
