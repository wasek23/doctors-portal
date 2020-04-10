import React from 'react';
import { useForm } from 'react-hook-form'

const StatusUpdate = (props) => {
    const { handleSubmit, register } = useForm()
    const onSubmit = (data, e) => {
        fetch('https://doctors-portal-website.herokuapp.com/updateStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            alert("Status Update Successful")
            window.location.reload();
        });
    }
    return (
        <div className="popup" id={props.id}>
            <div className="popupContent">
                <a href="#tableContainer" className="popupClose">&times;</a>

                <h2 className="colorPrimary popupHeading">Status update for <br /> {props.appointment.name}</h2>

                <div className="addPrescriptionForm" style={{ maxWidth: "1140px", margin: "0 auto" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: "none" }}>
                            <input type="text" value={props.appointment._id} name="id" ref={register({ required: true })} />
                        </div>

                        <select id="inputState" name="status" ref={register({ required: true })}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="cancelled">Cancelled</option>
                        </select> <br />

                        <button type="submit" className="btn" style={{ display: "inline-block", margin: "20px 0" }}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdate;