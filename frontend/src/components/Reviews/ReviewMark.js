import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { HALF_STAR_THRESHOLD } from '../../utility/Constants';

const FullStar = <StarIcon />;
const HalfStar = <StarHalfIcon />;
const EmptyStar = <StarBorderIcon />;

var StarArrayEx = new Array(10);
StarArrayEx.fill(EmptyStar);

export default function ReviewMark(props) {
    const [StarArray, setStarArray] = useState(StarArrayEx);
    const { mark } = props;
    const floor = Math.floor(mark);
    const decimal = mark - floor;
    StarArray.fill(FullStar, 0, floor);
    if (decimal >= HALF_STAR_THRESHOLD && floor < StarArray.length) {
        StarArray[floor] = HalfStar;
    }

    return (
        <div className="flexDisplay">
            {StarArray.map((star, index) => (
                <div key={index}>{star}</div>
            ))}
        </div>
    );
}
