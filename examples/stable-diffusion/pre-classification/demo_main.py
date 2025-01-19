#!/home/luxcium/anaconda3/envs/ai_lab/bin/python
import torch
from torchvision import models, transforms
from PIL import Image
import argparse
from torchvision.models import resnet50, ResNet50_Weights

# Parse command line arguments
parser = argparse.ArgumentParser(description='Classify an image using a pre-trained ResNet model.')
parser.add_argument('image_path', type=str, help='Path to the image file.')
args = parser.parse_args()

# Load the pre-trained model with updated API
weights = ResNet50_Weights.IMAGENET1K_V1
model = resnet50(weights=weights)
model.eval()  # Set the model to evaluation mode

# Define a transform to convert the image into the format the model requires
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Load an image from the command line argument
img = Image.open(args.image_path)

# Apply the transform to the image
img_t = transform(img)
batch_t = torch.unsqueeze(img_t, 0)

# Predict the class
with torch.no_grad():
    out = model(batch_t)

# Get the class names
classes = weights.meta["categories"]

# Print the top 5 categories
_, indices = torch.sort(out, descending=True)
percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
print([(classes[idx], percentage[idx].item()) for idx in indices[0][:5]])
