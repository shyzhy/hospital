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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [newPatient, setNewPatient] = useState({ first_name: "", last_name: "", gender: "", date_of_birth: "", contact_number: "", address: "", email: "" });
  const [newDoctor, setNewDoctor] = useState({ first_name: "", last_name: "", specialization: "", email: "" });
  const [newAppointment, setNewAppointment] = useState({ patient: 0, doctor: 0, appointment_date: "", status: "Scheduled" });

  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const loadData = async () => {
    try {
      const [pData, dData, aData] = await Promise.all([getPatients(), getDoctors(), getAppointments()]);
      setPatients(pData);
      setDoctors(dData);
      setAppointments(aData);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.doctor_id, editingDoctor);
        setEditingDoctor(null);
      } else {
        await createDoctor(newDoctor);
        setNewDoctor({ first_name: "", last_name: "", specialization: "", email: "" });
      }
      await loadData();
    } catch (err) { alert("Error saving doctor."); }
  };

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.patient_id, editingPatient);
        setEditingPatient(null);
      } else {
        await createPatients(newPatient);
        setNewPatient({ first_name: "", last_name: "", gender: "", date_of_birth: "", contact_number: "", email: "", address: "" });
      }
      await loadData();
    } catch (err) { alert("Error saving patient."); }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = editingAppointment || newAppointment;
      if (editingAppointment) {
        await updateAppointment(editingAppointment.appointment_id, data);
        setEditingAppointment(null);
      } else {
        await createAppointment(data);
        setNewAppointment({ patient: 0, doctor: 0, appointment_date: "", status: "Scheduled" });
      }
      await loadData();
    } catch (err) { alert("Error saving appointment."); }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <header className="border-b border-slate-200 pb-8 text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tighter text-blue-900 uppercase italic">Hospital Dashboard</h1>
          <p className="text-slate-500 font-bold mt-2 tracking-widest uppercase text-xs">Medical Management System</p>
        </header>

        {/* --- DOCTOR SECTION --- */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <h2 className="text-2xl font-black mb-8 text-blue-600">👨‍⚕️ {editingDoctor ? 'UPDATE DOCTOR' : 'ADD DOCTOR'}</h2>
          <form onSubmit={handleDoctorSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 bg-blue-50/50 p-6 rounded-3xl">
            <input type="text" placeholder="First Name" className="p-4 rounded-2xl border-none outline-blue-400" value={editingDoctor ? editingDoctor.first_name : newDoctor.first_name} onChange={(e) => editingDoctor ? setEditingDoctor({...editingDoctor, first_name: e.target.value}) : setNewDoctor({...newDoctor, first_name: e.target.value})} required />
            <input type="text" placeholder="Last Name" className="p-4 rounded-2xl border-none outline-blue-400" value={editingDoctor ? editingDoctor.last_name : newDoctor.last_name} onChange={(e) => editingDoctor ? setEditingDoctor({...editingDoctor, last_name: e.target.value}) : setNewDoctor({...newDoctor, last_name: e.target.value})} required />
            <input type="text" placeholder="Specialization" className="p-4 rounded-2xl border-none outline-blue-400" value={editingDoctor ? editingDoctor.specialization : newDoctor.specialization} onChange={(e) => editingDoctor ? setEditingDoctor({...editingDoctor, specialization: e.target.value}) : setNewDoctor({...newDoctor, specialization: e.target.value})} required />
            <input type="email" placeholder="Email" className="p-4 rounded-2xl border-none outline-blue-400" value={editingDoctor ? editingDoctor.email : newDoctor.email} onChange={(e) => editingDoctor ? setEditingDoctor({...editingDoctor, email: e.target.value}) : setNewDoctor({...newDoctor, email: e.target.value})} required />
            <button type="submit" className={`font-black text-white p-4 rounded-2xl ${editingDoctor ? 'bg-orange-500' : 'bg-blue-600'}`}>{editingDoctor ? 'SAVE' : 'ADD'}</button>
          </form>
          <DoctorList doctors={doctors} onUpdate={(doc) => setEditingDoctor(doc)} onDelete={async (id) => { await deleteDoctor(id); loadData(); }} />
        </section>

        {/* --- PATIENT SECTION --- */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <h2 className="text-2xl font-black mb-8 text-emerald-600">🤒 {editingPatient ? 'EDIT PATIENT' : 'REGISTER PATIENT'}</h2>
          
          <form onSubmit={handlePatientSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-emerald-50/50 p-6 rounded-3xl">
            <input type="text" placeholder="First Name" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium" value={editingPatient ? editingPatient.first_name : newPatient.first_name} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, first_name: e.target.value}) : setNewPatient({...newPatient, first_name: e.target.value})} required />
            <input type="text" placeholder="Last Name" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium" value={editingPatient ? editingPatient.last_name : newPatient.last_name} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, last_name: e.target.value}) : setNewPatient({...newPatient, last_name: e.target.value})} required />
            <input type="date" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium text-slate-500" value={editingPatient ? editingPatient.date_of_birth : newPatient.date_of_birth} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, date_of_birth: e.target.value}) : setNewPatient({...newPatient, date_of_birth: e.target.value})} required />
            <select className="p-4 rounded-2xl border-none outline-emerald-400 font-medium text-slate-500 bg-white" value={editingPatient ? editingPatient.gender : newPatient.gender} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, gender: e.target.value}) : setNewPatient({...newPatient, gender: e.target.value})} required>
              <option value="" disabled>Gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Contact Number" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium" value={editingPatient ? editingPatient.contact_number : newPatient.contact_number} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, contact_number: e.target.value}) : setNewPatient({...newPatient, contact_number: e.target.value})} required />
            <input type="email" placeholder="Email Address" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium" value={editingPatient ? editingPatient.email : newPatient.email} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, email: e.target.value}) : setNewPatient({...newPatient, email: e.target.value})} required />
            <input type="text" placeholder="Home Address" className="p-4 rounded-2xl border-none outline-emerald-400 font-medium" value={editingPatient ? editingPatient.address : newPatient.address} onChange={(e) => editingPatient ? setEditingPatient({...editingPatient, address: e.target.value}) : setNewPatient({...newPatient, address: e.target.value})} required />
            <button type="submit" className={`font-black text-white p-4 rounded-2xl ${editingPatient ? 'bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
              {editingPatient ? 'UPDATE' : 'REGISTER'}
            </button>
          </form>

          <PatientList patients={patients} onUpdate={(p) => setEditingPatient(p)} onDelete={async (id) => { await deletePatients(id); loadData(); }} />
        </section>

        {/* --- APPOINTMENT SECTION --- */}
        <section className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <h2 className="text-2xl font-black mb-8 text-slate-800 uppercase font-mono">📅 Appointment Manager</h2>
          <form onSubmit={handleAppointmentSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-slate-100 p-6 rounded-3xl">
            <select className="p-4 rounded-2xl border-none outline-slate-400" value={editingAppointment ? editingAppointment.patient : newAppointment.patient} onChange={(e) => editingAppointment ? setEditingAppointment({...editingAppointment, patient: Number(e.target.value)}) : setNewAppointment({...newAppointment, patient: Number(e.target.value)})} required>
              <option value={0}>Choose Patient...</option>
              {patients.map(p => <option key={p.patient_id} value={p.patient_id}>{p.first_name} {p.last_name}</option>)}
            </select>
            <select className="p-4 rounded-2xl border-none outline-slate-400" value={editingAppointment ? editingAppointment.doctor : newAppointment.doctor} onChange={(e) => editingAppointment ? setEditingAppointment({...editingAppointment, doctor: Number(e.target.value)}) : setNewAppointment({...newAppointment, doctor: Number(e.target.value)})} required>
              <option value={0}>Choose Doctor...</option>
              {doctors.map(d => <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.first_name} {d.last_name}</option>)}
            </select>
            
            {/* THIS IS THE FIXED INPUT: .slice(0, 16) cuts off the seconds and the 'Z' */}
            <input type="datetime-local" className="p-4 rounded-2xl border-none outline-slate-400 font-medium" 
              value={editingAppointment ? editingAppointment.appointment_date.slice(0, 16) : newAppointment.appointment_date} 
              onChange={(e) => editingAppointment ? setEditingAppointment({...editingAppointment, appointment_date: e.target.value}) : setNewAppointment({...newAppointment, appointment_date: e.target.value})} required />
            
            <button type="submit" className="bg-slate-900 text-white font-black p-4 rounded-2xl shadow-lg shadow-slate-200 hover:bg-black transition-all">
              {editingAppointment ? 'UPDATE' : 'BOOK'}
            </button>
          </form>
          <AppointmentList appointments={appointments} patients={patients} doctors={doctors} onUpdate={(a) => setEditingAppointment(a)} onDelete={async (id) => { await deleteAppointment(id); loadData(); }} />
        </section>

      </div>
    </div>
  );
}

export default App;