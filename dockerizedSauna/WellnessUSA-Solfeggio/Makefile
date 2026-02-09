.PHONY: help build start stop restart clean logs check-audio health test rebuild verify

# Default target
.DEFAULT_GOAL := help

# Variables
AUDIO_DIR := api/Audio
BACKEND_URL := http://localhost:8000
FRONTEND_URL := http://localhost:3000

help: ## Show this help message
	@echo "WellnessUSA Solfeggio Sound Player - Standalone Desktop Application"
	@echo "===================================================================="
	@echo ""
	@echo "Available commands:"
	@echo ""
	@echo "  make build     - Build Docker images for standalone desktop app"
	@echo "  make start     - Build and start the application"
	@echo "  make stop     - Stop the application"
	@echo "  make restart   - Restart the application"
	@echo "  make rebuild   - Clean and rebuild from scratch"
	@echo "  make verify    - Verify build configuration"
	@echo "  make logs      - View application logs"
	@echo "  make health    - Check backend health and audio system status"
	@echo "  make test      - Test API endpoints"
	@echo "  make status    - Show container status"
	@echo "  make clean     - Stop and remove containers and networks"
	@echo "  make clean-all - Clean everything including volumes and build cache"
	@echo ""
	@echo "Application URLs:"
	@echo "  Frontend: $(FRONTEND_URL)"
	@echo "  Backend:  $(BACKEND_URL)"
	@echo ""

check-audio: ## Check if audio files exist in repository
	@if [ ! -d "$(AUDIO_DIR)" ] || [ -z "$$(ls -A $(AUDIO_DIR)/*.mp3 2>/dev/null)" ]; then \
		echo "Error: No audio files found in $(AUDIO_DIR)/"; \
		echo "Please ensure audio files (.mp3) are in $(AUDIO_DIR)/ directory"; \
		exit 1; \
	else \
		FILE_COUNT=$$(ls -1 $(AUDIO_DIR)/*.mp3 2>/dev/null | wc -l); \
		echo "Found $$FILE_COUNT audio files in $(AUDIO_DIR)/"; \
	fi

build: check-audio ## Build Docker images for standalone desktop application
	@echo "Building Docker images for standalone desktop application..."
	@echo "Note: This build is optimized for desktop use (not Raspberry Pi)"
	docker-compose build
	@echo ""
	@echo "Build complete! Start the application with: make start"

start: check-audio ## Build and start the standalone desktop application
	@echo "Building and starting the standalone desktop application..."
	@echo "Audio will play through your computer's speakers"
	@echo ""
	@echo "Building Docker images (this may take a few minutes)..."
	docker-compose build
	@echo ""
	@echo "Starting containers..."
	docker-compose up -d
	@echo ""
	@echo "Waiting for services to be ready..."
	@sleep 5
	@echo ""
	@echo "=========================================="
	@echo "Application started successfully!"
	@echo "=========================================="
	@echo ""
	@echo "Frontend: $(FRONTEND_URL)"
	@echo "Backend:  $(BACKEND_URL)"
	@echo ""
	@echo "Useful commands:"
	@echo "  make logs      - View application logs"
	@echo "  make health    - Check backend health"
	@echo "  make status    - Show container status"
	@echo "  make stop      - Stop the application"
	@echo ""

stop: ## Stop the application
	@echo "Stopping the application..."
	docker-compose down
	@echo "Application stopped."

restart: stop start ## Restart the application

logs: ## View application logs
	docker-compose logs -f

logs-backend: ## View backend logs only
	docker-compose logs -f backend

logs-frontend: ## View frontend logs only
	docker-compose logs -f frontend

clean: ## Stop and remove containers, networks
	@echo "Cleaning up containers and networks..."
	docker-compose down
	@echo "Cleanup complete."

clean-all: clean ## Remove everything including images and volumes
	@echo "Removing Docker images and volumes..."
	docker-compose down -v --rmi all
	@echo "Clearing Docker build cache..."
	docker builder prune -f
	@echo "Complete cleanup finished."
	@echo "Note: Audio files in $(AUDIO_DIR)/ are preserved"

rebuild: clean ## Clean and rebuild from scratch (no cache)
	@echo "Rebuilding from scratch (no cache)..."
	docker-compose build --no-cache
	@echo "Rebuild complete!"

verify: ## Verify the build configuration
	@echo "Verifying build configuration for standalone desktop application..."
	@echo ""
	@echo "Checking audio files..."
	@make check-audio
	@echo ""
	@echo "Checking Docker configuration..."
	@docker-compose config > /dev/null && echo "✓ Docker Compose configuration is valid" || echo "✗ Docker Compose configuration has errors"
	@echo ""
	@echo "Verification complete!"

status: ## Show container status
	docker-compose ps

health: ## Check backend health and audio system status
	@echo "Checking backend health..."
	@echo ""
	@curl -s $(BACKEND_URL)/health | python3 -m json.tool 2>/dev/null || \
		(echo "Error: Backend is not responding. Is it running?" && exit 1)
	@echo ""
	@echo "Backend health check complete!"

test: ## Test API endpoints
	@echo "Testing API endpoints..."
	@echo ""
	@echo "1. Testing root endpoint..."
	@curl -s $(BACKEND_URL)/ | python3 -m json.tool || echo "Failed"
	@echo ""
	@echo "2. Testing status endpoint..."
	@curl -s $(BACKEND_URL)/status | python3 -m json.tool || echo "Failed"
	@echo ""
	@echo "3. Testing tracks endpoint..."
	@curl -s $(BACKEND_URL)/tracks | python3 -m json.tool | head -20 || echo "Failed"
	@echo ""
	@echo "API test complete!"
