from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Auth
import json
from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


# ================= REGISTER =================
@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if not username or not email or not password:
                return JsonResponse({
                    "status": "failed",
                    "message": "All fields are required"
                })

            if Auth.objects.filter(email=email).exists():
                return JsonResponse({
                    "status": "failed",
                    "message": "Email already exists"
                })

            if Auth.objects.filter(username=username).exists():
                return JsonResponse({
                    "status": "failed",
                    "message": "Username already exists"
                })

            # ✅ SIMPLE SAVE (NO HASH)
            Auth.objects.create(
                username=username,
                email=email,
                password=password
            )

            return JsonResponse({
                "status": "success",
                "message": "User registered successfully"
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })

    return JsonResponse({
        "status": "failed",
        "message": "Invalid request"
    })


# ================= LOGIN =================
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({
                    "status": "failed",
                    "message": "All fields are required"
                })

            try:
                # ✅ SIMPLE MATCH (NO HASH)
                user = Auth.objects.get(email=email, password=password)

                refresh = RefreshToken.for_user(user)

                return JsonResponse({
                    "status": "success",
                    "message": "Login successful",
                    "token": str(refresh.access_token)
                })

            except Auth.DoesNotExist:
                return JsonResponse({
                    "status": "failed",
                    "message": "Invalid credentials"
                })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })

    return JsonResponse({
        "status": "failed",
        "message": "Invalid request"
    })


# ================= LOGOUT =================
@csrf_exempt
def logout(request):
    return JsonResponse({
        "status": "success",
        "message": "Logout successful (delete token from frontend)"
    })


# ================= HOME (PROTECTED) =================
@csrf_exempt
def home(request):
    try:
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return JsonResponse({
                "status": "failed",
                "message": "No token provided"
            })

        token = auth_header.split(" ")[1]

        decoded = AccessToken(token)

        user_id = decoded['user_id']

        user = Auth.objects.get(id=user_id)

        return JsonResponse({
            "status": "success",
            "message": f"Welcome {user.username} 🎉"
        })

    except Exception:
        return JsonResponse({
            "status": "failed",
            "message": "Invalid token"
        })


# ================= GOOGLE LOGIN =================
@csrf_exempt
def google_login(request):
    try:
        data = json.loads(request.body)

        credential = data.get("credential")

        if not credential:
            return JsonResponse({
                "status": "failed",
                "message": "No credential received"
            })

        google_user = id_token.verify_oauth2_token(
            credential,
            requests.Request(),
            "805589625883-8u3l4b4voh2jsqqqctginjjohgq2pkmf.apps.googleusercontent.com"
        )

        email = google_user["email"]
        name = google_user.get("name", email.split("@")[0])

        user, created = Auth.objects.get_or_create(
            email=email,
            defaults={
                "username": name,
                "password": "google_auth"
            }
        )

        refresh = RefreshToken.for_user(user)

        return JsonResponse({
            "status": "success",
            "token": str(refresh.access_token),
            "username": user.username
        })

    except Exception as e:
        return JsonResponse({
            "status": "failed",
            "message": str(e)
        })


@api_view(["POST"])
def admin_login(request):

    admin_id = request.data.get("admin_id")
    password = request.data.get("password")

    try:
        user = Auth.objects.get(
            username=admin_id,
            password=password,
            is_admin=True
        )
    except Auth.DoesNotExist:
        return Response(
            {
                "status": "failed",
                "message": "Invalid admian credentials"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    token = AccessToken.for_user(user)

    return Response({
        "status": "success",
        "message": "Admin login successful",
        "token": str(token),
    })