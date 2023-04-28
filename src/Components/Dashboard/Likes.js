import { ThumbUpAltRounded } from '@material-ui/icons';
import React, { useState } from 'react';

function LikeButton({ isLiked }) {
    return (
        <button className="button_def">
            {isLiked ? (
                <ThumbUpAltRounded className="is_like_icon" />
            ) : (
                <ThumbUpAltRounded className="like_icon" />
            )}
        </button>
    );
}

export default LikeButton;
