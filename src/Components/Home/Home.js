import React from 'react';
import './Home.css';
import HomeImage from '../Assets/brohome.png';
import connectImage from '../Assets/connect.png';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="home_container">
                <div className="home_left">
                    <h3>Welcome to Staffconn</h3>
                    <h5>
                        Connect with your colleagues, share information and
                        yield more results.
                    </h5>
                    <div className="connect__img">
                        <img
                            src={connectImage}
                            className="connect_img"
                            alt=""
                        />
                    </div>
                    <div className="sign_in_up_btn">
                        <Link to="/sign_in" className="sign_in_button">
                            <span>Sign In</span>
                        </Link>
                        <Link to="/create_user" className="sign_up_button">
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
                <div className="home_right">
                    <div className="home_right_container">
                        <img src={HomeImage} className="home_image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
