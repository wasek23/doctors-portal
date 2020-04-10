import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewPrescription from './ViewPrescription';
import AddPrescription from './AddPrescription';

const Prescriptions = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-website.herokuapp.com/appointments').then(res => res.json()).then(data => {
            setAppointments(data);
        });
    }, []);

    const currentAppointments = appointments.filter(appoint => appoint.prescription !== null);
    console.log(currentAppointments);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    let count = 1;

    return (
        <section className="prescriptionsPage">
            <h4>Prescriptions</h4>

            <TableContainer component={Paper} style={{ marginTop: "35px" }} id="tableContainer">
                <h3 className="colorPrimary" style={{ margin: "15px" }}>All Prescriptions</h3>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell align="center">Prescription</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            currentAppointments.map(appointment => <TableRow key={appointment.name}>
                                <TableCell component="th" scope="row">{count++}</TableCell>
                                <TableCell><p style={{ maxWidth: "240px" }}>{appointment.date}</p></TableCell>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell align="center"><a href={"#view" + appointment._id} className='btn'>View</a></TableCell>
                                <AddPrescription id={"add" + appointment._id} appointment={appointment}></AddPrescription>
                                <ViewPrescription id={"view" + appointment._id} appointment={appointment}></ViewPrescription>
                            </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default Prescriptions;