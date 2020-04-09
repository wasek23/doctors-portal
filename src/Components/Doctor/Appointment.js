import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Appointment = () => {
    // Calender
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    // Current Appointment by Date
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-website.herokuapp.com/appointments').then(res => res.json()).then(data => {
            setAppointments(data);
        });
    }, []);

    const currentAppointments = appointments.filter(appoint => appoint.date === selectedDate);

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
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>

                <div className="appointmentData">
                    <TableContainer component={Paper}>
                        <h3 className="colorPrimary" style={{ margin: "15px" }}>Appointments</h3>
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
                                        {
                                            appointment.action === 'cancelled' ? <TableCell align="center"><button className='btn bgRed'>Cancelled</button></TableCell> : appointment.action === 'approved' ? <TableCell align="center"><button className='btn bgGreen'>Approved</button></TableCell> : <TableCell align="center"><button className='btn bgInfo'>Pending</button></TableCell>
                                        }
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