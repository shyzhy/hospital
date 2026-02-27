import React, { useState, useEffect } from "react";
import { Patient, Doctor, Appointment } from "./types";
import {
  getPatients, createPatients, updatePatient, deletePatients,
  getDoctors, createDoctor, updateDoctor, deleteDoctor,
  getAppointments, createAppointment, updateAppointment, deleteAppointment
} from "./api";

import PatientList from "./component/PatientList";
import DoctorList from "./component/DoctorList";
import AppointmentList from "./component/AppointmentList";

function App() {
  // 1. State for our data
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // State for new item forms (Create)
  const [newPatient, setNewPatient] = useState({ first_name: "", last_name: "", gender: "", date_of_birth: "", contact_number: "", address: "", email: "" });
  const [newDoctor, setNewDoctor] = useState({ first_name: "",last_name: "", specialization: "", email: "" });
  const [newAppointment, setNewAppointment] = useState({ patient: 0, doctor: 0, appointment_date: "", status: "Scheduled" });

  // 2. Fetch all data on load
  const loadData = async () => {
    try {
      const pData = await getPatients();
      setPatients(pData);
      
      const dData = await getDoctors();
      setDoctors(dData);

      const aData = await getAppointments();
      setAppointments(aData);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 3. DOCTOR HANDLERS
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDoctor(newDoctor);
    setNewDoctor({ first_name: "", last_name: "", specialization: "", email: ""});
    loadData();
  };
  const handleUpdateDoctor = async (doctor: Doctor) => {
  try {
    // Pass the specific doctor_id property
    await updateDoctor(doctor.doctor_id, doctor);
    loadData();
    alert("Doctor updated successfully!");
  } catch (error: any) {
    alert("Update Error: " + JSON.stringify(error.response?.data));
    }
  };

  const handleDeleteDoctor = async (id: number) => {
  try {
    await deleteDoctor(id);
    loadData();
  } catch (error) {
    console.error("Delete failed", error);
  }
  };
  // 4. PATIENT HANDLERS
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPatients(newPatient);
    setNewPatient({ first_name: "", last_name: "", gender: "", date_of_birth: "", contact_number: "", email: "", address: "" });
    loadData();
  };
  const handleUpdatePatient = async (patient: Patient) => {
    await updatePatient(patient.patient_id, patient);
    loadData();
  };
  const handleDeletePatient = async (id: number) => {
    await deletePatients(id);
    loadData();
  };

// 5. APPOINTMENT HANDLERS
  const handleAddAppointment = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createAppointment({
          patient: newAppointment.patient, 
          doctor: newAppointment.doctor,
          appointment_date: new Date(newAppointment.appointment_date).toISOString(),
          status: newAppointment.status
        });
        setNewAppointment({ patient: 0, doctor: 0, appointment_date: "", status: "Scheduled" });
        loadData();
      } catch (error: any) {
        console.error("Add failed", error.response?.data);
      }
    };
    const handleUpdateAppointment = async (appointment: Appointment) => {
    try {
      // Pass the appointment_id and the updated data object
      await updateAppointment(appointment.appointment_id, {
        patient: appointment.patient,
        doctor: appointment.doctor,
        appointment_date: appointment.appointment_date,
        status: appointment.status
      });
      loadData();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    try {
      await deleteAppointment(id);
      loadData(); // Refresh the list after deleting
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>🏥 Doctor-Patient System Dashboard</h1>

      {/* --- DOCTORS SECTION --- */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
        <h2>Doctors</h2>
        <form onSubmit={handleAddDoctor} style={{ marginBottom: "15px" }}>
          <input type="text" placeholder="First Name" value={newDoctor.first_name} onChange={(e) => setNewDoctor({...newDoctor, first_name: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Last Name" value={newDoctor.last_name} onChange={(e) => setNewDoctor({...newDoctor, last_name: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Specialization" value={newDoctor.specialization} onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="email" placeholder="Email" value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} required style={{ marginRight: "5px" }} />
          <button type="submit">Add Doctor</button>
        </form>
        <DoctorList doctors={doctors} onUpdate={handleUpdateDoctor} onDelete={handleDeleteDoctor} />
      </div>

      {/* --- PATIENTS SECTION --- */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
        <h2>Patients</h2>
        <form onSubmit={handleAddPatient} style={{ marginBottom: "15px" }}>
          <input type="text" placeholder="First Name" value={newPatient.first_name} onChange={(e) => setNewPatient({...newPatient, first_name: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Last Name" value={newPatient.last_name} onChange={(e) => setNewPatient({...newPatient, last_name: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="date" value={newPatient.date_of_birth} onChange={(e) => setNewPatient({...newPatient, date_of_birth: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Contact Number" value={newPatient.contact_number} onChange={(e) => setNewPatient({...newPatient, contact_number: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Address" value={newPatient.address} onChange={(e) => setNewPatient({...newPatient, address: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Gender" value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({...newPatient, email: e.target.value})} required style={{ marginRight: "5px" }} />
          <button type="submit">Add Patient</button>
        </form>
        <PatientList patients={patients} onUpdate={handleUpdatePatient} onDelete={handleDeletePatient} />
      </div>

      {/* --- APPOINTMENTS SECTION --- */}
      <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
        <h2>Appointments</h2>
        <form onSubmit={handleAddAppointment} style={{ marginBottom: "15px" }}>
          
          <select 
            value={newAppointment.patient || 0} 
            onChange={(e) => setNewAppointment({...newAppointment, patient: Number(e.target.value)})} 
            required 
            style={{ marginRight: "5px", padding: "3px" }}
          >
            <option value={0} disabled>Select Patient</option>
            {patients.map(p => (
              <option key={p.patient_id} value={p.patient_id}>{p.first_name} {p.last_name}</option>
            ))}
          </select>

          <select 
            value={newAppointment.doctor || 0} 
            onChange={(e) => setNewAppointment({...newAppointment, doctor: Number(e.target.value)})} 
            required 
            style={{ marginRight: "5px", padding: "3px" }}
          >
            <option value={0} disabled>Select Doctor</option>
            {doctors.map(d => (
              <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.first_name} {d.last_name}</option>
            ))}
          </select>

          <input type="datetime-local" value={newAppointment.appointment_date} onChange={(e) => setNewAppointment({...newAppointment, appointment_date: e.target.value})} required style={{ marginRight: "5px" }} />
          <input type="text" placeholder="Status" value={newAppointment.status} onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})} required style={{ width: "100px", marginRight: "5px" }} />
          <button type="submit">Add Appointment</button>
        </form>

        <AppointmentList 
          appointments={appointments} 
          patients={patients} 
          doctors={doctors} 
          onUpdate={handleUpdateAppointment} 
          onDelete={handleDeleteAppointment} 
        />
      </div>

    </div>
  );
}

export default App;