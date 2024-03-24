# Use NVIDIA's CUDA image with Ubuntu 22.04 as the base
FROM nvidia/cuda:12.3.2-devel-ubuntu22.04

# Set ARG for default port number, can be overridden during build time
ARG DEFAULT_PORT=8181

# Install system dependencies, including Python, pip and git
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  python3-dev \
  git \
  && rm -rf /var/lib/apt/lists/*

RUN ls -alFh /usr/bin/python3; ls -alFh /usr/bin/python; ls -alFh /usr/bin/pip3; ls -alFh /usr/bin/pip;
# Create symlinks for python and pip
RUN ln -s /usr/bin/python3 /usr/bin/python
# ln -s /usr/bin/pip3 /usr/bin/pip

# Upgrade pip to the latest version
RUN pip --no-cache-dir install --upgrade pip

# Set the working directory in the Docker image
WORKDIR /app


# Clone the ComfyUI repository into the working directory
RUN git clone https://github.com/comfyanonymous/ComfyUI.git .

# Clone the ComfyUI-Manager repository into the container
RUN git clone https://github.com/ltdrdata/ComfyUI-Manager.git /app/custom_nodes/ComfyUI-Manager

# Copy the requirements file into the container's work directory and install Python dependencies
# COPY requirements.txt /app/
RUN pip --no-cache-dir install -r requirements.txt

# Use ENV to set the port number, which can be overridden at runtime
ENV PORT=$DEFAULT_PORT

# Set the CUDA_VISIBLE_DEVICES environment variable to use only the second GPU (with device ID 1)
ENV CUDA_VISIBLE_DEVICES=1

# Expose the port
EXPOSE $PORT
RUN echo $PATH; ls /bin; ls /usr/bin; ls /bin/python; ls /usr/bin/python; ls /usr/bin/python3; ls /bin/python3; python3 --version; python --version
# The command to run your application, assuming the main application is 'main.py'
# It should be present in the root of the /app directory.
CMD ["sh", "-c", "python main.py --use-pytorch-cross-attention --port ${PORT} --cuda-device 1 --force-fp16"]
