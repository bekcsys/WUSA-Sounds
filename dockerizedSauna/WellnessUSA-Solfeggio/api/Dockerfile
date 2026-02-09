FROM python:3.11-slim

# Install system dependencies for audio playback
# ffmpeg is needed for pydub to handle MP3 files
# libasound2-dev and portaudio19-dev for simpleaudio
# mpg123 as fallback audio player
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libasound2-dev \
    portaudio19-dev \
    mpg123 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies directly with pip
# Using stable, compatible versions
RUN pip install --no-cache-dir \
    fastapi \
    "uvicorn[standard]" \
    pydub

# Try to install simpleaudio, but don't fail if it doesn't work
# (we have mpg123 as fallback)
RUN pip install --no-cache-dir simpleaudio || echo "Warning: simpleaudio installation failed, will use mpg123 fallback"

# Create audio directory with proper permissions
RUN mkdir -p /home/admin/Audio && chmod 755 /home/admin/Audio

# Copy audio files from build context
# Audio files should be in api/Audio/ directory
COPY api/Audio/ /home/admin/Audio/
RUN chmod -R 644 /home/admin/Audio/*.mp3 2>/dev/null || true && \
    echo "Audio files copied:" && \
    ls -la /home/admin/Audio/*.mp3 | wc -l && \
    echo "files found"

# Copy application code
COPY api/main.py ./

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "main.py"]
