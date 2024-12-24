#!/usr/bin/env bash

# This script is used to run the stable-diffusion experiment on a single machine.
PORT=${1:-8181} # 8182 is the secondary port for this ComfyUI configuration.
# PORT=8181 # 8181 is the default port for this ComfyUI configuration.

PYTHON_EXEC="/home/luxcium/anaconda3/envs/ai_lab/bin/python"
MAIN_PY_PATH="/src/ComfyUI/main.py"
export CUDA_VISIBLE_DEVICES="0, 1"
source /home/luxcium/anaconda3/etc/profile.d/conda.sh
conda activate ai_lab

sudo nvidia-settings -a \
  "[gpu:0]/GPUFanControlState=1" -a \
  "[fan:0]/GPUTargetFanSpeed=75" -a \
  "[gpu:1]/GPUFanControlState=1" -a \
  "[fan:1]/GPUTargetFanSpeed=55" -a \
  "[GPU:1]/GPULogoBrightness=20" -a \
  "[GPU:0]/GPULogoBrightness=100"

echo "$PYTHON_EXEC $MAIN_PY_PATH --auto-launch --use-pytorch-cross-attention --port ${PORT} --cuda-device 1" "${@}"
$PYTHON_EXEC $MAIN_PY_PATH --auto-launch --use-pytorch-cross-attention --port "${PORT}" --cuda-device 1 --force-fp16 "${@}"

sudo nvidia-settings -a \
  "[gpu:0]/GPUFanControlState=1" -a \
  "[fan:0]/GPUTargetFanSpeed=45" -a \
  "[gpu:1]/GPUFanControlState=1" -a \
  "[fan:1]/GPUTargetFanSpeed=35" -a \
  "[GPU:0]/GPULogoBrightness=20" -a \
  "[GPU:1]/GPULogoBrightness=40"

sudo nvidia-settings -a \
  "[gpu:0]/GPUFanControlState=0" -a \
  "[fan:0]/GPUTargetFanSpeed=45" -a \
  "[gpu:1]/GPUFanControlState=0" -a \
  "[fan:1]/GPUTargetFanSpeed=35"

#  --preview-method=auto
## ** ComfyUI startup time: 2024-02-22 09:41:30.148123
## ** Platform: Linux
## ** Python version: 3.11.7 (main, Dec 15 2023, 18:12:31) [GCC 11.2.0]
## ** Python executable: /home/luxcium/anaconda3/envs/ai_lab/bin/python
## ** Log path: /projects/monorepo-one/static/stable-diffusion/comfyui.log
##
## Prestartup times for custom nodes:
##    0.0 seconds: /src/ComfyUI/custom_nodes/ComfyUI-Manager
##
## usage: main.py [-h] [--listen [IP]] [--port PORT] [--enable-cors-header [ORIGIN]] [--max-upload-size MAX_UPLOAD_SIZE]
##                [--extra-model-paths-config PATH [PATH ...]] [--output-directory OUTPUT_DIRECTORY]
##                [--temp-directory TEMP_DIRECTORY] [--input-directory INPUT_DIRECTORY] [--auto-launch]
##                [--disable-auto-launch] [--cuda-device DEVICE_ID] [--cuda-malloc | --disable-cuda-malloc]
##                [--dont-upcast-attention] [--force-fp32 | --force-fp16]
##                [--bf16-unet | --fp16-unet | --fp8_e4m3fn-unet | --fp8_e5m2-unet] [--fp16-vae | --fp32-vae | --bf16-vae]
##                [--cpu-vae] [--fp8_e4m3fn-text-enc | --fp8_e5m2-text-enc | --fp16-text-enc | --fp32-text-enc]
##                [--directml [DIRECTML_DEVICE]] [--disable-ipex-optimize] [--preview-method [none,auto,latent2rgb,taesd]]
##                [--use-split-cross-attention | --use-quad-cross-attention | --use-pytorch-cross-attention]
##                [--disable-xformers] [--gpu-only | --highvram | --normalvram | --lowvram | --novram | --cpu]
##                [--disable-smart-memory] [--deterministic] [--dont-print-server] [--quick-test-for-ci]
##                [--windows-standalone-build] [--disable-metadata] [--multi-user]
##
## options:
##   -h, --help            show this help message and exit
##   --listen [IP]         Specify the IP address to listen on (default: 127.0.0.1). If --listen is provided without an
##                         argument, it defaults to 0.0.0.0. (listens on all)
##   --port PORT           Set the listen port.
##   --enable-cors-header [ORIGIN]
##                         Enable CORS (Cross-Origin Resource Sharing) with optional origin or allow all with default '*'.
##   --max-upload-size MAX_UPLOAD_SIZE
##                         Set the maximum upload size in MB.
##   --extra-model-paths-config PATH [PATH ...]
##                         Load one or more extra_model_paths.yaml files.
##   --output-directory OUTPUT_DIRECTORY
##                         Set the ComfyUI output directory.
##   --temp-directory TEMP_DIRECTORY
##                         Set the ComfyUI temp directory (default is in the ComfyUI directory).
##   --input-directory INPUT_DIRECTORY
##                         Set the ComfyUI input directory.
##   --auto-launch         Automatically launch ComfyUI in the default browser.
##   --disable-auto-launch
##                         Disable auto launching the browser.
##   --cuda-device DEVICE_ID
##                         Set the id of the cuda device this instance will use.
##   --cuda-malloc         Enable cudaMallocAsync (enabled by default for torch 2.0 and up).
##   --disable-cuda-malloc
##                         Disable cudaMallocAsync.
##   --dont-upcast-attention
##                         Disable upcasting of attention. Can boost speed but increase the chances of black images.
##   --force-fp32          Force fp32 (If this makes your GPU work better please report it).
##   --force-fp16          Force fp16.
##   --bf16-unet           Run the UNET in bf16. This should only be used for testing stuff.
##   --fp16-unet           Store unet weights in fp16.
##   --fp8_e4m3fn-unet     Store unet weights in fp8_e4m3fn.
##   --fp8_e5m2-unet       Store unet weights in fp8_e5m2.
##   --fp16-vae            Run the VAE in fp16, might cause black images.
##   --fp32-vae            Run the VAE in full precision fp32.
##   --bf16-vae            Run the VAE in bf16.
##   --cpu-vae             Run the VAE on the CPU.
##   --fp8_e4m3fn-text-enc
##                         Store text encoder weights in fp8 (e4m3fn variant).
##   --fp8_e5m2-text-enc   Store text encoder weights in fp8 (e5m2 variant).
##   --fp16-text-enc       Store text encoder weights in fp16.
##   --fp32-text-enc       Store text encoder weights in fp32.
##   --directml [DIRECTML_DEVICE]
##                         Use torch-directml.
##   --disable-ipex-optimize
##                         Disables ipex.optimize when loading models with Intel GPUs.
##   --preview-method [none,auto,latent2rgb,taesd]
##                         Default preview method for sampler nodes.
##   --use-split-cross-attention
##                         Use the split cross attention optimization. Ignored when xformers is used.
##   --use-quad-cross-attention
##                         Use the sub-quadratic cross attention optimization . Ignored when xformers is used.
##   --use-pytorch-cross-attention
##                         Use the new pytorch 2.0 cross attention function.
##   --disable-xformers    Disable xformers.
##   --gpu-only            Store and run everything (text encoders/CLIP models, etc... on the GPU).
##   --highvram            By default models will be unloaded to CPU memory after being used. This option keeps them in GPU
##                         memory.
##   --normalvram          Used to force normal vram use if lowvram gets automatically enabled.
##   --lowvram             Split the unet in parts to use less vram.
##   --novram              When lowvram isn't enough.
##   --cpu                 To use the CPU for everything (slow).
##   --disable-smart-memory
##                         Force ComfyUI to agressively offload to regular ram instead of keeping models in vram when it
##                         can.
##   --deterministic       Make pytorch use slower deterministic algorithms when it can. Note that this might not make
##                         images deterministic in all cases.
##   --dont-print-server   Don't print server output.
##   --quick-test-for-ci   Quick test for CI.
##   --windows-standalone-build
##                         Windows standalone build: Enable convenient things that most people using the standalone windows
##                         build will probably enjoy (like auto opening the page on startup).
##   --disable-metadata    Disable saving prompt metadata in files.
##   --multi-user          Enables per-user storage.
##
