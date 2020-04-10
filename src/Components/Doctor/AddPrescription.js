import React from 'react';
import { useForm } from 'react-hook-form'

const AddPrescription = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (data, e) => {
        fetch('https://doctors-portal-website.herokuapp.com/updatePrescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            alert("Prescription Update Successful");
            window.location.reload();
        });
    }
    return (
        <div className="popup" id={props.id}>
            <div className="popupContent">
                <a href="#tableContainer" className="popupClose">&times;</a>

                <h2 className="colorPrimary popupHeading">Add Prescription for <br /> {props.appointment.name}</h2>

                <div className="addPrescriptionForm" style={{ maxWidth: "1140px", margin: "0 auto" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: "none" }}>
                            <input type="text" value={props.appointment._id} name="id" ref={register({ required: true, })} />
                        </div>

                        <textarea defaultValue={props.appointment.prescription} placeholder="Enter Prescription" name="prescription" ref={register({ required: true })}></textarea>
                        {errors.prescription && <span className="text-danger">Prescription is required</span>} <br />

                        <button type="submit" className="btn" style={{ display: "inline-block", margin: "20px 0" }}>Update Prescription</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPrescription;