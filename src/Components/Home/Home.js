import React from 'react';
import './Home.css';
import HomeImage from '../Assets/brohome.png';

const Home = () => {
    return (
        <div>
            <div className="home_container">
                <div className="home_left">
                    <h5>
                        Connect with your colleagues, share information and
                        yield more results.
                    </h5>
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
