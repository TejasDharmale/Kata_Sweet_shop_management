#!/usr/bin/env python3
"""
Script to run the FastAPI backend server
"""
import uvicorn
import os
from pathlib import Path

if __name__ == "__main__":
    # Change to the sweetshop directory
    os.chdir(Path(__file__).parent)
    
    # Run the FastAPI server
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )