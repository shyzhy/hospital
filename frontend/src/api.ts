import axios from "axios";
import { Patient, Doctor, Appointment } from "./types";

const API = axios.create({
    // Removed /patient from here to prevent URL doubling
    baseURL: "http://127.0.0.1:8000/api/v1", 
});

// PATIENTS
export const getPatients = async (): Promise<Patient[]> => {
    const response = await API.get<Patient[]>("patient/"); // Targets .../api/v1/patient/
    return response.data;
};

export const createPatients = async (data: any): Promise<Patient> => {
    const response = await API.post<Patient>("patient/", data);
    return response.data;
};

export const updatePatient = async (id: number, data: any) => {
    return (await API.patch(`patient/${id}/`, data)).data;
};
    
export const deletePatients = async (id: number) => {
    await API.delete(`patient/${id}/`);
};

// DOCTORS
export const getDoctors = async (): Promise<Doctor[]> => {
    const response = await API.get<Doctor[]>("doctor/");
    return response.data;
};

export const createDoctor = async (data: any): Promise<Doctor> => {
    const response = await API.post<Doctor>("doctor/", data);
    return response.data;
};

export const updateDoctor = async (id: number, data: any) => {
    return (await API.patch(`doctor/${id}/`, data)).data; 
};

export const deleteDoctor = async (id: number) => {
    return (await API.delete(`doctor/${id}/`));
};

// APPOINTMENTS
export const getAppointments = async (): Promise<Appointment[]> => {
    const response = await API.get<Appointment[]>("appointment/");
    return response.data;
};

export const createAppointment = async (data: any): Promise<Appointment> => {
    const response = await API.post<Appointment>("appointment/", data);
    return response.data;
};

export const updateAppointment = async (id: number, data: any): Promise<Appointment> => {
    const response = await API.patch<Appointment>(`appointment/${id}/`, data);
    return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
    await API.delete(`appointment/${id}/`);
};

export default API;