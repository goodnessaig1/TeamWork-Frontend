import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import './Layout.css';

const Layout = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <div className="page_container">
                {children}
                {/* Body */}
            </div>
        </div>
    );
};

export default Layout;
