from django.contrib import admin
from django.urls import path
from .views import PatientListCreateAPIView, PatientRetrieveUpdateDestroyAPIView, DoctorListCreateAPIView, AppointmentListCreateAPIView

urlpatterns = [
    path('patient/', PatientListCreateAPIView.as_view(), name='patient-list-create'),
    path('patient/<int:pk>/', PatientRetrieveUpdateDestroyAPIView.as_view(), name='patient-detail'),
    path('doctor/', DoctorListCreateAPIView.as_view(), name='doctor-list-create'),
    path('appointment/', AppointmentListCreateAPIView.as_view(), name='appointment-list-create'),   
]
