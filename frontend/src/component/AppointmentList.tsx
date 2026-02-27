import React, { useState } from "react";
import { Appointment, Patient, Doctor } from "../types";

interface Props {
  appointments: Appointment[];
  patients: Patient[];
  doctors: Doctor[];
  onUpdate: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<Props> = ({ appointments, patients, doctors, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPatientId, setEditPatientId] = useState<number>(0);
  const [editDoctorId, setEditDoctorId] = useState<number>(0);
  const [editAppointmentDate, setEditAppointmentDate] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");

  const handleEdit = (app: Appointment) => {
    setEditingId(app.appointment_id);
    setEditPatientId(app.patient);
    setEditDoctorId(app.doctor);
    setEditAppointmentDate(app.appointment_date.slice(0, 16)); 
    setEditStatus(app.status);
  };

  const handleSave = (app: Appointment) => {
    onUpdate({
      ...app,
      patient: editPatientId,
      doctor: editDoctorId,
      appointment_date: new Date(editAppointmentDate).toISOString(), 
      status: editStatus,
    });
    setEditingId(null);
  };

    const getPatientName = (id: number) => {
    const p = patients.find(p => p.patient_id === id); // Matches your Patient interface
    return p ? `${p.first_name} ${p.last_name}` : "Unknown Patient";
    };

    const getDoctorName = (id: number) => {
    const d = doctors.find(d => d.doctor_id === id); // Matches your Doctor interface
    // Fix: Use actual variable 'd', not the template string '{d.first_name}'
    return d ? `Dr. ${d.first_name} ${d.last_name}` : "Unknown Doctor";
    };
  return (
    <ul>
      {appointments.map((app) => (
        <li key={app.appointment_id} style={{ marginBottom: "15px" }}>
          {editingId === app.appointment_id ? (
            <>
              <select value={editPatientId} onChange={(e) => setEditPatientId(Number(e.target.value))} style={{ marginRight: "10px" }}>
                {patients.map(p => <option key={p.patient_id} value={p.patient_id}>{p.first_name} {p.last_name}</option>)}
              </select>

              <select value={editDoctorId} onChange={(e) => setEditDoctorId(Number(e.target.value))} style={{ marginRight: "10px" }}>
                {doctors.map(d => <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.first_name} {d.last_name}</option>)}
              </select>

              <input type="datetime-local" value={editAppointmentDate} onChange={(e) => setEditAppointmentDate(e.target.value)} style={{ marginRight: "10px" }} />
              <input type="text" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ marginRight: "10px", width: "100px" }} />
              
              <button onClick={() => handleSave(app)} style={{ marginRight: "5px" }}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
                <span style={{ marginRight: "10px" }}>
                <strong>[Appt ID: {app.appointment_id}]</strong> | Patient: {getPatientName(app.patient)} |  Doctor: {getDoctorName(app.doctor)} | {new Date(app.appointment_date).toLocaleString()} | Status: {app.status}
                </span>
              <button onClick={() => handleEdit(app)} style={{ marginRight: "5px" }}>Edit</button>
              <button onClick={() => onDelete(app.appointment_id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;