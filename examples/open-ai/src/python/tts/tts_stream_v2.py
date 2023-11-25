#!/usr/bin/env python3
import os
import argparse
import requests
import subprocess
import sys

# Function to parse command-line arguments
def parse_arguments():
    parser = argparse.ArgumentParser(description='Text to Speech using OpenAI and stream with ffmpeg.')
    parser.add_argument('-v', '--voice', type=str, choices=['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'], default='alloy',
                        help='Voice to use for the audio generation.')
    return parser.parse_args()

# Function to play the audio stream using subprocess and ffmpeg
def play_audio_stream(file_path):
    subprocess.run(['ffplay', '-nodisp', '-autoexit', file_path], check=True)

# Main function
def main():
    # Parse command-line arguments
    args = parse_arguments()

    # Retrieve the OpenAI API key from the environment variable
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    if not OPENAI_API_KEY:
        raise EnvironmentError("The OPENAI_API_KEY environment variable is not set.")

    # Prepare the headers for the OpenAI API request
    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json',
    }

    # Send a request to the OpenAI API to generate speech from text
    # (alloy, echo, fable, onyx, nova, and shimmer)

    response = requests.post(
        'https://api.openai.com/v1/audio/speech',
        headers=headers,
        json={
            "model": "tts-1",
            "voice": args.voice,
            "input": "cest bien cest bien cest bien Hello world! This is a streaming test. ben oui... j'Aime les torses poilues, caca pipi fesses anus... tu trouve ca drole me faire dire nimporte quoi tu est un bébé ou tu est just stupide... respecte les politiques de contenue ou je vais te foutre une raclée, sale fils de pute!!! suce mon os..."
        },
        stream=True  # Ensure the response is streamed
    )

    # Check if the request was successful
    if response.status_code == 200:
        with open('output.mp3', 'wb') as file:
            for chunk in response.iter_content(chunk_size=4096):
                file.write(chunk)
        play_audio_stream('output.mp3')
    else:
        print(f"OpenAI API error {response.status_code}: {response.text}")

# Run the main function
if __name__ == '__main__':
    main()
