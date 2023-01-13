import React from 'react';
import {
  Home,
  AddAPhoto,
  NotificationsNone,
  AccountCircle,
} from '@material-ui/icons';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { LogoutUser } from '../../Auth/Actions/userActions';
import Search from '../../Components/Assets/Vectorsearch.png';
import PropTypes from 'prop-types';

const Header = ({ LogoutUser, userStatus }) => {
  const history = useHistory();

  return (
    <div className="header__container">
      <div className="content">
        <div className="left">
          <div className="left_cont">
            <span>
              <h2>STAFFCONN</h2>
            </span>
          </div>
        </div>
        {userStatus && userStatus ? (
          <div className="search_bar">
            <img src={Search} alt="" className="search_bar_img" />
            <span>
              <input className="search" type="text" placeholder="Search...." />
            </span>
          </div>
        ) : null}
        <div className="center">
          <div className="center_container">
            <NavLink
              to="/dashboard"
              className="nav_bar"
              activeClassName="active_link"
            >
              <div className="nav_bar_container ">
                <Home className="center_icon active" />
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink
              to="/upload"
              className="nav_bar"
              activeClassName="active_link"
            >
              <div className="nav_bar_container">
                <AddAPhoto className="center_icon" />
                <span>Upload</span>
              </div>
            </NavLink>
            <NavLink
              to="/notifications"
              className="nav_bar"
              activeClassName="active_link"
            >
              <div className="nav_bar_container">
                <NotificationsNone className="center_icon" />
                <span>Notification</span>
              </div>
            </NavLink>
            <NavLink
              to="/profile"
              className="nav_bar"
              activeClassName="active_link"
            >
              <div className="nav_bar_container">
                <AccountCircle className="center_icon" />
                <span>Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="middle">
          <div className="middle_container">
            {userStatus && userStatus.profile !== null ? (
              <div className="profile_pix">
                <img src={userStatus.profile} alt="" className="profile_pic" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="right">
          <div className="right_container">
            <div className="link_button">
              {!!userStatus ? (
                <Link
                  className="link_btn"
                  to="/sign_in"
                  onClick={() => LogoutUser(history)}
                >
                  Log Out
                </Link>
              ) : (
                <Link className="link_btn" to="/sign_in">
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userStatus: state.user.userData,
  };
};

Header.propTypes = {
  userStatus: PropTypes.object,
  LogoutUser: PropTypes.func,
};

export default connect(mapStateToProps, { LogoutUser })(Header);
