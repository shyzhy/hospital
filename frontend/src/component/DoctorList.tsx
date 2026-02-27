import React, { useState } from "react";
import { Doctor } from "../types";

interface Props {
  doctors: Doctor[];
  onUpdate: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorList: React.FC<Props> = ({ doctors, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editSpecialization, setEditSpecialization] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleEdit = (doctor: Doctor) => {
    setEditingId(doctor.doctor_id); // Use doctor_id
    setEditFirstName(doctor.first_name);
    setEditLastName(doctor.last_name);
    setEditSpecialization(doctor.specialization);
    setEditEmail(doctor.email);
  };

  const handleSave = (doctor: Doctor) => {
    onUpdate({
      ...doctor,
      first_name: editFirstName,
      last_name: editLastName,
      specialization: editSpecialization,
      email: editEmail,
    });
    setEditingId(null);
  };

  return (
    <ul>
      {doctors.map((doctor) => (
        <li key={doctor.doctor_id} style={{ marginBottom: "10px" }}>
          {editingId === doctor.doctor_id ? (
            <>
              <input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
              <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
              <input value={editSpecialization} onChange={(e) => setEditSpecialization(e.target.value)} />
              <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              <button onClick={() => handleSave(doctor)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>
                <strong>[ID: {doctor.doctor_id}] Dr. {doctor.first_name} {doctor.last_name}</strong> - {doctor.specialization} ({doctor.email})
              </span>
              <button onClick={() => handleEdit(doctor)}>Edit</button>
              <button onClick={() => onDelete(doctor.doctor_id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DoctorList;