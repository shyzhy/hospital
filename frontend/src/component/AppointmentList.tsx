import React from 'react';
import { Appointment, Patient, Doctor } from '../types';

interface Props {
  appointments: Appointment[];
  patients: Patient[];
  doctors: Doctor[];
  onUpdate: (appointment: Appointment) => void;
  onDelete: (id: number) => void;
}

const AppointmentList: React.FC<Props> = ({ appointments, patients, doctors, onUpdate, onDelete }) => {
  
  // Helpers to resolve names from IDs
  const getPatientName = (id: number) => {
    const p = patients.find(p => p.patient_id === id);
    return p ? `${p.first_name} ${p.last_name}` : 'Unknown Patient';
  };

  const getDoctorName = (id: number) => {
    const d = doctors.find(d => d.doctor_id === id);
    return d ? `Dr. ${d.first_name} ${d.last_name}` : 'Unknown Doctor';
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-slate-200 text-xs uppercase font-black tracking-widest">
          <tr>
            <th className="px-6 py-4">Patient / Doctor</th>
            <th className="px-6 py-4 text-center">Schedule</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {appointments.map((app) => (
            <tr key={app.appointment_id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-800 leading-tight">
                  {getPatientName(app.patient)}
                </div>
                <div className="text-[10px] text-blue-600 font-black uppercase mt-1">
                  {getDoctorName(app.doctor)}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="text-sm font-bold text-slate-700">
                  {new Date(app.appointment_date).toLocaleDateString()}
                </div>
                <div className="text-[10px] font-medium text-slate-400">
                  {new Date(app.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border shadow-sm ${
                  app.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                  app.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <button 
                  onClick={() => onUpdate(app)} 
                  className="text-slate-600 font-black hover:text-black mr-4 uppercase text-xs hover:underline"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(app.appointment_id)} 
                  className="text-red-500 font-black hover:text-red-700 uppercase text-xs hover:underline"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;