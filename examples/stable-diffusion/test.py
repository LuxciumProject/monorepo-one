import torch
import psutil

# Get detailed CPU info
cpu_info = psutil.cpu_freq(True)
print(cpu_info)
num_cores = torch.get_num_threads()
print(f"Number of CPU cores: {num_cores}")

print(torch.__version__)
print(torch.cuda)
# Verify CUDA is available
print(f"CUDA is available: {torch.cuda.is_available()}")

# Test a simple operation
x = torch.rand(3,3)
print(x.to('cpu'))

if torch.cuda.is_available():
    # If CUDA is available, print the device memory
    print(f"CUDA_0 memory allocated: {torch.cuda.memory_allocated(0)}")
    print(f"CUDA_1 memory allocated: {torch.cuda.memory_allocated(1)}")
    torch.cuda.set_device(0)
    x_cuda = x.to('cuda')
    print(x_cuda)
    print(f"CUDA_0 memory allocated: {torch.cuda.memory_allocated(0)}")
    print(f"CUDA_1 memory allocated: {torch.cuda.memory_allocated(1)}")
# If CUDA is available, create a tensor on the GPU 0
if torch.cuda.is_available():
    # cahnge surrent device to 1
    # using GPU 0
    x_cuda = x.to('cuda:0')
    print(x_cuda)
    # If CUDA is available, print the device name
    print(torch.cuda.get_device_name(0))
    # If CUDA is available, print the device count
    print(f"CUDA device count: {torch.cuda.device_count()}")
    # If CUDA is available, print the current device
    print(f"CUDA current device: {torch.cuda.current_device()}")
    # If CUDA is available, print the device memory
    print(f"CUDA memory: {torch.cuda.memory_allocated(0)}")
# If CUDA is available, create a tensor on the GPU 1
if torch.cuda.is_available():
    # cahnge surrent device to 1
    torch.cuda.set_device(1)
    # using GPU 1
    x_cuda = x.to('cuda:1')
    print(x_cuda)
    # If CUDA is available, print the device name
    print(torch.cuda.get_device_name(1))
    # If CUDA is available, print the device count
    print(f"CUDA device count: {torch.cuda.device_count()}")
    # If CUDA is available, print the current device
    print(f"CUDA current device: {torch.cuda.current_device()}")
    # If CUDA is available, print the device memory
    print(f"CUDA memory: {torch.cuda.memory_allocated(1)}")
if torch.cpu:
    print("CPU is available")
    x_cpu = x.to('cpu:20')
    print(x_cpu)

# if torch.cuda.is_available():
#     x_cuda = x.to('cuda')
#     print(x_cuda)
#     # If CUDA is available, print the device name
#     print(torch.cuda.get_device_name(0))
#     print(torch.cuda.get_device_name(1))
#     # If CUDA is available, print the device count
#     print(f"CUDA device count: {torch.cuda.device_count()}")
#     # If CUDA is available, print the current device
#     print(f"CUDA current device: {torch.cuda.current_device()}")
#     # If CUDA is available, print the device memory
#     print(f"CUDA memory: {torch.cuda.memory_allocated(0)}")
#     print(f"CUDA memory: {torch.cuda.memory_allocated(1)}")
