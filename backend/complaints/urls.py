from django.urls import path
from . import views

urlpatterns = [
    path("", views.complaints, name="complaints"),
    path(
        "<int:complaint_id>/",
        views.delete_complaint,
        name="delete_complaint"
    ),
]