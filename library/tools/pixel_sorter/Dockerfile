FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the script and image
COPY pixel_sort.py .
COPY input.jpg .

# Run the script
CMD ["python", "pixel_sort.py", "input.jpg", "output.jpg"]
