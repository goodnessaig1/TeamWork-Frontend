import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
    getSingleUserDetails,
    SearchUser,
} from '../../Auth/Actions/userActions';
import { ProfilePicture } from '../../Utils/ProfilePicture';
import { useHistory } from 'react-router-dom';

const UserSearch = ({ SearchUser, users }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            searchString: '',
        },
        onSubmit: (values) => {
            SearchUser(values.searchString);
        },
    });
    const handleClose = () => {
        formik.resetForm();
    };
    const handleClick = (user) => {
        const userName = user.first_name + user.last_name;
        const id = user.id;
        dispatch(getSingleUserDetails(id, 0));
        history.push(`/dashboard/${userName}/${id}`);
        formik.resetForm();
        formik.resetForm();
    };

    // console.log(users);
    useEffect(() => {
        dispatch(SearchUser(formik.values.searchString));
    }, [dispatch, formik.values.searchString]);

    return (
        <div className="search_componentss">
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="searchString"
                    placeholder="Search"
                    autoFocus
                    className="search__input_"
                    value={formik.values.searchString}
                    onChange={formik.handleChange}
                />
                <button type="submit"></button>
            </form>
            {/* {users?.length > 0 ? ( */}
            <ul className="users_ul">
                {users &&
                    formik.values.searchString != '' &&
                    users.map((user) => (
                        <li
                            onClick={() => handleClick(user)}
                            className="user_li"
                            key={user.id}
                        >
                            <ProfilePicture
                                image={user?.profile_pix}
                                className="user_pix"
                            />
                            <span>{`${user?.first_name} ${user?.last_name}`}</span>
                        </li>
                    ))}
            </ul>
            {/* ) : ( */}
            {users?.length === 0 && formik.values.searchString != '' && (
                <div className="no-results">No results found</div>
            )}
            {/* )} */}
            {formik.values.searchString != '' && (
                <div
                    className="search_overlay"
                    onClick={() => handleClose()}
                ></div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
    };
};

export default connect(mapStateToProps, { SearchUser })(UserSearch);
