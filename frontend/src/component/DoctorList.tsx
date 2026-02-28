import React from 'react';
import { Doctor } from '../types';

interface Props {
  doctors: Doctor[];
  onUpdate: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorList: React.FC<Props> = ({ doctors, onUpdate, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-left bg-white">
        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Specialization</th>
            <th className="px-6 py-4 text-right">Manage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {doctors.map((doctor) => (
            <tr key={doctor.doctor_id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-800 uppercase tracking-tight">Dr. {doctor.first_name} {doctor.last_name}</td>
              <td className="px-6 py-4 text-slate-500">{doctor.specialization}</td>
              <td className="px-6 py-4 text-right space-x-4 font-black">
                <button onClick={() => onUpdate(doctor)} className="text-blue-600 hover:underline">EDIT</button>
                <button onClick={() => onDelete(doctor.doctor_id)} className="text-red-500 hover:underline">REMOVE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DoctorList;