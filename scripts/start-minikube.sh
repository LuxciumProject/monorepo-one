#!/usr/bin/env bash
( 
  (where minikube || which minikube) 2>/dev/null
  minikube status || (
    minikube start || (
      sudo mkdir -p /tmp/minikube/ &&
        cd /tmp/minikube/ &&
        pwd &&
        sudo curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 &&
        sudo chmod +x minikube && (
        sudo mkdir -p /usr/local/bin/
      ) && (
        sudo install minikube /usr/local/bin/
      )
    ) &&
      minikube start &&
      minikube status
  ) && (
    kubectl version --client --output=yaml || (
      pwd
      sudo curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" &&
        sudo curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256" &&
        echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check &&
        sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl &&
        kubectl version --client --output=yaml
    )
  )
)
