import React, { Component } from 'react';
import Process from '../../layouts/Process';
import BoxContact from '../news/BoxContact';
import AboutUs from './AboutUs';
import Welcome from '../../layouts/Welcome';

class About extends Component {
    render() {
        return (
            <div>
                <Welcome></Welcome>
                <AboutUs></AboutUs>
                <BoxContact></BoxContact>
                <Process></Process>
            </div>
        );
    }
}

export default About;
