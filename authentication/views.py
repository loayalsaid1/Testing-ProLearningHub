from django.shortcuts import render, redirect
# from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string
from student.models import Users
from .models import Auth
import bcrypt

# Create your views here.


def hash_password(password: str) -> bytes:
    """Hashes a password"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def register(request):
    """Registers a user"""
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        role = request.POST.get('role')
        profile_image = request.FILES.get('image')

        # Check in all neccessary fields are filled
        if not all([first_name, last_name, email, password, role]):
            return render(request, 'authentication/register.html', {'error': 'All fields required'})

        # Check if email is already registered
        if Users.object.filter(email=email):
            return render(request, 'authentication/register.html', {'error': 'Email already exists'})

        # Hash the password
        password_hash = make_password(password)

        # Create the new user
        new_user = Users.objects.create(first_name=first_name,
                                        last_name=last_name,
                                        email=email,
                                        password_hash=password_hash,
                                        role=role,
                                        profile_image=profile_image)
        # Save user to the database
        new_user.save()
        return render(request, 'authentication/register.html', {'success': 'User registration successfull'})


def login(request):
    """Login a user"""
    # check if it is a post request
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # handles email or password not inserted
        if not email or not password:
            return render(request,
                          'authentication/login.html',
                          {'error': 'Please enter both email and password'})
        # Checks if the email exist
        user = Users.objects.filter(email=email).first()
        if not user:
            return render(request, 'authentication/login.html', {'error': 'Email not found please Register'})
        if user and check_password(password, user.password_hash):
            request.session['user_id'] = user.user_id
            return redirect('me')
        else:
            return render(request, 'authentication/login.html', {'error': 'Invalid email or password'})
    return render(request, 'authentication/login.html')


def logout(request):
    """Logout the user"""
    # Clears the session to logout the user
    request.session.flush()

    # Redirects to login page
    return redirect('login')


def forgot_password(request):
    pass


def password_reset_request(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user = Users.objects.filter(email=email).first()
        auth = Auth()

        if user:
            # Generate a unique reset token
            reset_token = auth.generate_token()

            # Save the reset token to the user
            user.reset_token = reset_token
            user.save()

            # Send the email with the reset link
            reset_link = request.build_absolute_uri(
                f'/reset-password/{reset_token}')

            # Send the reset link to the user's email
            auth.send_password_reset_email(user, reset_link)

            return render(request, 'authentication/password_reset_sent.html')


def reset_password(request, token):
    user = Users.objects.filter(reset_token=token).first()

    if user is None:
        # Token invalid
        return render(request, 'authentication/invalid_token.html')

    if request.method == 'POST':
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        if new_password == confirm_password:
            password_hash = make_password(new_password)  # Set the new password
            user.update(password_hash=password_hash)
            user.reset_token = None  # Invalidate the reset token after use
            user.save()

            # Redirect to login after successful reset
            return redirect('login')

    return render(request, 'authentication/reset_password.html', {'token': token})


def face(request):
    pass


def me(request):
    return render(request, 'authentication/dashboard.html')
