import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddPrescription from './AddPrescription';
import ViewPrescription from './ViewPrescription';
import StatusUpdate from './StatusUpdate';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-website.herokuapp.com/appointments').then(res => res.json()).then(data => {
            setAppointments(data);
        });
    }, []);

    const d = new Date();
    const formatDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getDate()}`;
    const todayAppointments = appointments.filter(appoint => appoint.date === formatDate);
    const pendingAppointments = appointments.filter(appoint => appoint.status === 'pending');

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    let count = 1;

    return (
        <section className="dashboardPage">
            <h4>Dashboard</h4>

            <div className="appointmentSummary">
                <div className="pendingAppoint">
                    <h2>{pendingAppointments.length}</h2>
                    <p>Pending Appointments</p>
                </div>
                <div className="todaysAppoint">
                    <h2>{todayAppointments.length}</h2>
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

            <TableContainer component={Paper} style={{ marginTop: "35px" }} id="tableContainer">
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
                                    appointment.prescription !== null ? <TableCell align="center"><a href={"#view" + appointment._id} className='btn'>View</a></TableCell> : <TableCell align="center"><a href={"#add" + appointment._id} className="notAdded" title="Add prescription">Not Added</a></TableCell>
                                }
                                <TableCell align="center">{
                                    appointment.status === 'cancelled' ? <a href={"#status" + appointment._id} className='btn bgRed'>Cancelled</a> : appointment.status === 'approved' ? <a href={"#status" + appointment._id} className='btn bgGreen'>Approved</a> : <a href={"#status" + appointment._id} className='btn bgInfo'>Pending</a>
                                }</TableCell>

                                <AddPrescription id={"add" + appointment._id} appointment={appointment}></AddPrescription>
                                <ViewPrescription id={"view" + appointment._id} appointment={appointment}></ViewPrescription>
                                <StatusUpdate id={"status" + appointment._id} appointment={appointment}></StatusUpdate>
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