import axios from "axios";
import { Patient, Doctor, Appointment } from "./types";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});


export const getPatients = async (): Promise<Patient[]> => {
    const response = await API.get<Patient[]>("patient/");
    return response.data;
};

export const createPatients = async (data: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    email: string;
    address: string;
}): Promise<Patient> => {
    const response = await API.post<Patient>("patient/", data);
    return response.data;
};

export const updatePatient = async (id: number, data: any) => {
    return (await API.patch(`patient/${id}/`, data)).data; // Targets /patient/ID/
};
    
export const deletePatients = async (id: number) => {
    await API.delete(`patient/${id}/`); // Targets /patient/ID/
};

export const getDoctors = async (): Promise<Doctor[]> => {
    const response = await API.get<Doctor[]>("doctor/");
    return response.data;
};

export const createDoctor = async (data: {
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
}): Promise<Doctor> => {
    const response = await API.post<Doctor>("doctor/", data);
    return response.data;
};

export const updateDoctor = async (id: number, data: any) => {
    // Ensure this matches your router.register name exactly
    return (await API.patch(`doctor/${id}/`, data)).data; 
};

export const deleteDoctor = async (id: number) => {
    return (await API.delete(`doctor/${id}/`));
};

export const getAppointments = async (): Promise<Appointment[]> => {
    const response = await API.get<Appointment[]>("appointment/");
    return response.data;
};

export const createAppointment = async (data: {
    patient: number;
    doctor: number;
    appointment_date: string;
    status: string;
}): Promise<Appointment> => {
    const response = await API.post<Appointment>("appointment/", data);
    return response.data;
};

export const updateAppointment = async (id: number, data: any): Promise<Appointment> => {
    // We use the ID passed from the component to target the specific record
    const response = await API.patch<Appointment>(`appointment/${id}/`, data);
    return response.data;
};

export const deleteAppointment = async (id: number): Promise<void> => {
    // This sends the DELETE command to the specific appointment ID
    await API.delete(`appointment/${id}/`);
};

export default API;
