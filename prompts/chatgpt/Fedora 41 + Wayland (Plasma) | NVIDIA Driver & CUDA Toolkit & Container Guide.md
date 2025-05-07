# Fedora 41 + Wayland (Plasma) | NVIDIA Driver & CUDA Toolkit & Container Guide

*A complete, codified reference for specialists — from kernel alignment through LLM‑in‑Docker — with contextual “❓ Questions to Ask” at each stage.*

---

## 📑 Table of Contents

1. [Introduction & Scope](#introduction--scope)
2. [Prerequisites & Context Checks](#prerequisites--context-checks)
3. [Kernel & Headers Alignment](#kernel--headers-alignment)
4. [NVIDIA Driver Installation](#nvidia-driver-installation)

   1. [Blacklisting Nouveau](#blacklisting-nouveau)
   2. [RPM Fusion & akmod‑nvidia](#rpmfusion--akmod-nvidia)
   3. [Dracut & GRUB Configuration](#dracut--grub-configuration)
   4. [Verifying the Driver](#verifying-the-driver)
5. [CUDA Toolkit 12.9 Installation](#cuda-toolkit-129-installation)

   1. [Adding NVIDIA CUDA Repo](#adding-nvidia-cuda-repo)
   2. [Installing cuda‑toolkit](#installing-cuda-toolkit)
   3. [Environment Variables & Paths](#environment-variables--paths)
   4. [Verifying nvcc](#verifying-nvcc)
6. [“Hello, CUDA!” Sample Build & Run](#hello-cuda-sample-build--run)
7. [NVIDIA Container Toolkit (Docker/Podman)](#nvidia-container-toolkit-dockerpodman)
8. [Open‑Source LLM Docker Images](#open-source-llm-docker-images)
9. [Additional Recommendations & Next Steps](#additional-recommendations--next-steps)
10. [Troubleshooting Appendix](#troubleshooting-appendix)

---

## 1 📝 Introduction & Scope

This guide walks you through:

* Ensuring your **kernel**, **headers**, and **NVIDIA modules** align.
* Installing **proprietary NVIDIA drivers** (575.51.03) via RPM Fusion on Fedora 41.
* Setting up **CUDA Toolkit 12.9** in `/usr/local/cuda`.
* Configuring **environment variables** and **ldconfig**.
* Validating with `nvidia-smi`, sample code, and `nvcc`.
* Enabling **NVIDIA Container Toolkit** for GPU‑powered Docker/Podman.
* Listing **free OSS LLM Docker images** to run on your GPU.
* Embedding “❓ Questions to Ask” at each phase.

> **Normative**: Follow commands exactly. Avoid `-y` on single‑action DNF commands to prevent unintended upgrades.

---

## 2 ✅ Prerequisites & Context Checks

Before you begin, **verify**:

```bash
# OS & kernel
cat /etc/fedora-release
uname -r

# CPU toolchain
rpm -q gcc make dkms

# Repo list
dnf repolist enabled | grep -E 'rpmfusion|cuda'
```

❓ **Questions to Ask**

* Are you on Fedora 41 x86\_64?
* Is your CPU toolchain up to date (gcc, make, dkms)?
* Do you have RPM Fusion free & nonfree repos?

---

## 3 🔧 Kernel & Headers Alignment

Ensure running kernel matches installed headers and devel:

```bash
# 1. Check current kernel
uname -r
# 2. Verify headers & devel
rpm -q kernel-core-"$(uname -r)" \
      kernel-headers-"$(uname -r)" \
      kernel-devel-"$(uname -r)"
```

If **headers** are missing:

```bash
# Optionally list available headers
dnf list --showduplicates kernel-headers
# Then install the matching one
sudo dnf install kernel-headers-$(uname -r)
```

❓ **Questions to Ask**

* Does `kernel-headers-$(uname -r)` exist in repos?
* Have you rebooted into the newest kernel?

---

## 4 🚀 NVIDIA Driver Installation

### 4.1 Blacklisting Nouveau

Create `/etc/modprobe.d/blacklist-nouveau.conf`:

```bash
sudo tee /etc/modprobe.d/blacklist-nouveau.conf <<EOF
blacklist nouveau
options nouveau modeset=0
EOF
```

### 4.2 RPM Fusion & akmod‑nvidia

Enable RPM Fusion nonfree repos (if not already):

```bash
sudo dnf config-manager --enable rpmfusion-nonfree rpmfusion-nonfree-updates
sudo dnf clean all && sudo dnf makecache
```

Install the proprietary driver:

```bash
sudo dnf install --allowerasing akmod-nvidia xorg-x11-drv-nvidia-cuda nvidia-settings
```

> **Note**: If conflicting CUDA‑fedora39 drivers remain, disable that repo:
>
> ```bash
> sudo dnf config-manager --disable cuda-fedora39-x86_64
> ```

### 4.3 Dracut & GRUB Configuration

Include NVIDIA modules in initramfs and pass modeset:

```bash
# Dracut snippet
sudo tee /etc/dracut.conf.d/90-nvidia.conf <<EOF
omit_drivers+=" nouveau "
add_drivers+=" nvidia nvidia_modeset nvidia_uvm nvidia_drm "
EOF

# Update initramfs
sudo dracut --force

# Add kernel args for all installed kernels
sudo grubby --update-kernel=ALL --args="rd.driver.blacklist=nouveau modprobe.blacklist=nouveau nvidia-drm.modeset=1"

# Regenerate GRUB (BIOS)
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
# EFI
sudo grub2-mkconfig -o /boot/efi/EFI/fedora/grub.cfg
```

### 4.4 Verifying the Driver

Reboot → check:

```bash
lsmod | grep nvidia
nvidia-smi
```

Expected output:

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 575.51.03    Driver Version: 575.51.03    CUDA Version: 12.9     |
...
```

❓ **Questions to Ask**

* Is `nvidia` listed in `lsmod`?
* Does `nvidia-smi` show your GPU?
* Are there any `NVRM: No NVIDIA devices probed` errors in `journalctl -k`?

---

## 5 💻 CUDA Toolkit 12.9 Installation

### 5.1 Adding NVIDIA CUDA Repo

```bash
sudo tee /etc/yum.repos.d/cuda-fedora41.repo <<'REPO'
[cuda-fedora41-x86_64]
name=CUDA Fedora 41 x86_64
baseurl=https://developer.download.nvidia.com/compute/cuda/repos/fedora41/x86_64/
enabled=1
gpgcheck=1
gpgkey=https://developer.download.nvidia.com/compute/cuda/repos/fedora41/x86_64/7fa2af80.pub
REPO

sudo dnf clean all && sudo dnf makecache
```

### 5.2 Installing cuda‑toolkit

```bash
sudo dnf install cuda-toolkit-12-9
```

### 5.3 Environment Variables & Paths

Create `/etc/ld.so.conf.d/cuda.conf`:

```bash
sudo tee /etc/ld.so.conf.d/cuda.conf <<EOF
/usr/local/cuda/lib64
EOF
sudo ldconfig
```

Add to shell profile (`~/.bashrc` or `/etc/profile.d/cuda.sh`):

```bash
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64${LD_LIBRARY_PATH:+:}$LD_LIBRARY_PATH

# (Optional)
export CPATH=$CUDA_HOME/include${CPATH:+:}$CPATH
export LIBRARY_PATH=$CUDA_HOME/lib64${LIBRARY_PATH:+:}$LIBRARY_PATH
export PKG_CONFIG_PATH=$CUDA_HOME/lib64/pkgconfig${PKG_CONFIG_PATH:+:}$PKG_CONFIG_PATH
```

### 5.4 Verifying nvcc

```bash
nvcc --version
```

Expect:

```
Cuda compilation tools, release 12.9, V12.9.41
```

❓ **Questions to Ask**

* Does `which nvcc` point to `/usr/local/cuda/bin/nvcc`?
* Does `echo $LD_LIBRARY_PATH` include `/usr/local/cuda/lib64`?

---

## 6 🎯 “Hello, CUDA!” Sample Build & Run

```bash
cat > hello_cuda.cu << 'EOF'
#include <cstdio>
__global__ void hello() { printf("Hello, CUDA!\n"); }
int main(){ hello<<<1,1>>>(); cudaDeviceSynchronize(); }
EOF

nvcc hello_cuda.cu -o hello_cuda
./hello_cuda
# → "Hello, CUDA!"
```

❓ **Questions to Ask**

* Did the binary print “Hello, CUDA!”?
* Any linker errors about missing `-lcudart`?

---

## 7 🐳 NVIDIA Container Toolkit (Docker/Podman)

```bash
# 1. Add NVIDIA Container repo
sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo <<'REPO'
[nvidia-container-toolkit]
name=NVIDIA Container Toolkit
baseurl=https://nvidia.github.io/libnvidia-container/stable/fedora41/$basearch
enabled=1
gpgcheck=1
gpgkey=https://nvidia.github.io/libnvidia-container/gpgkey
REPO

# 2. Install toolkit (no -y)
sudo dnf install nvidia-container-toolkit

# 3. Configure Docker runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# 4. Test
docker run --rm --gpus all nvidia/cuda:12.9.0-base-ubi9 nvidia-smi
```

For Podman:

```bash
sudo dnf install nvidia-container-toolkit
sudo systemctl restart podman
podman run --rm --security-opt seccomp=unconfined --gpus all nvidia/cuda:12.9.0-base-ubi9 nvidia-smi
```

❓ **Questions to Ask**

* Does the container show the same GPU table?
* Any permission/access errors (`nvidia-container-cli`) in logs?

---

## 8 🤖 Open‑Source LLM Docker Images

| Image                                     | Run Command                                         | RAM (approx) | Notes                                   |
| ----------------------------------------- | --------------------------------------------------- | ------------ | --------------------------------------- |
| `ollama/ollama`                           | `docker run -p11434:11434 ollama/ollama`            | 8–16 GB      | Uses paid/proprietary models separately |
| `ghcr.io/ggerganov/llama.cpp:latest`      | `docker run --rm ... llama.cpp`                     | 4–8 GB       | GPL‑3 code, quantized models            |
| `ghcr.io/oobabooga/text-generation-webui` | `docker run --rm -p5000:5000 text-generation-webui` | 12 GB+       | Web UI; MIT code                        |
| `nvcr.io/nvidia/vllm`                     | `docker run --gpus all nvcr.io/nvidia/vllm`         | 24 GB+       | High‑perf scheduler                     |

❓ **Questions to Ask**

* Which model quantization level do you need?
* GPU memory available for inference?

---

## 9 🔮 Additional Recommendations & Next Steps

* **Secure Boot**: If re‑enabled, sign the NVIDIA module with your own MOK.
* **X11 fallback**: Install `xorg-x11-drv-nvidia` and add an X11 session in SDDM.
* **DKMS auto‑rebuild**: Keep `dkms.service` enabled. Monitor `journalctl -u dkms`.
* **Multi‑monitor checks**: Use `xrandr --listproviders` and `kscreen-doctor` for Wayland.
* **Persistent how‑to**: Save this guide in version control or `/usr/share/doc/nvidia-cuda-guide.md`.

❓ **Questions to Ask**

* Do you plan to re‑enable Secure Boot?
* Do you need X11 fallback for specific apps?
* Which LLM workflows will you run next?

---

## 10 🛠️ Troubleshooting Appendix

### Common Errors & Fixes

| Symptom                                     | Check / Fix                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------- |
| **`nvidia-smi … probe routine not called`** | Ensure BIOS/UEFI GPU is enabled; no `nouveau` driver loaded.                    |
| **Cannot insert module: No such device**    | Kernel mismatch: rebuild initramfs & reboot into correct kernel.                |
| **`ld: cannot find -lcudart`**              | Run `sudo ldconfig`; confirm `/etc/ld.so.conf.d/cuda.conf`.                     |
| **`broken dependencies` dnf**               | Disable conflicting repos (`cuda-fedora39`), clean cache: `sudo dnf clean all`. |

```bash
# View driver dmesg
sudo journalctl -k | grep -i nvrm

# View DKMS build logs
sudo journalctl -u dkms --no-pager | tail -n50
```

❓ **Questions to Ask**

* What exact error appears in `journalctl -k`?
* Are multiple CUDA repos enabled inadvertently?

---

> **Keep this guide version‑controlled**, refer back when you update kernels, drivers, or switch between container runtimes.
> Your next step: pick any “❓” that applies and tackle it now!
