"""
Quick test script to verify the backend is running and accessible.
Run this after starting the backend to verify it's working.
"""

import requests
import sys

def test_backend():
    base_url = "http://localhost:8000"
    
    print("Testing backend connection...")
    print(f"Backend URL: {base_url}")
    print("-" * 50)
    
    # Test health endpoint
    try:
        print("1. Testing /health endpoint...")
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print(f"   ✓ Health check passed: {response.json()}")
        else:
            print(f"   ✗ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("   ✗ Cannot connect to backend!")
        print("   Make sure the backend is running:")
        print("   - Run: uvicorn app:app --reload --host 0.0.0.0 --port 8000")
        print("   - Or run: python start-backend.ps1 (PowerShell)")
        print("   - Or run: start-backend.bat (CMD)")
        return False
    except Exception as e:
        print(f"   ✗ Error: {e}")
        return False
    
    # Test docs endpoint
    try:
        print("2. Testing /docs endpoint...")
        response = requests.get(f"{base_url}/docs", timeout=5)
        if response.status_code == 200:
            print(f"   ✓ API docs accessible")
        else:
            print(f"   ⚠ API docs returned: {response.status_code}")
    except Exception as e:
        print(f"   ⚠ Could not access docs: {e}")
    
    print("-" * 50)
    print("✓ Backend is running and accessible!")
    print(f"\nYou can now:")
    print(f"  - View API docs: {base_url}/docs")
    print(f"  - Test health: {base_url}/health")
    print(f"  - Upload videos from the frontend")
    return True

if __name__ == "__main__":
    try:
        success = test_backend()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")
        sys.exit(1)
