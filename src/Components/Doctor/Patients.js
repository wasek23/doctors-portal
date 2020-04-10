import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Patients = () => {
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

    return (
        <section className="patientsPage">
            <h4>Patients</h4>

            <TableContainer component={Paper} style={{ marginTop: "35px" }}>
                <h3 className="colorPrimary" style={{ margin: "15px" }}>All Patients</h3>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            appointments.map(appointment => <TableRow key={appointment.name}>
                                <TableCell component="th" scope="row">{count++}</TableCell>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell>{appointment.gender}</TableCell>
                                <TableCell>{appointment.age}</TableCell>
                                <TableCell>{appointment.weight} kg</TableCell>
                                <TableCell>{appointment.phone}</TableCell>
                                <TableCell><p style={{ maxWidth: "240px" }}>{appointment.date}</p></TableCell>
                            </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default Patients;