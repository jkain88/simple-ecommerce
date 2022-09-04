FROM python:3.8
ENV PYTHONBUFFERED=1

WORKDIR /app

# Cache dependencies
COPY requirements.txt /app/

RUN pip install -r requirements.txt 

# Add current directory code to working directory
COPY . /app/