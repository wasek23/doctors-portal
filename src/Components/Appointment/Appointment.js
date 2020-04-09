import React, { useState } from 'react';
import './Appointment.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MaskGroup1 from '../../img/MaskGroup1.png';

const Appointment = () => {
    // Calender
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    // Appointments
    const services = [
        { id: "TO1", target: "#TO1", name: "Teeth Orthodontics", time: "8.00 AM", available: 10 },
        { id: "CD", target: "#CD", name: "Cosmetics Dentistry", time: "9.00 AM", available: 1 },
        { id: "TC", target: "#TC", name: "Teeth Cleaning", time: "10.00 AM", available: 8 },
        { id: "CP", target: "#CP", name: "Cavity Protection", time: "11.00 AM", available: 4 },
        { id: "TO2", target: "#TO2", name: "Teeth Orthodontics", time: "3.00 PM", available: 9 },
        { id: "TO3", target: "#TO3", name: "Teeth Orthodontics", time: "8.00 PM", available: 2 }
    ];

    return (
        <div>
            <section className="hero">
                <div className="heroInner container">
                    <div className="half">
                        <Calendar onChange={handleDateChange} value={selectedDate} />
                    </div>
                    <div className="half">
                        <img src={MaskGroup1} alt="" />
                    </div>
                </div>
            </section>

            <section className="appointments" id="appointments">
                <h2>Available Appointments</h2>

                <div className="appointmentsServices">
                    {services.map(ser => <AppointmentsServices service={ser} selectedDate={selectedDate}></AppointmentsServices>)}
                </div>
            </section>
        </div>
    );
};

export default Appointment;

function AppointmentsServices(props) {
    const { id, target, name, time, available } = props.service;

    // Post data to the server
    const btnAddAppointment = () => {
        const name = document.getElementById(id + 'name').value;
        const gender = document.getElementById(id + 'gender').value;
        const age = document.getElementById(id + 'age').value;
        const weight = document.getElementById(id + 'weight').value;
        const phone = document.getElementById(id + 'phone').value;
        const email = document.getElementById(id + 'email').value;
        const time = document.getElementById(id + 'time').value;
        const date = document.getElementById(id + 'date').value;
        const appointment = { name, gender, age, weight, phone, email, time, date }

        // post
        fetch('https://doctors-portal-website.herokuapp.com/addAppointment', {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json()).then(data => {
            // Clean input
            document.getElementById(id + 'name').value = '';
            document.getElementById(id + 'gender').value = '';
            document.getElementById(id + 'age').value = '';
            document.getElementById(id + 'weight').value = '';
            document.getElementById(id + 'phone').value = '';
            document.getElementById(id + 'email').value = '';
            document.getElementById(id + 'time').value = '';
            document.getElementById(id + 'date').value = '';

            // Success Message
            const successMsg = document.getElementById('successMsg');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        });
    }

    return (
        <div>
            <div className="singleAppointment">
                <h3>{name}</h3>
                <h4>{time}</h4>
                <p>{available} Space available</p>
                <a href={target} className="btn">Book Appointment</a>
            </div>

            <div className="popup" id={id}>
                <div className="popupContent">
                    <a href="#appointments" className="popupClose">&times;</a>

                    <h2 className="colorPrimary popupHeading">{name}</h2>

                    <div className="appointmentForm" style={{ maxWidth: "1140px", margin: "0 auto" }}>
                        <input type="text" className="input" id={id + "name"} placeholder="Name" /><br />

                        <div className="threeChild">
                            <select name="gender" id={id + "gender"}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            <input type="number" className="input" id={id + "age"} placeholder="Age" />
                            <input type="text" className="input" id={id + "weight"} placeholder="Weight in kg" />
                        </div><br />

                        <input type="text" className="input" id={id + "phone"} placeholder="Phone Number" /><br />

                        <input type="email" className="input" id={id + "email"} placeholder="Email" /><br />

                        <div className="twoChild">
                            <select name="time" id={id + "time"}>
                                <option value={time} selected>{time}</option>
                                <option value="8.00 AM">8.00 AM</option>
                                <option value="9.00 AM">9.00 AM</option>
                                <option value="10.00 AM">10.00 AM</option>
                                <option value="11.00 AM">11.00 AM</option>
                                <option value="3.00 PM">3.00 PM</option>
                                <option value="4.00 PM">4.00 PM</option>
                                <option value="7.00 PM">7.00 PM</option>
                                <option value="8.00 PM">8.00 PM</option>
                            </select>
                            <input type="text" className="input" id={id + "date"} placeholder="Date" value={props.selectedDate} /><br />
                        </div><br />

                        <button className="btn" id={id + "send"} onClick={btnAddAppointment}>Send</button>
                    </div>

                    <p id="successMsg" style={{ color: "green", display: "none", marginTop: "10px" }}>Appointment added successfully</p>
                </div>
            </div>
        </div>
    );
}