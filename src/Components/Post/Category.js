import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getCategory } from '../../Auth/Actions/articleActions';

const Category = ({ categoryData }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategory());
    }, []);
    return (
        <>
            {categoryData &&
                categoryData.map((item) => (
                    <option key={item.category_id} value={item.category_id}>
                        {item.category_name}
                    </option>
                ))}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        categoryData: state.articles.categories,
    };
};

export default connect(mapStateToProps)(Category);
