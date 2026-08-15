from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken

from app.models import Auth
from .models import Complaint
from .serializers import ComplaintSerializer


def get_authenticated_user(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None

    try:
        token = auth_header.split(" ")[1]
        decoded_token = AccessToken(token)

        user_id = decoded_token["user_id"]

        return Auth.objects.get(id=user_id)

    except Exception:
        return None


@api_view(["POST", "GET"])
def complaints(request):

    user = get_authenticated_user(request)

    if not user:
        return Response(
            {
                "status": "failed",
                "message": "Authentication required"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    # CREATE
    if request.method == "POST":

        serializer = ComplaintSerializer(data=request.data)

        if serializer.is_valid():

            complaint = serializer.save(user=user)

            return Response(
                {
                    "status": "success",
                    "message": "Complaint created successfully",
                    "complaint": ComplaintSerializer(complaint).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            {
                "status": "failed",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # GET MY COMPLAINTS
    if request.method == "GET":

        user_complaints = Complaint.objects.filter(
            user=user
        ).order_by("-created_at")

        serializer = ComplaintSerializer(
            user_complaints,
            many=True
        )

        return Response(
            {
                "status": "success",
                "complaints": serializer.data
            }
        )


@api_view(["DELETE"])
def delete_complaint(request, complaint_id):

    user = get_authenticated_user(request)

    if not user:
        return Response(
            {
                "status": "failed",
                "message": "Authentication required"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        complaint = Complaint.objects.get(
            id=complaint_id,
            user=user
        )

    except Complaint.DoesNotExist:
        return Response(
            {
                "status": "failed",
                "message": "Complaint not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    complaint.delete()

    return Response(
        {
            "status": "success",
            "message": "Complaint deleted successfully"
        }
    )