FROM python:3.7

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY Pipfile /app

# Install dependencies
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && pipenv install --system


ADD .  /app/

