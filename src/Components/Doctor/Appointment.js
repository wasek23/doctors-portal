import React, { useState, useEffect } from 'react';
import Calender from './Calender';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StatusUpdate from './StatusUpdate';

const Appointment = () => {
    // Calender
    const [date, setDate] = useState();
    const dateHandler = (date) => {
        setDate(date);
    }

    // Current Appointment by Date
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-website.herokuapp.com/appointments').then(res => res.json()).then(data => {
            setAppointments(data);
        });
    }, []);

    const currentAppointments = appointments.filter(appoint => appoint.date === date);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    return (
        <section className="appointmentPage">
            <h4>Appointments</h4>

            <div className="appointment" style={{ marginTop: "35px" }}>
                <div className="calender">
                    <Calender dateHandler={dateHandler}></Calender>
                </div>

                <div className="appointmentData">
                    <TableContainer component={Paper}>
                        <div className="flex" style={{ margin: "15px" }}>
                            <h3 className="colorPrimary">Appointments</h3>
                            <h4 className="colorPrimary">{date}</h4>
                        </div>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Schedule</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    currentAppointments.map(appointment => <TableRow key={appointment.name}>
                                        <TableCell>{appointment.name}</TableCell>
                                        <TableCell>{appointment.time}</TableCell>
                                        <TableCell align="center">{
                                            appointment.status === 'cancelled' ? <a href={"#status" + appointment._id} className='btn bgRed'>Cancelled</a> : appointment.status === 'approved' ? <a href={"#status" + appointment._id} className='btn bgGreen'>Approved</a> : <a href={"#status" + appointment._id} className='btn bgInfo'>Pending</a>
                                        }</TableCell>

                                        <StatusUpdate id={"status" + appointment._id} appointment={appointment}></StatusUpdate>
                                    </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </section>
    );
};

export default Appointment;