FROM python:3.11-slim

WORKDIR /app

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY weather.py .

EXPOSE 5000

CMD ["python", "weather.py"]