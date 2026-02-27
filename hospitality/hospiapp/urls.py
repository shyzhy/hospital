from django.urls import path
from .views import (
    PatientListCreateAPIView, PatientRetrieveUpdateDestroyAPIView, 
    DoctorListCreateAPIView, DoctorRetrieveUpdateDestroyAPIView,
    AppointmentListCreateAPIView, AppointmentRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('patient/', PatientListCreateAPIView.as_view(), name='patient-list-create'),
    path('patient/<int:pk>/', PatientRetrieveUpdateDestroyAPIView.as_view(), name='patient-detail'),
    
    path('doctor/', DoctorListCreateAPIView.as_view(), name='doctor-list-create'),
    path('doctor/<int:pk>/', DoctorRetrieveUpdateDestroyAPIView.as_view(), name='doctor-detail'),
    
    path('appointment/', AppointmentListCreateAPIView.as_view(), name='appointment-list-create'),
    path('appointment/<int:pk>/', AppointmentRetrieveUpdateDestroyAPIView.as_view(), name='appointment-detail'),
]