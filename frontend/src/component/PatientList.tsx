import React from 'react';
import { Patient } from '../types';

interface Props {
  patients: Patient[];
  onUpdate: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

const PatientList: React.FC<Props> = ({ patients, onUpdate, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-emerald-50 text-emerald-800 text-xs uppercase font-black">
          <tr>
            <th className="px-6 py-4 tracking-widest">Patient Name</th>
            <th className="px-6 py-4 tracking-widest">Medical Info</th>
            <th className="px-6 py-4 text-right tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {patients.map((p) => (
            <tr key={p.patient_id} className="hover:bg-emerald-50/30 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-800">
                {p.first_name} {p.last_name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {p.date_of_birth} | {p.gender}
              </td>
              <td className="px-6 py-4 text-right space-x-4">
                <button 
                  onClick={() => onUpdate(p)} 
                  className="text-emerald-600 font-black hover:underline text-xs"
                >
                  EDIT
                </button>
                <button 
                  onClick={() => onDelete(p.patient_id)} 
                  className="text-red-500 font-black hover:underline text-xs"
                >
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;