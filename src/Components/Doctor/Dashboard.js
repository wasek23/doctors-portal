import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-website.herokuapp.com/appointments').then(res => res.json()).then(data => {
            setAppointments(data);
        });
    }, []);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    let count = 1;

    const btnViewPres = () => {
        alert("Prescription Viewed");
    }

    return (
        <section className="dashboardPage">
            <h4>Dashboard</h4>

            <div className="appointmentSummary">
                <div className="pendingAppoint">
                    <h2>09</h2>
                    <p>Pending Appointments</p>
                </div>
                <div className="todaysAppoint">
                    <h2>19</h2>
                    <p>Todays Appointments</p>
                </div>
                <div className="totalAppoint">
                    <h2>{appointments.length}</h2>
                    <p>Total Appointments</p>
                </div>
                <div className="totalPatients">
                    <h2>{appointments.length}</h2>
                    <p>Total Patients</p>
                </div>
            </div>

            <TableContainer component={Paper} style={{ marginTop: "35px" }}>
                <h3 className="colorPrimary" style={{ margin: "15px" }}>Recent Appointments</h3>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Prescription</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            appointments.map(appointment => <TableRow key={appointment.name}>
                                <TableCell component="th" scope="row">{count++}</TableCell>
                                <TableCell><p style={{ maxWidth: "240px" }}>{appointment.date}</p></TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell align="center">{appointment.phone}</TableCell>
                                {
                                    appointment.prescription ? <TableCell align="center"><button className='btn' onClick={btnViewPres}>View</button></TableCell> : <TableCell align="center"><span className="notAdded" onClick={() => {
                                        const currentAppoint = appointments.filter(appoint => appoint._id === appointment._id);
                                        const updateCurrentAppoint = currentAppoint[0].prescription = true;
                                        console.log(updateCurrentAppoint);
                                    }} title="Add prescription">Not Added</span></TableCell>
                                }
                                {
                                    appointment.action === 'cancelled' ? <TableCell align="center"><button className='btn bgRed'>Cancelled</button></TableCell> : appointment.action === 'approved' ? <TableCell align="center"><button className='btn bgGreen'>Approved</button></TableCell> : <TableCell align="center"><button className='btn bgInfo'>Pending</button></TableCell>
                                }
                            </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default Dashboard;