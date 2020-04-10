import React from 'react';
import AddPrescription from './AddPrescription';

const ViewPrescription = (props) => {
    return (
        <div className="popup" id={props.id}>
            <div className="popupContent">
                <a href="#tableContainer" className="popupClose">&times;</a>

                <h2 className="colorPrimary popupHeading">Prescription for <br /> {props.appointment.name}</h2>

                <div className="addPrescriptionForm" style={{ maxWidth: "1140px", margin: "0 auto" }}>
                    <textarea name="prescriptionDetails" id={props.id + "prescriptionDetails"} readOnly>{props.appointment.prescription}</textarea><br />
                    {
                        <a href={"#add" + props.appointment._id} className="btn" style={{ display: "inline-block", margin: "20px 0" }}>Update Prescription</a>
                    }
                    {
                        <AddPrescription id={"add" + props.appointment._id} appointment={props.appointment}></AddPrescription>
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewPrescription;