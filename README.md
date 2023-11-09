# Django Project Configuration

This is the configuration for a Django project generated using `django-admin startproject` with Django version 4.1.12 Below is an overview of the key settings and configurations in this Django project.

## Getting Started

To get started with this project, follow these steps:

1. Clone the project repository:
```bash 
git clone https://github.com/Aibek-Kozonberdiev/final-project.git
```
2. Create a Python virtual environment and activate it.
```bash
python -m venv venv
```
3. Install the project dependencies using.
```bash
pip install -r requirements.txt
```
4. Create a `.env` file in the project's root directory and set the required environment variables, as mentioned below.
```bash
vim .env
```
5. Complete the .env file:
```env
# Django
SECRET_KEY = '' # Your project key
DEBUG = False
MY_HOST = ''  # Domain or host

# Telegram
TELEGRAM_KEY = ''  # Telegram token
ADMIN_TELEGRAM_ID = '' # Admin id telegram

# Email
EMAIL_USE_TLS = True
EMAIL_HOST = '' # Your host
EMAIL_PORT = 587 # Default port
EMAIL_HOST_USER =  # Your e-mail address
EMAIL_HOST_PASSWORD = '' # Confirmation key

# MongoDp 
NAME_MONGO = '' # Think there is no need to explain
HOST_MONGO = ''
PORT_MONGO = ''
```

## Docker

Now, to build the Docker image and run the container, follow these steps:

1. Open a terminal and navigate to the directory containing your `Dockerfile`.

2. Run the following command to build the Docker image:

```bash
docker build -t my-django-app .
```

Here, `my-django-app` is the image name. You can replace it with your preferred name.

3. After successfully building the Docker image, you can run the container with your Django application using the following command:

```bash
docker run -p 8000:8000 my-django-app
```

Replace `my-django-app` with the name of your Docker image.

Now, your Django application should be accessible at `http://localhost:8000` inside the container. Make sure your Django application is listening on port 8000.

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the project's root directory and set the following variables:

- `SECRET_KEY`: A secret key for your Django application.
- `DEBUG`: Set to `'True'` for development or `'False'` for production.
- `MY_HOST`: Set your allowed host for the application.
- Set other environment variables like database settings, email configuration, and more as required.

## Installed Apps

This project includes the following Django apps:

- `django.contrib.auth`
- `django.contrib.contenttypes`
- `django.contrib.sessions`
- `django.contrib.messages`
- `django.contrib.staticfiles`
- Third-party libraries:
  - `channels`
  - `rest_framework`
  - `corsheaders`
  - `drf_yasg`
  - `rest_framework_simplejwt`
  - `djongo`
- Custom apps specific to the project:
  - `apps.user.apps.UserConfig`
  - `apps.quiz.apps.QuizConfig`
  - `apps.bot.apps.BotConfig`

## Database Configuration

This project is originally written in SQLite. But it's better to use MongoDB, you can set your database settings in the `.env` file

## Middleware

Middleware components are configured to enhance the functionality and security of the application. The `corsheaders` middleware is included to handle Cross-Origin Resource Sharing.

## Internationalization

The project is configured for internationalization with language code set to 'en' and timezone set to 'Asia/Bishkek'. You can customize these settings according to your needs.

## Static and Media Files

Static files (CSS, JavaScript, images) are served from the `static/` directory, while media files are served from the `media/` directory.

## REST Framework Settings

The project is configured to use Django Rest Framework for API development. It includes pagination settings, renderer classes, permission classes, and authentication classes.

## JWT Token Settings

JSON Web Tokens (JWT) are used for authentication. The `rest_framework_simplejwt` library is integrated with custom settings.

## CORS Settings

Cross-Origin Resource Sharing (CORS) is configured to allow specific origins to access resources from this Django application. You can customize the allowed origins as needed.

## Email Configuration

Email settings are configured for sending emails using an SMTP backend. Make sure to set the necessary email-related environment variables.

Used to send verification keys and welcome emails users.

## Telegram Bot

This project includes settings for integrating with a Telegram bot. You should set the `TELEGRAM_KEY` and `ADMIN_TELEGRAM_ID` environment variables for the Telegram bot integration.

Remember to secure your sensitive information, such as secret keys and credentials, in your `.env` file and do not expose them in your version control system.

Telegram is needed to send complaints about users to the admin.

For more information on Django settings, For more information on pyTelegramBotAPI, refer to the [official pyTelegramBotAPI documentation](https://pytba.readthedocs.io/en/latest/).
