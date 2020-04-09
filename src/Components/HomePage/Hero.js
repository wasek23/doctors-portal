import React from 'react';
import './Hero.css';

import MaskGroup1 from '../../img/MaskGroup1.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="heroInner container">
                <div className="half">
                    <h1 className="heroHeading">Your New Smile <br /> Starts Here</h1>

                    <p className="heroIntro">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore molestias aut magni itaque quam. Aperiam alias laboriosam eius officia vitae exercitationem eligendi quibusdam! Aliquam illo quidem laboriosam ratione quaerat!</p>

                    <a href="/appointment" className="btn">Get appointment</a>
                </div>
                <div className="half">
                    <img src={MaskGroup1} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Hero;