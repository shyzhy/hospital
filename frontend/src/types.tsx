export interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    email: string;
    address: string;
}

export interface Doctor { 
    doctor_id: number;
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
}   

export interface Appointment {
    appointment_id: number;
    patient: number; // Represents the Patient ID
    doctor: number;  // Represents the Doctor ID
    appointment_date: string;
    status: string;
}