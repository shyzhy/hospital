from rest_framework import serializers
from .models import Patient, Appointment, Doctor

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'contact_number', 'email']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_id', 'first_name', 'last_name', 'specialization', 'email']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        # Using simple fields ensures compatibility with your React state logic
        fields = ['appointment_id', 'patient', 'doctor', 'appointment_date', 'status']