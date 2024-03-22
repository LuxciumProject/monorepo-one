# Build stage for PyTorch and OpenCV
FROM nvidia/cuda:12.3.2-devel-ubi8 AS build-stage
# Install build dependencies for PyTorch and OpenCV
# Setup your build environment here

RUN apt-get update && apt-get install -y \
  build-essential \
  cmake \
  git \
  libatlas-base-dev \
  libboost-all-dev \
  libgflags-dev \
  libgoogle-glog-dev \
  libprotobuf-dev \
  protobuf-compiler \
  python3-dev \
  python3-pip \
  python3-setuptools \
  python3-wheel \
  && rm -rf /var/lib/apt/lists/*

# Clone PyTorch repository
RUN git clone --recursive https://github.com/pytorch/pytorch.git /opt/pytorch

# Install additional build dependencies for PyTorch with CUDA support
RUN apt-get update && apt-get install -y --no-install-recommends \
  libnccl2 \
  libnccl-dev \
  && rm -rf /var/lib/apt/lists/*

# Install or compile PyTorch and here
# Build PyTorch with CUDA support
RUN cd /opt/pytorch && \
  python3 setup.py build --cmake-only && \
  python3 setup.py install

# Cleanup
# RUN rm -rf /opt/pytorch
# Install or compile OpenCV here
# Clone OpenCV repository
RUN git clone https://github.com/opencv/opencv.git /opt/opencv

# Clone OpenCV contrib repository
RUN git clone <OpenCV_repository_url> /opt/opencv

# Build OpenCV
RUN cd /opt/opencv && \
  mkdir build && \
  cd build && \
  cmake .. && \
  make && \
  make install

# Cleanup
# RUN rm -rf /opt/opencv

# Test and monitor the container after build
RUN echo "Testing and monitoring the container after build"
# Add your testing and monitoring commands here

# Test and monitor the container after build

CMD [ "python3", "run_test.py"]





# Runtime stage
# FROM nvidia/cuda:12.3.2-runtime-ubi8
# Copy necessary binaries and libraries from the build-stage
# COPY --from=build-stage /path/to/compiled/assets /path/in/runtime/image
# Install runtime dependencies
# Setup your application here
