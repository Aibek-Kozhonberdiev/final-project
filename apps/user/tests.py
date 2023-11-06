import pytest
from django.contrib.auth.models import User
from apps.user.models import UserProfile, KeyConfirmation
from django.db.utils import IntegrityError

@pytest.mark.django_db
def test_user_profile_creation():
    # Create a test user
    user = User.objects.create_user(username='testuser', password='testpassword')

    # Create a user profile associated with the test user
    user_profile = UserProfile.objects.get(user=user)

    # Check if the user profile was created correctly
    assert user_profile.user == user
    assert user_profile.point == 0
    assert user_profile.confirmed is False

@pytest.mark.django_db
def test_user_profile_save():
    # Create a test user
    user = User.objects.create_user(username='testuser', password='testpassword')

    # Create a user profile associated with the test user
    user_profile = UserProfile.objects.get(user=user)

    # Modify the user profile's point and save it
    user_profile.point = 500
    user_profile.save()

    # Reload the user profile from the database
    user_profile = UserProfile.objects.get(user=user)

    # Check if the user profile's point was updated correctly
    assert user_profile.point == 500

@pytest.mark.django_db
def test_key_confirmation():
    # Create a test user
    user = User.objects.create_user(username='testuser', password='testpassword')

    # Create a user profile associated with the test user
    user_profile = UserProfile.objects.get(user=user)

    # Create a key confirmation for the user profile
    key_confirmation = KeyConfirmation.objects.create(profile=user_profile, key='testkey')

    # Check if the key confirmation was created correctly
    assert key_confirmation.profile == user_profile
    assert key_confirmation.key == 'testkey'

@pytest.mark.django_db
def test_user_profile_auto_confirmation():
    # Create a test admin user
    admin_user = User.objects.create_user(username='adminuser', password='adminpassword', is_staff=True)

    # Check if the user profile for the admin user is automatically confirmed
    user_profile = UserProfile.objects.get(user=admin_user)
    assert user_profile.confirmed is True

@pytest.mark.django_db
def test_key_confirmation_unique_constraint():
    # Create a test user
    user = User.objects.create_user(username='testuser', password='testpassword')

    # Create a user profile associated with the test user
    user_profile = UserProfile.objects.get(user=user)

    # Create a key confirmation for the user profile with a duplicate key, which should raise an IntegrityError
    with pytest.raises(IntegrityError):
        KeyConfirmation.objects.create(profile=user_profile, key='testkey')
        KeyConfirmation.objects.create(profile=user_profile, key='testkey')
