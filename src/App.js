import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Appointment from './Components/Appointment/Appointment';
import Doctor from './Components/Doctor/Doctor';

function App() {
    return (
        <div>
            <Router>
                <Switch>

                    <Route path="/doctor">
                        <Doctor></Doctor>
                    </Route>
                    <Route path="/appointment">
                        <Header></Header>
                        <Appointment></Appointment>
                    </Route>
                    <Route path="/">
                        <Header></Header>
                        <HomePage></HomePage>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
