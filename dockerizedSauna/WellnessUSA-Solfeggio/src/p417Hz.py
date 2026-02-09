import subprocess

def play_wav(file_path):
    """Plays a WAV file using mpg123."""
    try:
        subprocess.run(['mpg123', file_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error playing file: {e}")
    except FileNotFoundError:
        print("mpg123 command not found. Ensure it is installed and in your PATH.")

if __name__ == "__main__":
    wav_file = '/home/admin/Audio/a417Hz.mp3'  # Replace with the actual path to your WAV file
    play_wav(wav_file)
