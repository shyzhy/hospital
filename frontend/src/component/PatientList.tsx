import React from "react";
import { Patient } from "../types"; 
import { useState } from "react";    

interface Props {    
    patients: Patient[];
    onUpdate: (patient: Patient) => void;
    onDelete: (id: number) => void;
}

const PatientList: React.FC<Props> = ({ patients, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [editFirstName, setEditFirstName] = useState<string>("");
    const [editLastName, setEditLastName] = useState<string>("");
    const [editDob, setEditDob] = useState<string>("");
    const [editGender, setEditGender] = useState<string>("");
    const [editContactNumber, setEditContactNumber] = useState<string>("");
    const [editEmail, setEditEmail] = useState<string>("");
    const [editAddress, setEditAddress] = useState<string>("");


    const handleEdit = (patient: Patient) => {
        setEditingId(patient.patient_id);
        setEditFirstName(patient.first_name);
        setEditLastName(patient.last_name);
    setEditDob(patient.date_of_birth);
        setEditGender(patient.gender);
        setEditContactNumber(patient.contact_number);
        setEditEmail(patient.email);
        setEditAddress(patient.address);
    };

    const handleSave = (patient: Patient) => {
        onUpdate({
                ...patient,
                first_name: editFirstName,
                last_name: editLastName,
                date_of_birth: editDob,
                gender: editGender,
                contact_number: editContactNumber,
                email: editEmail,
                address: editAddress
            });
            setEditingId(null);
        };
        
        const handleCancel = () => {
            setEditingId(null);
        };


        return (
            <ul>
                {patients.map((patient) => (
                    <li key={patient.patient_id} style={{marginBottom:"15px"}}>
                        {editingId === patient.patient_id ? (
                            <>
                        <input
                           type="text"
                           placeholder="First Name"
                           value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                        />
                        <input
                           type="text"
                            placeholder="Last Name"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                         />
                            <input
                                type="date" // Better for date selection
                                value={editDob}
                                onChange={(e) => setEditDob(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value={editGender}
                                onChange={(e) => setEditGender(e.target.value)}
                            />
                            <input
                                type="tel" // Better for mobile keyboards
                                placeholder="Contact Number"
                                value={editContactNumber}
                                onChange={(e) => setEditContactNumber(e.target.value)}
                            />
                            <input
                                type="email" // Validation for email format
                                placeholder="Email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={editAddress}
                                onChange={(e) => setEditAddress(e.target.value)}
                            />
                                <button onClick={() => handleSave(patient)} style={{marginRight: "5px"}}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                               <span style={{marginRight: "10px"}}>
                                    <strong>[ID: {patient.patient_id}] {patient.first_name} {patient.last_name}</strong> | {patient.date_of_birth} | {patient.gender} | {patient.contact_number} | {patient.email} | {patient.address}
                               </span>
                               <button onClick={() => handleEdit(patient)} style={{marginRight: "5px"}}>Edit</button>
                               <button onClick={() => onDelete(patient.patient_id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        )
        
    }; 

export default PatientList;