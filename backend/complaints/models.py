from django.db import models
from app.models import Auth


STATUS_CHOICES = [
    ("pending", "Pending"),
    ("in_progress", "In Progress"),
    ("resolved", "Resolved"),
    ("rejected", "Rejected"),
]


class Complaint(models.Model):

    user = models.ForeignKey(Auth, on_delete=models.CASCADE)

    title = models.CharField(max_length=200)

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    image = models.ImageField(
        upload_to="complaints/",
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title