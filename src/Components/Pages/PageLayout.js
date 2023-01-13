import React from 'react';
import './PageLayout.css';
import Profile from './Profile';
import SideBar from './SideBar';

const PageLayout = ({ children }) => {
    return (
        <div className="page_layout_container">
            <div className="page_right">
                <SideBar />
            </div>
            <div className="page_center">{children}</div>
            <div className="page_left">
                <Profile />
            </div>
        </div>
    );
};

export default PageLayout;
