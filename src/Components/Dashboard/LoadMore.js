import React from 'react';
import { useDispatch } from 'react-redux';
import { getFeedDetails } from '../../Auth/Actions/feedActions';

const LoadMore = ({ offSet, setOffSet, feedsLength }) => {
    const dispatch = useDispatch();
    const handleLoadMore = () => {
        if (offSet < 20) {
            setOffSet(offSet + 5);
            const newOffset = offSet + 5;
            dispatch(getFeedDetails(newOffset));
            window.scrollTo({
                top: 0,
                left: 0,
            });
        }
    };
    const handlePrevious = () => {
        if (offSet > 0) {
            setOffSet(offSet - 5);
            const newOffset = offSet - 5;
            dispatch(getFeedDetails(newOffset));
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="load_more_bg">
            <div className="load_more_container">
                {offSet !== 0 ? (
                    <div
                        className="load_event"
                        onClick={() => handlePrevious()}
                    >
                        Previous
                    </div>
                ) : null}
                {feedsLength >= 5 ? (
                    <div
                        className="load_event"
                        onClick={(e) => handleLoadMore()}
                    >
                        LoadMore...
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default LoadMore;
