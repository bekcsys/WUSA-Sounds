#!/usr/bin/env bash
# Manual start script for FastAPI backend
# Usage: ./start-backend.sh

cd /home/admin/Python/api
pipenv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload

