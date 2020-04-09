import React from 'react';
import './Doctor.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faCalendar, faUsers, faFilePrescription, faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import Appointment from './Appointment';
import Patients from './Patients';
import Prescriptions from './Prescriptions';

const Doctor = () => {
    return (
        <div className="doctorPage">
            <div className="doctorNav">
                <ul>
                    <li><a href="/doctor/dashboard"><FontAwesomeIcon icon={faTh} /> Dashboard</a></li>
                    <li><a href="/doctor/appointment"><FontAwesomeIcon icon={faCalendar} /> Appointment</a></li>
                    <li><a href="/doctor/patients"><FontAwesomeIcon icon={faUsers} /> Patients</a></li>
                    <li><a href="/doctor/prescriptions"><FontAwesomeIcon icon={faFilePrescription} /> Prescriptions</a></li>
                    <li><a href="/doctor/setting"><FontAwesomeIcon icon={faCog} /> Setting</a></li>
                </ul>

                <div className="logout">
                    <a href="/"><FontAwesomeIcon icon={faArrowRight} /> Logout</a>
                </div>
            </div>
            <div className="doctorComponent">
                <Router>
                    <Switch>
                        <Route path="/doctor/dashboard">
                            <Dashboard></Dashboard>
                        </Route>
                        <Route path="/doctor/appointment">
                            <Appointment></Appointment>
                        </Route>
                        <Route path="/doctor/patients">
                            <Patients></Patients>
                        </Route>
                        <Route path="/doctor/prescriptions">
                            <Prescriptions></Prescriptions>
                        </Route>
                        <Route path="/doctor/">
                            <Dashboard></Dashboard>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
};

export default Doctor;